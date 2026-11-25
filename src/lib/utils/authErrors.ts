const MESSAGES: Record<string, string> = {
  NotAuthorizedException: "Incorrect email or password.",
  UserNotFoundException: "Incorrect email or password.",
  UsernameExistsException: "An account with this email already exists. Try signing in.",
  CodeMismatchException: "That code isn't right. Check your email and try again.",
  ExpiredCodeException: "This code has expired. Request a new one.",
  LimitExceededException: "Too many attempts. Please wait a moment and try again.",
  TooManyRequestsException: "Too many attempts. Please wait a moment and try again.",
  InvalidPasswordException: "Password doesn't meet the requirements.",
  UserAlreadyAuthenticatedException: "You're already signed in.",
};

export const authErrorMessage = (error: unknown) => {
  const name = (error as { name?: string })?.name;
  if (name && MESSAGES[name]) return MESSAGES[name];
  return (error as { message?: string })?.message || "Something went wrong. Please try again.";
};
