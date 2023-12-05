import { Request, Response, NextFunction } from "express";
import { defaultServerResponse } from "../utilities/common/response";
import { CategoryInfo } from "../utilities/enum";
import { decode } from "../utilities/jwt";
import userCategoryService from "../services/userCategoryServices";
import { success } from "../utilities/success";
import { logger } from "../logger/logger";
import { BadRequestException } from "../exceptions";

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
    next: NextFunction
  ) => {
    try {
      const newResponse: NewResponse = { ...defaultServerResponse };
      const decodedData = decode((request as CustomRequest).token);
      const { query, body } = request;
      const isFollow = query.is_follow ? query.is_follow === 'true' : true;

      if (!body?.category_ids) throw new BadRequestException("The category_ids have to be passed.")
      const followedCategory: any = await userCategoryService.categoryFollowOrUnfollow(
        decodedData["id"],
        {
          is_follow: isFollow,
          category_ids: body.category_ids
        }
      );
      newResponse.status = followedCategory?.status ?? success.OK.code;
      newResponse.message = followedCategory?.message;
      newResponse.body = followedCategory?.body;
      logger.info(`Sent response for categoryFollowOrUnfollow.`);
      response.json(newResponse);
    } catch (error) {
      logger.error(`Error in followUnfollowAdvertisementById: ${error}`);
      next(error);
    }
  };

  getFollowCategoryByUser = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    const newResponse: NewResponse = { ...defaultServerResponse };
    try {
      const decodedData = decode((request as CustomRequest).token);
      const userId = request.query.user_id ? request.query.user_id : decodedData["id"];
      const followedCategory = await userCategoryService.getCategoryFollowedList(userId);
      newResponse.status = success.OK.code;
      newResponse.message = `${CategoryInfo["GET_LIST_CATEGORY_FOLLOWED"]}`;
      newResponse.body = followedCategory;
      logger.info(`Sent response for getFollowCategory.`);
      response.json(newResponse);
    } catch (error) {
      logger.error(`Error in getFollowCategory: ${error}`);
      next(error);
    }
  };

  getFollowerCategoryById = async (
    request: any,
    response: Response,
    next: NextFunction
  ) => {
    const newResponse: NewResponse = { ...defaultServerResponse };
    try {
      
      let categoryId = request.query.category_id;
      if(!categoryId) throw new BadRequestException("categoryId cannot be empty");
      let catid=categoryId = categoryId ?? "";
      const followedCategory = await userCategoryService.getCategoryFollowerList({
        category_id: catid,
        query: request.query
      });
      newResponse.status = success.OK.code;
      newResponse.message = `${CategoryInfo["GET_LIST_CATEGORY_FOLLOWED"]}`;
      newResponse.body = followedCategory;
      logger.info(`Sent response for getFollowCategory.`);
      response.json(newResponse);
    } catch (error) {
      logger.error(`Error in getFollowCategory: ${error}`);
      next(error);
    }
  };
}

export default UserCategoryController;
