import { Request, Response, NextFunction } from "express";
import { defaultServerResponse } from "../../utilities/common/response";
import { requestValidationMessage } from "../../utilities/common/validation_message";
import { errors } from "../../utilities/error";
// import { validateObjectSchema } from "your-validation-library"; // Import the appropriate validation library

const validateManagementQuery = (schema: any) => {
  return (req: Request, res: Response, next: NextFunction) => {
    let response: any = defaultServerResponse;
    // const error = validateObjectSchema(req.query, schema); // You should replace 'any' with an appropriate type for your validation schema
    // if (error) {
    //   response.body = error;
    //   response.message = requestValidationMessage.REQUEST_PAYLOAD_ERROR;
    //   response.status = errors.Bad_Request.code;
    //   return res.status(response.status).send(response);
    // }
    return next();
  };
};

export { validateManagementQuery };
