// Ride requests (contract: docs/contracts/rides.md v1). The backend moves rides past "requested".
import { addDoc, collection, doc, onSnapshot, query, serverTimestamp, updateDoc, where } from "firebase/firestore";
import { useEffect, useRef, useState } from "react";

import { isTerminal, type RideStatus } from "@/constants/ride-status";
import { db } from "@/lib/firebase";

export type Ride = {
  id: string;
  status: RideStatus;
  originStopId: string;
  destinationStopId: string;
  queuePosition?: number | null;
  failureReason?: string;
  /** Where the car started when assigned (backend). */
  vehicleStopId?: string;
  /** When the current step should end, in ms (backend clock), and when it started. */
  etaAt?: number | null;
  updatedAt?: { toMillis(): number } | null;
};

export function requestRide(passengerUid: string, originStopId: string, destinationStopId: string) {
  return addDoc(collection(db, "rides"), {
    schemaVersion: 1,
    passengerUid,
    originStopId,
    destinationStopId,
    status: "requested",
    createdAt: serverTimestamp(),
  });
}

// Clears the place in line in the same write, so a cancelled ride never shows a stale position.
export const cancelRide = (id: string) => updateDoc(doc(db, "rides", id), { status: "cancelled", queuePosition: null });

/**
 * The ride to show: the passenger's active ride, else one that ended during this session (so they see how it ended).
 * Returns the ride and `dismiss`, which hides an ended ride. `uid` is undefined while signing out.
 */
export function useCurrentRide(uid: string | undefined) {
  const [ride, setRide] = useState<Ride | null>(null);
  const seenActive = useRef(new Set<string>());

  useEffect(() => {
    if (!uid) return;
    // shortcut: reads all of the passenger's rides (no index needed); add status filters once histories get long.
    const mine = query(collection(db, "rides"), where("passengerUid", "==", uid));
    return onSnapshot(mine, (snap) => {
      const rides = snap.docs.map((d) => ({ id: d.id, ...d.data({ serverTimestamps: "estimate" }) }) as Ride);
      const active = rides.find((r) => !isTerminal(r.status));
      if (active) seenActive.current.add(active.id);
      // An ended ride from an earlier session isn't news; show the picker instead.
      setRide(active ?? rides.find((r) => seenActive.current.has(r.id)) ?? null);
    }, console.warn);
  }, [uid]);

  const dismiss = () => {
    if (ride) seenActive.current.delete(ride.id);
    setRide(null);
  };
  return [ride, dismiss] as const;
}
