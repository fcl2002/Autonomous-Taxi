// Firebase Auth error codes -> what the user sees. Sign-up will add its own codes here.
const MESSAGES: Record<string, string> = {
  // With email enumeration protection on, a wrong email and a wrong password both come back as this code.
  "auth/invalid-credential": "Incorrect email or password.",
  "auth/invalid-email": "Enter a valid email address.",
  "auth/missing-password": "Enter your password.",
  "auth/too-many-requests": "Too many attempts. Try again later.",
  "auth/network-request-failed": "No connection. Check your internet and try again.",
};

export function authErrorMessage(error: unknown) {
  const code = (error as { code?: string } | null)?.code ?? "";
  return MESSAGES[code] ?? "Something went wrong. Try again.";
}
