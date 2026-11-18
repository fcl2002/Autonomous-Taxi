import { Alert, StyleSheet, View } from "react-native";

import { ThemedButton } from "@/components/themed-button";
import { ThemedText } from "@/components/themed-text";
import { STOPS } from "@/constants/circuit";
import { Colors } from "@/constants/theme";
import { cancelRide, isTerminal, type Ride } from "@/lib/rides";

const stopName = (id: string) => STOPS.find((stop) => stop.id === id)?.name ?? id;

const FAILURES: Record<string, string> = {
  active_ride_exists: "You already have a ride in progress.",
  same_stop: "Pickup and destination must be different stops.",
  invalid_stops: "That stop isn't on the circuit anymore.",
};

function message(ride: Ride) {
  switch (ride.status) {
    case "requested": return "Sending request…";
    case "queued": return ride.queuePosition ? `Accepted, you're #${ride.queuePosition} in line` : "Accepted, finding your place in line…";
    case "assigned":
    case "to_pickup": return `Vazy is on its way to ${stopName(ride.originStopId)}`;
    case "at_pickup": return `Vazy is waiting at ${stopName(ride.originStopId)}`;
    case "to_destination": return `On the way to ${stopName(ride.destinationStopId)}`;
    case "completed": return `You've arrived at ${stopName(ride.destinationStopId)}`;
    case "cancelled": return "Ride cancelled";
    case "failed": return FAILURES[ride.failureReason ?? ""] ?? "Couldn't request this ride. Try again.";
  }
}

// The sheet content while the passenger has a ride. Status changes arrive through the ride listener.
export function RideStatus({ ride, onDone }: { ride: Ride; onDone: () => void }) {
  function confirmCancel() {
    Alert.alert("Cancel ride?", "You'll lose your place in line.", [
      { text: "Keep ride", style: "cancel" },
      { text: "Cancel ride", style: "destructive", onPress: () => cancelRide(ride.id).catch(console.warn) },
    ]);
  }

  return (
    <View>
      <ThemedText accessibilityLiveRegion="polite" style={styles.left} variant="bodyLarge">
        {message(ride)}
      </ThemedText>
      <ThemedText style={styles.route} variant="bodyPrimary">
        {`${stopName(ride.originStopId)} → ${stopName(ride.destinationStopId)}`}
      </ThemedText>
      {ride.status === "queued" && <ThemedButton label="Cancel ride" onPress={confirmCancel} style={styles.action} />}
      {isTerminal(ride.status) && <ThemedButton label="Done" onPress={onDone} style={styles.action} />}
    </View>
  );
}

const styles = StyleSheet.create({
  left: {
    textAlign: "left",
  },
  route: {
    marginTop: 8,
    textAlign: "left",
    color: Colors.light.textSecondary,
  },
  action: {
    marginTop: 24,
  },
});
