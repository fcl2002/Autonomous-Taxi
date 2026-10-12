import { Map } from "@maplibre/maplibre-react-native";
import { View, StyleSheet } from "react-native";

export default function MapScreen() {
  return (
    <View style={styles.container}>
      <Map
        style={styles.map}
        mapStyle="https://demotiles.maplibre.org/style.json"
      />
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