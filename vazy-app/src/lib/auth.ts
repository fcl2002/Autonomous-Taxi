// Firebase Auth error codes -> what the user sees.
const MESSAGES: Record<string, string> = {
  "auth/email-already-in-use": "An account with this email already exists. Log in instead.",
  "auth/password-does-not-meet-requirements": "Password must be at least 8 characters.",
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
