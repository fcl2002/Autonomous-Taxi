import { Camera, Map, Marker, type CameraRef, type ViewStateChangeEvent } from "@maplibre/maplibre-react-native";
import { StatusBar } from "expo-status-bar";
import { SymbolView } from "expo-symbols";
import { useCallback, useRef, useState } from "react";
import { Keyboard, KeyboardAvoidingView, type NativeSyntheticEvent, Pressable, StyleSheet, TextInput, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ThemedButton } from "@/components/themed-button";
import { ThemedText } from "@/components/themed-text";
import { Colors, Fonts } from "@/constants/theme";

// OpenFreeMap serves the "Liberty" style with no API key or usage limits.
const LIBERTY_MAP_STYLE = "https://tiles.openfreemap.org/styles/liberty";

// The app's location: Place Jussieu, main entrance of Sorbonne Université's Jussieu campus (OSM).
const MAP_CENTER: [number, number] = [2.3547629, 48.846255];
const PICKUP_LABEL = "Sorbonne Université · 4 Place Jussieu, 75005 Paris";

// shortcut: Nominatim public API, 1 req/s and no SLA; move to a paid or self-hosted geocoder before launch.
const SEARCH_URL =
  "https://nominatim.openstreetmap.org/search?format=json&limit=1&accept-language=fr&countrycodes=fr&viewbox=2.22,48.90,2.47,48.81&q=";

// Neighborhood and street detail, the level most ride-hailing maps settle on.
const FOCUS_ZOOM = 19;
const MIN_ZOOM = 2;
const MAX_ZOOM = 21;
const ZOOM_STEP = 1;

type Destination = { name: string; address: string; lngLat: [number, number] };
type SearchStatus = "idle" | "searching" | "notFound" | "error";

const STATUS_MESSAGE: Partial<Record<SearchStatus, string>> = {
  searching: "Searching…",
  notFound: "No place found, try another address.",
  error: "Search failed, check your connection.",
};

export default function MapScreen() {
  const cameraRef = useRef<CameraRef>(null);
  const insets = useSafeAreaInsets();
  const zoomRef = useRef(FOCUS_ZOOM);
  const [sheetHeight, setSheetHeight] = useState(201);
  const [query, setQuery] = useState("");
  const [destination, setDestination] = useState<Destination | null>(null);
  const [status, setStatus] = useState<SearchStatus>("idle");

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
      duration: 900,
    });
  }, []);

  const zoomBy = useCallback((delta: number) => {
    const nextZoom = Math.min(
      MAX_ZOOM,
      Math.max(MIN_ZOOM, zoomRef.current + delta),
    );

    cameraRef.current?.zoomTo(nextZoom, { duration: 250 });
  }, []);

  const search = async () => {
    const text = query.trim();
    if (!text || status === "searching") return;

    Keyboard.dismiss();
    setStatus("searching");
    try {
      const res = await fetch(SEARCH_URL + encodeURIComponent(text), {
        headers: { "User-Agent": "Vazy/0.1 (prototype)" },
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const [r] = await res.json();
      if (!r) {
        setStatus("notFound");
        return;
      }
      const lngLat: [number, number] = [Number(r.lon), Number(r.lat)];
      setDestination({
        name: r.name || r.display_name.split(",")[0],
        address: r.display_name,
        lngLat,
      });
      setStatus("idle");
      cameraRef.current?.flyTo({ center: lngLat, zoom: FOCUS_ZOOM, duration: 900 });
    } catch {
      setStatus("error");
    }
  };

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
            center: MAP_CENTER,
            zoom: FOCUS_ZOOM,
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

      <KeyboardAvoidingView behavior="padding" style={styles.sheetWrapper}>
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
              {PICKUP_LABEL}
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
            <TextInput
              accessibilityLabel="Destination"
              onChangeText={setQuery}
              onSubmitEditing={search}
              placeholder="Search Destination"
              placeholderTextColor="#A5A5A5"
              returnKeyType="search"
              style={[styles.rowText, styles.input]}
              value={query}
            />
          </View>

          {STATUS_MESSAGE[status] && (
            <ThemedText style={[styles.left, styles.result]} variant="body">
              {STATUS_MESSAGE[status]}
            </ThemedText>
          )}

          {destination && status !== "searching" && (
            <View style={styles.result}>
              <ThemedText numberOfLines={1} style={styles.left} variant="bodyLarge">
                {destination.name}
              </ThemedText>
              <ThemedText numberOfLines={2} style={styles.left} variant="body">
                {destination.address}
              </ThemedText>
              <ThemedButton
                label="Confirm destination"
                onPress={() => {}}
                style={styles.confirm}
              />
            </View>
          )}
        </View>
      </KeyboardAvoidingView>
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
  sheetWrapper: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
  },
  // Figma "map" frame, node 5:1544: white sheet, 30px top corners, 0 0 30px rgba(0,0,0,0.15).
  sheet: {
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
  input: {
    paddingVertical: 0,
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
