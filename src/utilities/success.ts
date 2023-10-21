const success = {
  OK: {
    code: 200,
    message: "successful",
  },
  Created: {
    code: 201,
    message:
      "The request has been fulfilled, resulting in the creation of a new resource.",
  },
  Accepted: {
    code: 202,
    message:
      "The request has been accepted for processing, but the processing has not been completed.",
  },
  Non_Authoritative_Information: {
    code: 203,
    message:
      "The server is a transforming proxy  that received a 200 OK from its origin, but is returning a modified version of the origin response .",
  },
  No_Content: {
    code: 204,
    message:
      "The server successfully processed the request, and is not returning any content. ",
  },
  Reset_Content: {
    code: 205,
    message:
      "The server successfully processed the request, asks that the requester reset its document view, and is not returning any content. ",
  },
  Partial_Content: {
    code: 206,
    message:
      "The server is delivering only part of the resource (byte serving) due to a range header sent by the client.",
  },
  Multi_Status: {
    code: 207,
    message:
      "The message body that follows is by default an XML message and can contain a number of separate response codes, depending on how many sub-requests were made. ",
  },
  Already_Reported: {
    code: 208,
    message:
      "The members of a DAV binding have already been enumerated in a preceding part of the (multistatus) response, and are not being included again. ",
  },
  IM_Used: {
    code: 226,
    message:
      "The server has fulfilled a request for the resource, and the response is a representation of the result of one or more instance-manipulations applied to the current instance. ",
  },
};
export { success };
