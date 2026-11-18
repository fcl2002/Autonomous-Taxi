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
import { Alert, type NativeSyntheticEvent, Pressable, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { AppMenu } from "@/components/app-menu";
import { RideStatus } from "@/components/ride-status";
import { ThemedButton } from "@/components/themed-button";
import { ThemedText } from "@/components/themed-text";
import { type LngLat, STOPS } from "@/constants/circuit";
import { PICKUP } from "@/constants/pickup";
import { Colors, Fonts } from "@/constants/theme";
import { auth } from "@/lib/firebase";
import { requestRide, useCurrentRide } from "@/lib/rides";
import { bounds, nearestStop, pointAlong, summary, tripPath } from "@/lib/route";

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
  const [originId, setOriginId] = useState(STOPS[ORIGIN.index].id);
  const [pickingOrigin, setPickingOrigin] = useState(false);
  const [requesting, setRequesting] = useState(false);
  // Undefined only for the instant between signing out and the guard leaving this screen.
  const uid = auth.currentUser?.uid;
  const [ride, dismissRide] = useCurrentRide(uid);
  const [now, setNow] = useState(Date.now);
  const moving = ride?.status === "to_pickup" || ride?.status === "at_pickup" || ride?.status === "to_destination";

  // While a ride exists, the map shows that ride's stops instead of the picker's.
  const shownOriginId = ride?.originStopId ?? originId;
  const shownDestinationId = ride?.destinationStopId ?? destinationId;
  const origin = STOPS.findIndex((stop) => stop.id === shownOriginId);
  const destination = STOPS.findIndex((stop) => stop.id === shownDestinationId);
  const trip = origin >= 0 && destination >= 0 ? tripPath(STOPS, origin, destination) : null;

  // Simulated vehicle position: along its current leg, by how much of the step's time has passed.
  const carStop = STOPS.findIndex((stop) => stop.id === ride?.vehicleStopId);
  let car: LngLat | null = null;
  if (ride && origin >= 0) {
    const started = ride.updatedAt?.toMillis() ?? now;
    const done = ride.etaAt && ride.etaAt > started ? (now - started) / (ride.etaAt - started) : 1;
    if ((ride.status === "assigned" || ride.status === "to_pickup") && carStop >= 0) {
      const leg = tripPath(STOPS, carStop, origin).coordinates;
      car = ride.status === "to_pickup" && leg.length ? pointAlong(leg, done) : STOPS[carStop].lngLat;
    } else if (ride.status === "at_pickup") {
      car = STOPS[origin].lngLat;
    } else if (ride.status === "to_destination" && trip?.coordinates.length) {
      car = pointAlong(trip.coordinates, done);
    }
  }

  useEffect(() => {
    if (!moving) return;
    const timer = setInterval(() => setNow(Date.now()), 250);
    return () => clearInterval(timer);
  }, [moving]);
  // Keep the map clear of the status bar, the zoom controls and the bottom sheet.
  const framePadding = { top: insets.top + 48, right: 88, bottom: sheetHeight + 48, left: 48 };

  const selectStop = (id: string) => {
    if (ride) return;
    if (pickingOrigin) {
      if (id !== destinationId) setOriginId(id);
      setPickingOrigin(false);
    } else if (id !== originId) {
      setDestinationId(id);
    }
  };

  async function request() {
    if (!uid || !destinationId) return;
    setRequesting(true);
    try {
      await requestRide(uid, originId, destinationId);
    } catch (error) {
      console.warn(error);
      Alert.alert("Couldn't request ride", "Check your connection and try again.");
    }
    setRequesting(false);
  }

  useEffect(() => {
    if (trip) {
      cameraRef.current?.fitBounds(bounds(trip.coordinates), { padding: framePadding, duration: 900 });
    }
    // Frame the trip when its stops or the sheet change, not on every render.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shownOriginId, shownDestinationId, sheetHeight]);

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
          const isOrigin = index === origin;
          const isDestination = index === destination;
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

        {car && (
          <Marker id="vehicle" lngLat={car}>
            <View accessibilityLabel="Vazy vehicle" accessible style={styles.vehicle}>
              <SymbolView name={{ ios: "car.fill", android: "directions_car", web: "directions_car" }} size={22} tintColor="#FFFFFF" />
            </View>
          </Marker>
        )}

        <Marker id="user-location" lngLat={MAP_CENTER}>
          <View accessible={false} style={styles.marker}>
            <View style={styles.markerDot} />
          </View>
        </Marker>
      </Map>

      <AppMenu />

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
        {ride ? (
          <RideStatus now={now} onDone={dismissRide} ride={ride} />
        ) : (
          <>
            <ThemedText style={styles.left} variant="bodyLarge">
              Where do you want to go?
            </ThemedText>

            <Pressable
              accessibilityHint="Then tap a stop on the map"
              accessibilityLabel={`Pickup: ${STOPS[origin].name}. Change pickup stop`}
              accessibilityRole="button"
              onPress={() => setPickingOrigin(!pickingOrigin)}
              style={({ pressed }) => [styles.row, styles.pickupRow, pressed && styles.pressed]}
            >
              <SymbolView
                name={{ ios: "house.fill", android: "home", web: "home" }}
                size={24}
                style={styles.pin}
                tintColor={Colors.accent}
              />
              <ThemedText numberOfLines={1} style={[styles.rowText, pickingOrigin && styles.placeholder]}>
                {pickingOrigin
                  ? "Tap your pickup stop on the map"
                  : origin === ORIGIN.index
                    ? `${STOPS[origin].name} · ${ORIGIN.distance} m from you`
                    : STOPS[origin].name}
              </ThemedText>
            </Pressable>

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

            {trip && (
              <View style={styles.result}>
                <ThemedText style={styles.left} variant="bodyLarge">
                  {summary(trip)}
                </ThemedText>
                <ThemedButton
                  accessibilityState={{ busy: requesting, disabled: requesting }}
                  disabled={requesting}
                  label={requesting ? "Requesting…" : "Request ride"}
                  onPress={request}
                  style={[styles.requestButton, requesting && styles.pressed]}
                />
              </View>
            )}
          </>
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
  requestButton: {
    marginTop: 16,
  },
  vehicle: {
    width: 36,
    height: 36,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 18,
    backgroundColor: Colors.accent,
    borderWidth: 2,
    borderColor: "#FFFFFF",
  },
});
