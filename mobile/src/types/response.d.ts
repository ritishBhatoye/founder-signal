interface SignInOptions {
  email: string;
  password?: string;
  redirectTo?: string;
}

interface SignInResult {
  success: boolean;
  error?: string;
  message?: string;
}
