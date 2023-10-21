const errors = {
  Bad_Request: {
    code: 400,
    message:
      "The server cannot or will not process the request due to an apparent client error (e.g., malformed request syntax, size too large, invalid request message framing, or deceptive request routing).",
  },
  Unauthorized: {
    code: 401,
    message:
      "Similar to 403 Forbidden, but specifically for use when authentication is required and has failed or has not yet been provided.",
  },
  Payment_Required: {
    code: 402,
    message: "Payment_Required",
  },
  Forbidden: {
    code: 403,
    message:
      "This may be due to the user not having the necessary permissions for a resource or needing an account of some sort, or attempting a prohibited action. ",
  },
  Not_Found: {
    code: 404,
    message:
      "The requested resource could not be found but may be available in the future. Subsequent requests by the client are permissible. ",
  },
  Method_Not_Allowed: {
    code: 405,
    message:
      "A request method is not supported for the requested resource; for example, a GET request on a form that requires data to be presented via POST, or a PUT request on a read-only resource.",
  },
  Not_Acceptable: {
    code: 406,
    message:
      "The requested resource is capable of generating only content not acceptable according to the Accept headers sent in the request. ",
  },
  Proxy_Authentication_Required: {
    code: 407,
    message: "The client must first authenticate itself with the proxy.",
  },
  Request_Timeout: {
    code: 408,
    message:
      'The server timed out waiting for the request. According to HTTP specifications: "The client did not produce a request within the time that the server was prepared to wait. The client MAY repeat the request without modifications at any later time. ',
  },
  Conflict: {
    code: 409,
    message:
      "Indicates that the request could not be processed because of conflict in the current state of the resource, such as an edit conflict between multiple simultaneous updates.",
  },
  Gone: {
    code: 410,
    message:
      "Indicates that the resource requested was previously in use but is no longer available and will not be available again.",
  },
  Length_Required: {
    code: 411,
    message:
      "The request did not specify the length of its content, which is required by the requested resource.",
  },
  Precondition_Failed: {
    code: 412,
    message:
      "The server does not meet one of the preconditions that the requester put on the request header fields. ",
  },
  Payload_Too_Large: {
    code: 413,
    message:
      'The request is larger than the server is willing or able to process. Previously called "Request Entity Too Large.',
  },
  URI_Too_Long: {
    code: 414,
    message:
      "The URI provided was too long for the server to process. Often the result of too much data being encoded as a query-string of a GET request, in which case it should be converted to a POST request.",
  },
  Unsupported_Media_Type: {
    code: 415,
    message:
      "The request entity has a media type which the server or resource does not support. For example, the client uploads an image as image/svg+xml, but the server requires that images use a different format.",
  },
  Range_Not_Satisfiable: {
    code: 416,
    message:
      "The client has asked for a portion of the file (byte serving), but the server cannot supply that portion. For example, if the client asked for a part of the file that lies beyond the end of the file.",
  },
  Expectation_Failed: {
    code: 417,
    message:
      "The server cannot meet the requirements of the Expect request-header field.",
  },
  Im_a_teapot: {
    code: 418,
    message: "This code is for jokes",
  },
  Misdirected_Request: {
    code: 421,
    message:
      "The request was directed at a server that is not able to produce a response[",
  },
  Unprocessable_Entity: {
    code: 422,
    message:
      "The request was well-formed but was unable to be followed due to semantic errors.",
  },
  Locked: {
    code: 423,
    message: "The resource that is being accessed is locked.",
  },
  Failed_Dependency: {
    code: 424,
    message:
      "The request failed because it depended on another request and that request failed.",
  },
  Too_Early: {
    code: 425,
    message:
      "Indicates that the server is unwilling to risk processing a request that might be replayed.",
  },
  Upgrade_Required: {
    code: 426,
    message:
      "The client should switch to a different protocol such as TLS/1.3, given in the Upgrade header field.",
  },
  Precondition_Required: {
    code: 428,
    message: "The origin server requires the request to be conditional.",
  },
  Too_Many_Requests: {
    code: 429,
    message:
      "The user has sent too many requests in a given amount of time. Intended for use with rate-limiting schemes.",
  },
  Request_Header_Fields_Too_Large: {
    code: 431,
    message:
      "The server is unwilling to process the request because either an individual header field, or all the header fields collectively, are too large.",
  },
  Unavailable_For_Legal_Reasons: {
    code: 451,
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

export { errors };
