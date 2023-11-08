interface RequestValidationMessage {
  readonly BAD_REQUEST: string;
  readonly TOKEN_MISSING: string;
  readonly REQUEST_PAYLOAD_ERROR: string;
  readonly QUERY_PARAMS_ERROR: string;
}

const requestValidationMessage: RequestValidationMessage = {
  BAD_REQUEST: "Bad request",
  TOKEN_MISSING: "Token is missing",
  REQUEST_PAYLOAD_ERROR: "Request Payload error",
  QUERY_PARAMS_ERROR: "Query parameter error",
};

export { requestValidationMessage };
