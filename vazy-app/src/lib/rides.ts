// Ride requests (contract: docs/contracts/rides.md v1). The backend moves rides past "requested".
import {
  addDoc, collection, doc, limit, onSnapshot, orderBy, query, serverTimestamp, updateDoc, where,
} from "firebase/firestore";
import { useEffect, useRef, useState } from "react";

import { db } from "@/lib/firebase";

export type RideStatus =
  | "requested" | "queued" | "assigned" | "to_pickup" | "at_pickup" | "to_destination"
  | "completed" | "cancelled" | "failed";

export type Ride = {
  id: string;
  status: RideStatus;
  originStopId: string;
  destinationStopId: string;
  queuePosition?: number | null;
  failureReason?: string;
};

export const isTerminal = (status: RideStatus) => ["completed", "cancelled", "failed"].includes(status);

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

export const cancelRide = (id: string) => updateDoc(doc(db, "rides", id), { status: "cancelled" });

/**
 * The passenger's latest ride while it's active, or once it ends in this session (so they see how it ended).
 * Returns the ride and `dismiss`, which hides an ended ride.
 */
export function useLatestRide(uid: string) {
  const [ride, setRide] = useState<Ride | null>(null);
  const seenActive = useRef(new Set<string>());

  useEffect(() => {
    const latest = query(collection(db, "rides"), where("passengerUid", "==", uid), orderBy("createdAt", "desc"), limit(1));
    return onSnapshot(latest, (snap) => {
      const d = snap.docs[0];
      if (!d) return setRide(null);
      const next = { id: d.id, ...d.data() } as Ride;
      if (!isTerminal(next.status)) seenActive.current.add(next.id);
      // An ended ride from an earlier session isn't news; show the picker instead.
      setRide(isTerminal(next.status) && !seenActive.current.has(next.id) ? null : next);
    }, console.warn);
  }, [uid]);

  const dismiss = () => {
    if (ride) seenActive.current.delete(ride.id);
    setRide(null);
  };
  return [ride, dismiss] as const;
}
