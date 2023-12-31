import * as UsersModels from "../model/user";
const { userLogoutModel } = UsersModels;

import { defaultServerResponse } from "../utilities/common/response";
import { requestValidationMessage } from "../utilities/common/validation_message";
import { commonLabel } from "../utilities/common/label";
import { errors } from "../utilities/error";

import { getTokenFromRequest, verifyJwtToken } from "../utilities/jwt";

import { Request, Response, NextFunction } from "express";
interface CustomRequest extends Request {
  token: string; // Define the type of the 'token' property
}
const validateToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let response: any = { ...defaultServerResponse };
  try {
    if (!req.headers.authorization) {
      throw JSON.stringify({
        status: errors.Unauthorized.code,
        messages: requestValidationMessage.TOKEN_MISSING,
      });
    }
    console.log(req.headers.authorization);
    let token = getTokenFromRequest(req.headers.authorization);
    if (!token) {
      throw JSON.stringify({
        status: errors.Bad_Request.code,
        messages: commonLabel["TOKEN_IS_NOT_VALID"],
      });
    }
    let expireToken = await userLogoutModel.findOne({ token });
    if (expireToken) {
      throw JSON.stringify({
        status: errors.Bad_Request.code,
        messages: commonLabel["TOKEN_NOT_VALID"],
      });
    }
    if (!(await verifyJwtToken(token))) {
      throw JSON.stringify({
        status: errors.Forbidden.code,
        messages: commonLabel["TOKEN_IS_NOT_VALID"],
      });
    }
    (req as CustomRequest).token = token;
    return next();
  } catch (error: any) {
    if (error.message === "invalid signature") {
      response.message = error.message;
      response.status = errors.Bad_Request.code;
      response.body = undefined;
    } else {
      response.message = JSON.parse(error)["messages"];
      response.status = JSON.parse(error)["status"];
      response.body = undefined;
    }
  }
  return res.status(response.status).send(response);
};

export { validateToken };
