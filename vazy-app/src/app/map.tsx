import {
  Camera,
  type CameraRef,
  GeoJSONSource,
  Layer,
  Map,
  Marker,
  type ViewStateChangeEvent,
} from "@maplibre/maplibre-react-native";
import { StatusBar } from "expo-status-bar";
import { SymbolView } from "expo-symbols";
import { useCallback, useEffect, useRef, useState } from "react";
import { type NativeSyntheticEvent, Pressable, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ThemedButton } from "@/components/themed-button";
import { ThemedText } from "@/components/themed-text";
import { STOPS } from "@/constants/circuit";
import { PICKUP } from "@/constants/pickup";
import { Colors, Fonts } from "@/constants/theme";
import { bounds, nearestStop, summary, tripPath } from "@/lib/route";

// OpenFreeMap serves the "Liberty" style with no API key or usage limits.
const LIBERTY_MAP_STYLE = "https://tiles.openfreemap.org/styles/liberty";

const MAP_CENTER = PICKUP.lngLat;

// Neighborhood and street detail, the level most ride-hailing maps settle on.
const FOCUS_ZOOM = 19;
const MIN_ZOOM = 2;
const MAX_ZOOM = 21;
const ZOOM_STEP = 1;

// The whole one-way loop, each leg joined without repeating the shared point.
const CIRCUIT = STOPS.flatMap((stop, i) => (i === 0 ? stop.path : stop.path.slice(1)));
// shortcut: the user's location is fixed, so the origin stop is computed once; move into the component with real GPS.
const ORIGIN = nearestStop(STOPS, MAP_CENTER);

