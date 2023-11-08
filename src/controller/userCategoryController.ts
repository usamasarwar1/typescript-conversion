import { Request, Response, NextFunction } from "express";
import { defaultServerResponse } from "../utilities/common/response";
import { categoryInfo } from "../utilities/common/category_label";
import { decode } from "../utilities/jwt";
import userCategoryService from "../services/userCategoryServices";
import { success } from "../utilities/success";
import { logger } from "../logger/logger";

interface NewResponse {
  status: number;
  message: string;
  body: string | any;
}

interface CustomRequest extends Request {
  token: string;
}

class UserCategoryController {
  categoryFollowOrUnfollow = async (
    request: Request | any,
    response: Response,
    next: NextFunction,
  ) => {
    const newResponse: NewResponse = { ...defaultServerResponse };
    try {
      const decodedData = await decode((request as CustomRequest).token);
      const followedCategory: any =
        await userCategoryService.categoryFollowOrUnfollow(
          decodedData["id"],
          request.body,
        );
      newResponse.status = followedCategory?.status ?? success.OK.code;
      newResponse.message = followedCategory?.message;
      newResponse.body = followedCategory?.body;
      logger.info(`Sent response for categoryFollowOrUnfollow: ${JSON.stringify(newResponse)}`);
    } catch (error: any) {
      logger.error(`Error in categoryFollowOrUnfollow: ${error}`);
      logger.error(error);
      newResponse.status = 500;
      newResponse.message = typeof error === 'string' ? error : 'Unexpected error format';
      newResponse.body = undefined;
    }
    response.status(newResponse.status).send(newResponse);
  };

  getFollowCategory = async (
    request: Request,
    response: Response,
    next: NextFunction,
  ) => {
    const newResponse: NewResponse = { ...defaultServerResponse };
    try {
      const decodedData = await decode((request as CustomRequest).token);
      const userId = request.query.user_id
        ? request.query.user_id
        : decodedData["id"];
      const followedCategory =
        await userCategoryService.getCategoryFollowedList(userId);
      newResponse.status = success.OK.code;
      newResponse.message = `${categoryInfo["GET_LIST_CATEGORY_FOLLOWED"]}`;
      newResponse.body = followedCategory;
      logger.info(`Sent response for getFollowCategory: ${JSON.stringify(newResponse)}`);
    } catch (error: any) {
      logger.error(`Error in getFollowCategory: ${error}`);
      newResponse.status = 500;
      newResponse.message = typeof error === 'string' ? error : 'Unexpected error format';
      newResponse.body = undefined;
    }
    response.status(newResponse.status).send(newResponse);
  };
}

export default UserCategoryController;
