enum ErrorCode {
  Bad_Request = 400,
  Unauthorized = 401,
  Payment_Required = 402,
  Forbidden = 403,
  Not_Found = 404,
  Method_Not_Allowed = 405,
  Not_Acceptable = 406,
  Proxy_Authentication_Required = 407,
  Request_Timeout = 408,
  Conflict = 409,
  Gone = 410,
  Length_Required = 411,
  Precondition_Failed = 412,
  Payload_Too_Large = 413,
  URI_Too_Long = 414,
  Unsupported_Media_Type = 415,
  Range_Not_Satisfiable = 416,
  Expectation_Failed = 417,
  Im_a_teapot = 418,
  Misdirected_Request = 421,
  Unprocessable_Entity = 422,
  Locked = 423,
  Failed_Dependency = 424,
  Too_Early = 425,
  Upgrade_Required = 426,
  Precondition_Required = 428,
  Too_Many_Requests = 429,
  Request_Header_Fields_Too_Large = 431,
  Unavailable_For_Legal_Reasons = 451,
}

interface ErrorResponse {
  code: number;
  message: string;
}

const errors = {
  Bad_Request: {
    code: ErrorCode.Bad_Request,
    message:
      "The server cannot or will not process the request due to an apparent client error (e.g., malformed request syntax, size too large, invalid request message framing, or deceptive request routing).",
  },
  Unauthorized: {
    code: ErrorCode.Unauthorized,
    message:
      "Similar to 403 Forbidden, but specifically for use when authentication is required and has failed or has not yet been provided.",
  },
  Payment_Required: {
    code: ErrorCode.Payment_Required,
    message: "Payment_Required",
  },
  Forbidden: {
    code: ErrorCode.Forbidden,
    message:
      "This may be due to the user not having the necessary permissions for a resource or needing an account of some sort, or attempting a prohibited action. ",
  },
  Not_Found: {
    code: ErrorCode.Not_Found,
    message:
      "The requested resource could not be found but may be available in the future. Subsequent requests by the client are permissible. ",
  },
  Method_Not_Allowed: {
    code: ErrorCode.Method_Not_Allowed,
    message:
      "A request method is not supported for the requested resource; for example, a GET request on a form that requires data to be presented via POST, or a PUT request on a read-only resource.",
  },
  Not_Acceptable: {
    code: ErrorCode.Not_Acceptable,
    message:
      "The requested resource is capable of generating only content not acceptable according to the Accept headers sent in the request. ",
  },
  Proxy_Authentication_Required: {
    code: ErrorCode.Proxy_Authentication_Required,
    message: "The client must first authenticate itself with the proxy.",
  },
  Request_Timeout: {
    code: ErrorCode.Request_Timeout,
    message:
      'The server timed out waiting for the request. According to HTTP specifications: "The client did not produce a request within the time that the server was prepared to wait. The client MAY repeat the request without modifications at any later time. ',
  },
  Conflict: {
    code: ErrorCode.Conflict,
    message:
      "Indicates that the request could not be processed because of conflict in the current state of the resource, such as an edit conflict between multiple simultaneous updates.",
  },
  Gone: {
    code: ErrorCode.Gone,
    message:
      "Indicates that the resource requested was previously in use but is no longer available and will not be available again.",
  },
  Length_Required: {
    code: ErrorCode.Length_Required,
    message:
      "The request did not specify the length of its content, which is required by the requested resource.",
  },
  Precondition_Failed: {
    code: ErrorCode.Precondition_Failed,
    message:
      "The server does not meet one of the preconditions that the requester put on the request header fields. ",
  },
  Payload_Too_Large: {
    code: ErrorCode.Payload_Too_Large,
    message:
      'The request is larger than the server is willing or able to process. Previously called "Request Entity Too Large.',
  },
  URI_Too_Long: {
    code: ErrorCode.URI_Too_Long,
    message:
      "The URI provided was too long for the server to process. Often the result of too much data being encoded as a query-string of a GET request, in which case it should be converted to a POST request.",
  },
  Unsupported_Media_Type: {
    code: ErrorCode.Unsupported_Media_Type,
    message:
      "The request entity has a media type which the server or resource does not support. For example, the client uploads an image as image/svg+xml, but the server requires that images use a different format.",
  },
  Range_Not_Satisfiable: {
    code: ErrorCode.Range_Not_Satisfiable,
    message:
      "The client has asked for a portion of the file (byte serving), but the server cannot supply that portion. For example, if the client asked for a part of the file that lies beyond the end of the file.",
  },
  Expectation_Failed: {
    code: ErrorCode.Expectation_Failed,
    message:
      "The server cannot meet the requirements of the Expect request-header field.",
  },
  Im_a_teapot: {
    code: ErrorCode.Im_a_teapot,
    message: "This code is for jokes",
  },
  Misdirected_Request: {
    code: ErrorCode.Misdirected_Request,
    message:
      "The request was directed at a server that is not able to produce a response[",
  },
  Unprocessable_Entity: {
    code: ErrorCode.Unprocessable_Entity,
    message:
      "The request was well-formed but was unable to be followed due to semantic errors.",
  },
  Locked: {
    code: ErrorCode.Locked,
    message: "The resource that is being accessed is locked.",
  },
  Failed_Dependency: {
    code: ErrorCode.Failed_Dependency,
    message:
      "The request failed because it depended on another request and that request failed.",
  },
  Too_Early: {
    code: ErrorCode.Too_Early,
    message:
      "Indicates that the server is unwilling to risk processing a request that might be replayed.",
  },
  Upgrade_Required: {
    code: ErrorCode.Upgrade_Required,
    message:
      "The client should switch to a different protocol such as TLS/1.3, given in the Upgrade header field.",
  },
  Precondition_Required: {
    code: ErrorCode.Precondition_Required,
    message: "The origin server requires the request to be conditional.",
  },
  Too_Many_Requests: {
    code: ErrorCode.Too_Many_Requests,
    message:
      "The user has sent too many requests in a given amount of time. Intended for use with rate-limiting schemes.",
  },
  Request_Header_Fields_Too_Large: {
    code: ErrorCode.Request_Header_Fields_Too_Large,
    message:
      "The server is unwilling to process the request because either an individual header field, or all the header fields collectively, are too large.",
  },
  Unavailable_For_Legal_Reasons: {
    code: ErrorCode.Unavailable_For_Legal_Reasons,
    message:
      "A server operator has received a legal demand to deny access to a resource or to a set of resources that includes the requested resource.",
  },
  date: {
    start_date: [
      {
        error: "start_date is required",
        path: ["start_date"],
      },
    ],
    end_date: [
      {
        error: "end_date is required",
        path: ["end_date"],
      },
    ],
  },
};

export {  errors, ErrorCode, ErrorResponse };
