import { Request, Response, NextFunction } from "express";
import { defaultServerResponse } from "../utilities/common/response";
import { categoryInfo } from "../utilities/common/category_label";
import { decode } from "../utilities/jwt";
import user_category_service from "../services/userCategoryServices";
import { success } from "../utilities/success";

const categoryFollowOrUnfollow = async (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  const newResponse: any = { ...defaultServerResponse };
  try {
    const decodedData = await decode((request as any).token);
    const followedCategory: any =
      await user_category_service.categoryFollowOrUnfollow(
        decodedData["id"],
        request.body,
        request.query,
      );
    newResponse.status = followedCategory["status"] ?? success.OK.code;
    newResponse.message = followedCategory["message"];
    newResponse.body = followedCategory["body"];
  } catch (error: any) {
    newResponse.status = 500;
    newResponse.message = JSON.parse(error)["messages"];
    newResponse.body = undefined;
  }
  response.status(newResponse.status).send(newResponse);
};

const getFollowCategory = async (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  const newResponse: any = { ...defaultServerResponse };
  try {
    const decodedData = await decode((request as any).token);
    const userId = request.query.user_id
      ? request.query.user_id
      : decodedData["id"];
    const followedCategory =
      await user_category_service.getCategoryFollowedList(userId);
    newResponse.status = success.OK.code;
    newResponse.message = `${categoryInfo["GET_LIST_CATEGORY_FOLLOWED"]}`;
    newResponse.body = followedCategory;
  } catch (error: any) {
    newResponse.status = 500;
    newResponse.message = JSON.parse(error)["messages"];
    newResponse.body = undefined;
  }
  response.status(newResponse.status).send(newResponse);
};

export default {
  categoryFollowOrUnfollow,
  getFollowCategory,
};
