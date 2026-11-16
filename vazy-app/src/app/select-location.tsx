import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SymbolView } from "expo-symbols";
import { useEffect, useState } from "react";
import { FlatList, Pressable, StyleSheet, TextInput, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ThemedText } from "@/components/themed-text";
import { PICKUP } from "@/constants/pickup";
import { Colors, Fonts } from "@/constants/theme";
import { type Place, photonUrl, toPlace } from "@/lib/photon";

type SearchStatus = "idle" | "searching" | "notFound" | "error";

const STATUS_MESSAGE: Partial<Record<SearchStatus, string>> = {
  searching: "Searching…",
  notFound: "No place found",
  error: "Search failed, check your connection.",
};

const MIN_QUERY_LENGTH = 3;
const DEBOUNCE_MS = 300;

export default function SelectLocationScreen() {
  const insets = useSafeAreaInsets();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Place[]>([]);
  const [status, setStatus] = useState<SearchStatus>("idle");

  const text = query.trim();
  const tooShort = text.length < MIN_QUERY_LENGTH;
  const message = tooShort ? undefined : STATUS_MESSAGE[status];

  useEffect(() => {
    if (tooShort) return;

    // Abort on every keystroke so a slow, older answer never replaces a newer one.
    const controller = new AbortController();
    const timer = setTimeout(async () => {
      setStatus("searching");
      try {
        const res = await fetch(photonUrl(text, PICKUP.lngLat), {
          headers: { "User-Agent": "Vazy/0.1 (prototype)" },
          signal: controller.signal,
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const places: Place[] = (await res.json()).features.map(toPlace);
        setResults(places);
        setStatus(places.length ? "idle" : "notFound");
      } catch {
        if (!controller.signal.aborted) setStatus("error");
      }
    }, DEBOUNCE_MS);

    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [text, tooShort]);

  const select = (place: Place) =>
    router.navigate({
      pathname: "/map",
      params: { name: place.name, address: place.address, lng: place.lng, lat: place.lat },
    });

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />

      {/* Figma "Select Location" 5:1830: white header, 0 4 30px rgba(0,0,0,0.07). */}
      <View style={[styles.header, { paddingTop: insets.top + 16 }]}>
        <Pressable
          accessibilityLabel="Back"
          accessibilityRole="button"
          hitSlop={8}
          onPress={() => router.back()}
          style={({ pressed }) => [styles.back, pressed && styles.pressed]}
        >
          <SymbolView
            name={{ ios: "chevron.left", android: "arrow_back_ios_new", web: "arrow_back_ios_new" }}
            size={18}
            tintColor="#000000"
          />
        </Pressable>

        <View style={[styles.row, styles.firstRow]}>
          <SymbolView
            name={{ ios: "house.fill", android: "home", web: "home" }}
            size={24}
            style={styles.icon}
            tintColor={Colors.accent}
          />
          <View style={styles.pill}>
            <ThemedText numberOfLines={1} style={styles.pillText}>
              {PICKUP.label}
            </ThemedText>
          </View>
        </View>

        <View style={styles.row}>
          <SymbolView
            name={{ ios: "mappin", android: "location_on", web: "location_on" }}
            size={24}
            style={styles.icon}
            tintColor="#000000"
          />
          <TextInput
            accessibilityLabel="Destination"
            autoFocus
            onChangeText={setQuery}
            placeholder="Enter Destination"
            placeholderTextColor="#A5A5A5"
            returnKeyType="search"
            style={[styles.pill, styles.pillText]}
            value={query}
          />
        </View>
      </View>

      <FlatList
        contentContainerStyle={[styles.list, { paddingBottom: insets.bottom + 24 }]}
        data={tooShort ? [] : results}
        keyboardShouldPersistTaps="handled"
        keyExtractor={(item, index) => `${item.id}-${index}`}
        ListHeaderComponent={
          message ? (
            <ThemedText style={styles.left} variant="body">
              {message}
            </ThemedText>
          ) : undefined
        }
        renderItem={({ item }) => (
          <Pressable
            accessibilityRole="button"
            onPress={() => select(item)}
            style={({ pressed }) => [styles.result, pressed && styles.pressed]}
          >
            <View style={styles.dot} />
            <View style={styles.resultText}>
              <ThemedText numberOfLines={1} style={styles.resultName}>
                {item.name}
              </ThemedText>
              {!!item.address && (
                <ThemedText numberOfLines={1} style={styles.resultAddress}>
                  {item.address}
                </ThemedText>
              )}
            </View>
          </Pressable>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  pressed: {
    opacity: 0.6,
  },
  header: {
    zIndex: 1,
    paddingHorizontal: 24,
    paddingBottom: 24,
    backgroundColor: "#FFFFFF",
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.07,
    shadowRadius: 15,
    elevation: 6,
  },
  back: {
    width: 41,
    height: 41,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#D1D1D1",
    backgroundColor: "#FFFFFF",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    marginTop: 15,
  },
  firstRow: {
    marginTop: 24,
  },
  icon: {
    width: 28,
    height: 28,
  },
  pill: {
    flex: 1,
    height: 37,
    justifyContent: "center",
    paddingHorizontal: 16,
    paddingVertical: 0,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: "#D1D1D1",
    backgroundColor: "#FFFFFF",
  },
  pillText: {
    color: "#000000",
    fontFamily: Fonts.regular,
    fontSize: 12,
    textAlign: "left",
  },
  list: {
    paddingHorizontal: 24,
    paddingTop: 24,
  },
  left: {
    textAlign: "left",
  },
  result: {
    flexDirection: "row",
    alignItems: "center",
    gap: 13,
    paddingVertical: 10,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#000000",
  },
  resultText: {
    flex: 1,
  },
  resultName: {
    fontFamily: Fonts.medium,
    fontSize: 14,
    lineHeight: 21,
    textAlign: "left",
  },
  // Figma uses Poppins Light; the app only loads Regular/Medium/SemiBold.
  resultAddress: {
    color: "#A5A5A5",
    fontSize: 12,
    lineHeight: 18,
    textAlign: "left",
  },
});
