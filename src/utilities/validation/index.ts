import { Request, Response, NextFunction } from "express";
import { defaultServerResponse } from "../../utilities/common/response";
import { requestValidationMessage } from "../../utilities/common/validation_message";
import { validateObjectSchema } from "./joiSchemaValidation";
import { BadRequestException } from "../../exceptions";
interface NewResponse {
  status: number;
  message: string;
  body: string | any;
}
const validateManagementQuery = (schema: any) => {

  return (req: Request, res: Response, next: NextFunction) => {
    let response: NewResponse = defaultServerResponse;
    const error = validateObjectSchema(req.query, schema); // You should replace 'any' with an appropriate type for your validation schema
    if (error) throw new BadRequestException(requestValidationMessage.REQUEST_PAYLOAD_ERROR, error);
    return next();
  };
};

const validateManagementParmas = (schema: any) => {
  return (req: Request, res: Response, next: NextFunction) => {
    console.log(req.params)
    let response: NewResponse = defaultServerResponse;
    const error = validateObjectSchema(req.params, schema); // You should replace 'any' with an appropriate type for your validation schema
    if (error) throw new BadRequestException(requestValidationMessage.REQUEST_PAYLOAD_ERROR, error);
    return next();
  };
};

export { validateManagementQuery, validateManagementParmas };
