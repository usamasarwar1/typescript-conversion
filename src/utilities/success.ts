enum SuccessCode {
  OK = 200,
  Created = 201,
  Accepted = 202,
  Non_Authoritative_Information = 203,
  No_Content = 204,
  Reset_Content = 205,
  Partial_Content = 206,
  Multi_Status = 207,
  Already_Reported = 208,
  IM_Used = 226,
}

const success = {
  OK: {
    code: SuccessCode.OK,
    message: "successful",
  },
  Created: {
    code: SuccessCode.Created,
    message:
      "The request has been fulfilled, resulting in the creation of a new resource.",
  },
  Accepted: {
    code: SuccessCode.Accepted,
    message:
      "The request has been accepted for processing, but the processing has not been completed.",
  },
  Non_Authoritative_Information: {
    code: SuccessCode.Non_Authoritative_Information,
    message:
      "The server is a transforming proxy that received a 200 OK from its origin, but is returning a modified version of the origin response.",
  },
  No_Content: {
    code: SuccessCode.No_Content,
    message:
      "The server successfully processed the request, and is not returning any content.",
  },
  Reset_Content: {
    code: SuccessCode.Reset_Content,
    message:
      "The server successfully processed the request, asks that the requester reset its document view, and is not returning any content.",
  },
  Partial_Content: {
    code: SuccessCode.Partial_Content,
    message:
      "The server is delivering only part of the resource (byte serving) due to a range header sent by the client.",
  },
  Multi_Status: {
    code: SuccessCode.Multi_Status,
    message:
      "The message body that follows is by default an XML message and can contain a number of separate response codes, depending on how many sub-requests were made.",
  },
  Already_Reported: {
    code: SuccessCode.Already_Reported,
    message:
      "The members of a DAV binding have already been enumerated in a preceding part of the (multistatus) response, and are not being included again.",
  },
  IM_Used: {
    code: SuccessCode.IM_Used,
    message:
      "The server has fulfilled a request for the resource, and the response is a representation of the result of one or more instance-manipulations applied to the current instance.",
  },
};

export { success, SuccessCode };
