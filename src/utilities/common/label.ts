interface CommonLabel {
  readonly pageLimit: string;
  readonly pageNumber: string;
  readonly ALREADY_EXISTS: string;
  readonly RECOMENDED: string;
  readonly ALSO_ALREADY_EXISTS: string;
  readonly NOT_VALID: string;
  readonly MUST_BE_NUMBER: string;
  readonly SHOULD_NOT_ZERO: string;
  readonly IS_REQUIRED: string;
  readonly ACCEPT_SHOULD_BE_STRING: string;
  readonly TOKEN_NOT_VALID: string;
  readonly USER_ALREADY_REGISTER: string;
  readonly USER_NOT_REGISTER: string;
  readonly USER_EMAIL_UPDATE_ONLY_FIRST_TIME: string;
  readonly REMAINING: string;
  readonly AND: string;
  readonly TOKEN_IS_NOT_VALID: string;
  readonly START_DATE_NOT_VALID_FORMAT: string;
  readonly END_DATE_NOT_VALID_FORMAT: string;
  readonly DATE_FORMAT_WITH_OUT_TIME: string;
  readonly DATA_FORMAT_SCHEDULE_WITH_TIME: string;
  readonly TIME_FORMAT_WITH_OUT_DATE: string;
  readonly INAVALID_AUTHORIZATION: string;
}

const commonLabel: CommonLabel = {
  pageLimit: "Page Limit",
  pageNumber: "Page number",
  ALREADY_EXISTS: "has been already exists",
  RECOMENDED: "is Recomended",
  ALSO_ALREADY_EXISTS: "also has been already exists",
  NOT_VALID: "is not valid",
  MUST_BE_NUMBER: "must be a number",
  SHOULD_NOT_ZERO: "should be greater than 0",
  IS_REQUIRED: "is required",
  ACCEPT_SHOULD_BE_STRING: "alphanumeric and special characters not accepted.",
  TOKEN_NOT_VALID: "Token has expired",
  USER_ALREADY_REGISTER: "This user has already registered",
  USER_NOT_REGISTER: "This user has not registered",
  USER_EMAIL_UPDATE_ONLY_FIRST_TIME: "User already has a valid email",
  REMAINING: "remaining",
  AND: "and",
  TOKEN_IS_NOT_VALID: "Token is not valid",
  START_DATE_NOT_VALID_FORMAT: "Start Date Is Not in Valid Format [YYYY-MM-DD]",
  END_DATE_NOT_VALID_FORMAT: "End Date Is Not in Valid Format [YYYY-MM-DD]",
  DATE_FORMAT_WITH_OUT_TIME: "YYYY-MM-DD",
  DATA_FORMAT_SCHEDULE_WITH_TIME: "YYYY-MM-DD hh:mm a",
  TIME_FORMAT_WITH_OUT_DATE: "HH:mm",
  INAVALID_AUTHORIZATION: "Invalid Authorization",
};

export { commonLabel };