export default function MapScreen() {
  const cameraRef = useRef<CameraRef>(null);
  const insets = useSafeAreaInsets();
  const zoomRef = useRef(FOCUS_ZOOM);
  const [sheetHeight, setSheetHeight] = useState(201);
  // Stops are tracked by their stable id (what the backend will store), never by list position.
  const [destinationId, setDestinationId] = useState<string | null>(null);
  const [confirmed, setConfirmed] = useState(false);

  const destination = STOPS.findIndex((stop) => stop.id === destinationId);
  const trip = confirmed && destination >= 0 ? tripPath(STOPS, ORIGIN.index, destination) : null;
  // Keep the map clear of the status bar, the zoom controls and the bottom sheet.
  const framePadding = { top: insets.top + 48, right: 88, bottom: sheetHeight + 48, left: 48 };

  const selectStop = (id: string) => {
    if (id === STOPS[ORIGIN.index].id) return;
    setDestinationId(id);
    setConfirmed(false);
  };

  useEffect(() => {
    if (trip) {
      cameraRef.current?.fitBounds(bounds(trip.coordinates), { padding: framePadding, duration: 900 });
    }
    // Frame the trip when it's confirmed or the sheet resizes, not on every render.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [confirmed, destinationId, sheetHeight]);

  const handleRegionDidChange = useCallback(
    (event: NativeSyntheticEvent<ViewStateChangeEvent>) => {
      zoomRef.current = event.nativeEvent.zoom;
    },
    [],
  );

  const recenter = useCallback(() => {
    cameraRef.current?.flyTo({
      center: MAP_CENTER,
      zoom: FOCUS_ZOOM,
      padding: { bottom: sheetHeight },
      duration: 900,
    });
  }, [sheetHeight]);

  const zoomBy = useCallback((delta: number) => {
    const nextZoom = Math.min(
      MAX_ZOOM,
      Math.max(MIN_ZOOM, zoomRef.current + delta),
    );

    cameraRef.current?.zoomTo(nextZoom, { duration: 250 });
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />

      <Map
        attribution
        attributionPosition={{ bottom: sheetHeight + 8, right: 8 }}
        compass
        logo
        logoPosition={{ bottom: sheetHeight + 8, left: 8 }}
        mapStyle={LIBERTY_MAP_STYLE}
        onRegionDidChange={handleRegionDidChange}
        style={styles.map}
        tintColor={Colors.accent}
      >
        <Camera
          ref={cameraRef}
          initialViewState={{
            // Open on the whole circuit plus the user, so every stop is tappable right away.
            bounds: bounds([...CIRCUIT, MAP_CENTER]),
            padding: framePadding,
          }}
          maxZoom={MAX_ZOOM}
          minZoom={MIN_ZOOM}
        />

        <GeoJSONSource
          data={{ type: "Feature", properties: {}, geometry: { type: "LineString", coordinates: CIRCUIT } }}
          id="circuit"
        >
          <Layer
            id="circuit-line"
            layout={{ "line-cap": "round", "line-join": "round" }}
            paint={{ "line-color": "#9AA0A6", "line-width": 3 }}
            type="line"
          />
        </GeoJSONSource>

        {trip && (
          <GeoJSONSource
            data={{ type: "Feature", properties: {}, geometry: { type: "LineString", coordinates: trip.coordinates } }}
            id="trip"
          >
            <Layer
              id="trip-line"
              layout={{ "line-cap": "round", "line-join": "round" }}
              paint={{ "line-color": Colors.accent, "line-width": 6 }}
              type="line"
            />
          </GeoJSONSource>
        )}

        {STOPS.map((stop, index) => {
          const isOrigin = index === ORIGIN.index;
          const isDestination = stop.id === destinationId;
          return (
            <Marker
              anchor="bottom"
              id={`stop-${stop.id}`}
              key={stop.id}
              lngLat={stop.lngLat}
              onPress={() => selectStop(stop.id)}
            >
              {/* Native views, unlike map layers, reach VoiceOver/TalkBack; 44pt is the minimum touch target. */}
              <View
                accessibilityActions={[{ name: "activate" }]}
                accessibilityLabel={isOrigin ? `${stop.name}, your pickup stop` : stop.name}
                accessibilityRole="button"
                accessibilityState={{ selected: isDestination, disabled: isOrigin }}
                accessible
                onAccessibilityAction={() => selectStop(stop.id)}
                style={styles.stopPin}
              >
                <SymbolView
                  name={{ ios: "mappin", android: "location_on", web: "location_on" }}
                  size={isDestination ? 40 : 32}
                  tintColor={isOrigin ? Colors.accent : isDestination ? "#000000" : "#6B6F76"}
                />
              </View>
            </Marker>
          );
        })}

        <Marker id="user-location" lngLat={MAP_CENTER}>
          <View accessible={false} style={styles.marker}>
            <View style={styles.markerDot} />
          </View>
        </Marker>
      </Map>

      <View style={[styles.controls, { bottom: sheetHeight + 40 }]}>
        <View style={styles.zoomGroup}>
          <Pressable
            accessibilityLabel="Zoom in"
            accessibilityRole="button"
            hitSlop={8}
            onPress={() => zoomBy(ZOOM_STEP)}
            style={({ pressed }) => [
              styles.zoomButton,
              pressed && styles.pressed,
            ]}
          >
            <ThemedText style={styles.zoomLabel} variant="bodyPrimary">
              +
            </ThemedText>
          </Pressable>
          <View style={styles.zoomDivider} />
          <Pressable
            accessibilityLabel="Zoom out"
            accessibilityRole="button"
            hitSlop={8}
            onPress={() => zoomBy(-ZOOM_STEP)}
            style={({ pressed }) => [
              styles.zoomButton,
              pressed && styles.pressed,
            ]}
          >
            <ThemedText style={styles.zoomLabel} variant="bodyPrimary">
              −
            </ThemedText>
          </Pressable>
        </View>

        <Pressable
          accessibilityLabel="Center map on your location"
          accessibilityRole="button"
          hitSlop={8}
          onPress={recenter}
          style={({ pressed }) => [
            styles.locateButton,
            pressed && styles.pressed,
          ]}
        >
          <View style={styles.locateRing}>
            <View style={styles.locateDot} />
          </View>
        </Pressable>
      </View>

      <View
        onLayout={(e) => setSheetHeight(e.nativeEvent.layout.height)}
        style={[styles.sheet, { paddingBottom: insets.bottom + 24 }]}
      >
        <ThemedText style={styles.left} variant="bodyLarge">
          Where do you want to go?
        </ThemedText>

        <View style={[styles.row, styles.pickupRow]}>
          <SymbolView
            name={{ ios: "house.fill", android: "home", web: "home" }}
            size={24}
            style={styles.pin}
            tintColor={Colors.accent}
          />
          <ThemedText numberOfLines={1} style={styles.rowText}>
            {`${STOPS[ORIGIN.index].name} · ${ORIGIN.distance} m from you`}
          </ThemedText>
        </View>

        <View style={styles.divider} />

        <View style={styles.row}>
          <SymbolView
            name={{ ios: "mappin", android: "location_on", web: "location_on" }}
            size={24}
            style={styles.pin}
            tintColor="#000000"
          />
          <ThemedText
            numberOfLines={1}
            style={[styles.rowText, destination < 0 && styles.placeholder]}
          >
            {destination < 0 ? "Tap a stop on the map" : STOPS[destination].name}
          </ThemedText>
        </View>

        {destination >= 0 && (
          <View style={styles.result}>
            {trip ? (
              <ThemedText style={styles.left} variant="bodyLarge">
                {summary(trip)}
              </ThemedText>
            ) : (
              <ThemedButton label="Confirm destination" onPress={() => setConfirmed(true)} />
            )}
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  map: {
    flex: 1,
  },
  pressed: {
    opacity: 0.6,
  },
  marker: {
    width: 24,
    height: 24,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
    backgroundColor: "#FFFFFF",
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
  },
  stopPin: {
    width: 44,
    height: 44,
    alignItems: "center",
    justifyContent: "flex-end",
  },
  markerDot: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: Colors.accent,
  },
  controls: {
    position: "absolute",
    right: 16,
    alignItems: "center",
    gap: 12,
  },
  zoomGroup: {
    overflow: "hidden",
    borderRadius: 16,
    backgroundColor: Colors.light.background,
    borderWidth: 1,
    borderColor: Colors.light.backgroundSelected,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 4,
  },
  zoomButton: {
    width: 48,
    height: 48,
    alignItems: "center",
    justifyContent: "center",
  },
  zoomDivider: {
    height: StyleSheet.hairlineWidth,
    marginHorizontal: 8,
    backgroundColor: Colors.light.backgroundSelected,
  },
  zoomLabel: {
    fontSize: 26,
    lineHeight: 30,
  },
  locateButton: {
    width: 48,
    height: 48,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 24,
    backgroundColor: Colors.light.background,
    borderWidth: 1,
    borderColor: Colors.light.backgroundSelected,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 4,
  },
  locateRing: {
    width: 22,
    height: 22,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 11,
    borderWidth: 2,
    borderColor: Colors.accent,
  },
  locateDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: Colors.accent,
  },
  // Figma "map" frame, node 5:1544: white sheet, 30px top corners, 0 0 30px rgba(0,0,0,0.15).
  sheet: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    paddingTop: 24,
    paddingHorizontal: 24,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    backgroundColor: "#FFFFFF",
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.15,
    shadowRadius: 15,
    elevation: 12,
  },
  left: {
    textAlign: "left",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  pickupRow: {
    marginTop: 20,
  },
  pin: {
    width: 28,
    height: 28,
  },
  rowText: {
    flex: 1,
    color: "#000000",
    fontFamily: Fonts.regular,
    fontSize: 12,
    lineHeight: 18,
    textAlign: "left",
  },
  placeholder: {
    color: "#A5A5A5",
  },
  divider: {
    height: 1,
    marginLeft: 44,
    marginVertical: 11,
    backgroundColor: "#DFE9F0",
  },
  result: {
    marginTop: 16,
  },
});
