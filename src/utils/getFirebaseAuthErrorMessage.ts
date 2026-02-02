// utils/firebaseError.ts
export function getFirebaseAuthErrorMessage(error: any): string {
  const code = error?.code;

  switch (code) {
    case "auth/user-not-found":
      return "No account found with this email";
    case "auth/wrong-password":
      return "Incorrect password";
    case "auth/invalid-email":
      return "Invalid email address";
    case "auth/user-disabled":
      return "This account has been disabled";
    case "auth/too-many-requests":
      return "Too many attempts. Try again later";
    default:
      return "Failed to login. Please try again";
  }
}
