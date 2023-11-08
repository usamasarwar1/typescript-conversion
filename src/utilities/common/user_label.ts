interface UserLabel {
    readonly USER_NOT_VERIFIED: string;
    readonly USER_ALREADY_REGISTER: string;
    readonly USER_NOT_REGISTER: string;
    readonly USER_EMAIL_UPDATE_ONLY_FIRST_TIME: string;
    readonly email: string;
    readonly user_id: string;
    readonly TOKEN_IS_NOT_VALID: string;
  }
  
  interface UserMessage {
    readonly USER_ACCOUNT_LOCKED: string;
  }
  
  const userLabel: UserLabel = {
    USER_NOT_VERIFIED: "User is not verified",
    USER_ALREADY_REGISTER: "This user has already registered",
    USER_NOT_REGISTER: "This user has not registered",
    USER_EMAIL_UPDATE_ONLY_FIRST_TIME: "User already has a valid email",
    email: "user email",
    user_id: "user_id",
    TOKEN_IS_NOT_VALID: "Token is not valid",
  };
  
  const userMessage: UserMessage = {
    USER_ACCOUNT_LOCKED: "User account is locked",
  };
  
  export { userLabel, userMessage };
  