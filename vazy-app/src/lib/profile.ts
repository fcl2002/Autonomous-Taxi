import type { User } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

import { db } from "@/lib/firebase";

// Contract: specs/011-passenger-profile/contracts/users.md (v1).
export const profileRef = (uid: string) => doc(db, "users", uid);

// Full set (no merge) on the uid: repeating it is safe and leaves exactly these two fields.
export function saveProfile(user: User, fullName: string) {
  return setDoc(profileRef(user.uid), { fullName: fullName.trim(), email: user.email });
}
