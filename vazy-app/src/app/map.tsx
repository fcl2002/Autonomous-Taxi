import { Camera, Map, Marker, type CameraRef, type ViewStateChangeEvent } from "@maplibre/maplibre-react-native";
import { router, useLocalSearchParams } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SymbolView } from "expo-symbols";
import { useCallback, useEffect, useRef, useState } from "react";
import { type NativeSyntheticEvent, Pressable, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ThemedButton } from "@/components/themed-button";
import { ThemedText } from "@/components/themed-text";
import { PICKUP } from "@/constants/pickup";
import { Colors, Fonts } from "@/constants/theme";

// OpenFreeMap serves the "Liberty" style with no API key or usage limits.
const LIBERTY_MAP_STYLE = "https://tiles.openfreemap.org/styles/liberty";

const MAP_CENTER = PICKUP.lngLat;

// Neighborhood and street detail, the level most ride-hailing maps settle on.
const FOCUS_ZOOM = 19;
const MIN_ZOOM = 2;
const MAX_ZOOM = 21;
const ZOOM_STEP = 1;

export default function MapScreen() {
  const cameraRef = useRef<CameraRef>(null);
  const insets = useSafeAreaInsets();
  const zoomRef = useRef(FOCUS_ZOOM);
  const [sheetHeight, setSheetHeight] = useState(201);

  // Set by select-location; params are strings and can come from a deep link, so validate them.
  const params = useLocalSearchParams<{ name?: string; address?: string; lng?: string; lat?: string }>();
  const lngLat: [number, number] = [Number(params.lng), Number(params.lat)];
  const destination =
    params.name && params.lng && params.lat && lngLat.every(Number.isFinite)
      ? { name: params.name, address: params.address ?? "", lngLat }
      : null;

  // The destination, once picked, is the map's center; before that, the user's location.
  const center = destination?.lngLat ?? MAP_CENTER;
  // Center within the part of the map the bottom sheet leaves visible.
  const padding = { bottom: sheetHeight };

  useEffect(() => {
    if (destination) {
      cameraRef.current?.flyTo({ center: destination.lngLat, zoom: FOCUS_ZOOM, padding, duration: 900 });
    }
    // Re-center when a new destination arrives or the sheet resizes for it, not on every render.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.lng, params.lat, sheetHeight]);

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
            center,
            zoom: FOCUS_ZOOM,
            padding,
            pitch: 0,
            bearing: 0,
          }}
          maxZoom={MAX_ZOOM}
          minZoom={MIN_ZOOM}
        />
        <Marker id="user-location" lngLat={MAP_CENTER}>
          <View accessible={false} style={styles.marker}>
            <View style={styles.markerDot} />
          </View>
        </Marker>
        {destination && (
          <Marker id="destination" lngLat={destination.lngLat}>
            <View accessible={false} style={styles.destinationMarker} />
          </Marker>
        )}
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
              {PICKUP.label}
            </ThemedText>
          </View>

          <View style={styles.divider} />

          <Pressable
            accessibilityLabel={destination ? `Destination: ${destination.name}. Change` : "Search destination"}
            accessibilityRole="button"
            onPress={() => router.push("/select-location")}
            style={({ pressed }) => [styles.row, pressed && styles.pressed]}
          >
            <SymbolView
              name={{ ios: "mappin", android: "location_on", web: "location_on" }}
              size={24}
              style={styles.pin}
              tintColor="#000000"
            />
            <ThemedText
              numberOfLines={1}
              style={[styles.rowText, !destination && styles.placeholder]}
            >
              {destination?.name ?? "Search Destination"}
            </ThemedText>
          </Pressable>

          {destination && (
            <View style={styles.result}>
              {!!destination.address && (
                <ThemedText numberOfLines={2} style={styles.left} variant="body">
                  {destination.address}
                </ThemedText>
              )}
              <ThemedButton
                label="Confirm destination"
                onPress={() => {}}
                style={styles.confirm}
              />
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
  markerDot: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: Colors.accent,
  },
  destinationMarker: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 4,
    borderColor: "#FFFFFF",
    backgroundColor: "#000000",
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
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
  confirm: {
    marginTop: 16,
  },
});
