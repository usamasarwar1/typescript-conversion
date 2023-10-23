import { Request, Response, NextFunction } from "express";
import { defaultServerResponse } from "../../utilities/common/response";
import { requestValidationMessage } from "../../utilities/common/validation_message";
import { errors } from "../../utilities/error";
import Joi from "joi";

const validateBody = (schema: any) => {
  return (req: Request, res: Response, next: NextFunction) => {
    let response: any = defaultServerResponse;
    const error = validateObjectSchema(req.body, schema); // Replace 'any' with the appropriate type for your validation schema
    if (error) {
      response.body = error;
      response.message = requestValidationMessage.REQUEST_PAYLOAD_ERROR;
      response.status = errors.Bad_Request.code;
      return res.status(response.status).send(response);
    }
    return next();
  };
};

const validateQuery = (schema: any) => {
  return (req: Request, res: Response, next: NextFunction) => {
    let response: any = defaultServerResponse;
    // const error = validateObjectSchema(req.query, schema); // Replace 'any' with the appropriate type for your validation schema
    // if (error) {
    //   response.body = error;
    //   response.message = requestValidationMessage.REQUEST_PAYLOAD_ERROR;
    //   response.status = errors.Bad_Request.code;
    //   return res.status(response.status).send(response);
    // }
    return next();
  };
};



const validateObjectSchema = (data: any, schema: Joi.ObjectSchema) => {
  const validation = schema.validate(data, { abortEarly: false });

  if (validation.error) {
    const errorDetails = validation.error.details.map((value: Joi.ValidationErrorItem) => {
      return {
        error: value.message,
        path: value.path,
      };
    });

    return errorDetails;
  }

  return null;
};

export { validateBody, validateQuery,validateObjectSchema };
