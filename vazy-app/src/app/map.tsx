import React from 'react';
import { Image } from "expo-image";
import MapView, { UrlTile } from 'react-native-maps';
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { ThemedText } from "@/components/themed-text";
import { Colors } from "@/constants/theme";

const MAPTILER_KEY = process.env.EXPO_PUBLIC_MAPTILER_KEY;

export default function MapScreen() {
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 49.415,
          longitude: 2.823,
          latitudeDelta: 0.02,
          longitudeDelta: 0.02,
        }}
      >
        <UrlTile
          urlTemplate={`https://api.maptiler.com/maps/openstreetmap/{z}/{x}/{y}.jpg?key=MAPTILER_KEY`}
          maximumZ={19}
        />
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
});