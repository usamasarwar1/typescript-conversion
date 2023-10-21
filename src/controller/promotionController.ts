import { Request, Response } from "express";
import { defaultServerResponse } from "../utilities/common/response";
import promotion_service from "../services/promotionService";
import { decode } from "../utilities/jwt";
import { success } from "../utilities/success";
import { errors } from "../utilities/error";
import { advertisementFollowInfo } from "../utilities/common/advertisement_label";
import advertisementService from "../services/advertisement/advertisementService";
import { promotionInfo } from "../utilities/common/promotion_label";

const getUserFollowedAdvertisementPromotions = async (
  request: Request,
  response: Response,
) => {
  const newResponse: any = { ...defaultServerResponse };
  try {
    const decodedData = await decode((request as any).token);
    const userAdvertisementPromotionsDetail =
      await promotion_service.getUserAdvertisementPromotionsByType({
        // query: request.query,
        query: {
          is_pagination: request.query.is_pagination,
          page_index: request.query.page_index,
          page_size: request.query.page_size,
        },
        userId: decodedData["id"] ? decodedData["id"] : undefined,
        type: "FOLLOWEDADVERTISEMENT",
      });
    newResponse.status = success.OK.code;
    newResponse.message =
      promotionInfo["USER_FOLLOWED_ADVERTISEMENT_PROMOTIONS"];
    newResponse.body = userAdvertisementPromotionsDetail;
  } catch (error: any) {
    newResponse.status = JSON.parse(error)["status"];
    newResponse.message = JSON.parse(error)["messages"];
    newResponse.body = undefined;
  }
  response.status(newResponse.status).send(newResponse);
};

const getOwner = async (request: Request, response: Response) => {
  const newResponse: any = { ...defaultServerResponse };
  try {
    const advertisementId = promotion_service.getAdvertisementId(
      request.params.advertisementId,
    );

    if (advertisementId) {
      const ownerDetails = await advertisementService.getOwner({
        advertisementId: advertisementId,
      });
      newResponse.status = success.OK.code;
      newResponse.message = advertisementFollowInfo["OWNER_DETAILS"];
      newResponse.body = ownerDetails;
    } else {
      newResponse.status = errors.Not_Found.code;
      newResponse.message = errors.Not_Found.message;
      newResponse.body = null;
    }
  } catch (error: any) {
    newResponse.status = JSON.parse(error)["status"];
    newResponse.message = JSON.parse(error)["messages"];
    newResponse.body = undefined;
  }
  response.status(newResponse.status).send(newResponse);
};

const getFollowerList = async (request: Request, response: Response) => {
  const newResponse: any = { ...defaultServerResponse };
  try {
    const advertisementId = promotion_service.getAdvertisementId(
      request.params.advertisementId,
    );

    if (advertisementId) {
      const followerList = await advertisementService.getFollowerList({
        advertisementId: advertisementId,
        query: request.query,
      });
      newResponse.status = success.OK.code;
      newResponse.message = advertisementFollowInfo["LIST_OF_FOLLOWER"];
      newResponse.body = followerList;
    } else {
      newResponse.status = errors.Not_Found.code;
      newResponse.message = errors.Not_Found.message;
      newResponse.body = null;
    }
  } catch (error: any) {
    newResponse.status = JSON.parse(error)["status"];
    newResponse.message = JSON.parse(error)["messages"];
    newResponse.body = undefined;
  }
  response.status(newResponse.status).send(newResponse);
};

export default {
  getUserFollowedAdvertisementPromotions,
  getOwner,
  getFollowerList,
};
