import { Request, Response, NextFunction } from "express";
import { defaultServerResponse } from "../utilities/common/response";
import promotion_service from "../services/promotionService";
import { success } from "../utilities/success";
import { advertisementFollowInfo } from "../utilities/common/advertisement_label";
import advertisementService from "../services/advertisement/advertisementService";
import { logger } from "../logger/logger";

interface NewResponse {
  status: number;
  message: string;
  body: string | any;
}

class PromotionController {

  getOwner = async (request: Request | any, response: Response, next: NextFunction) => {
    try {
      const newResponse: NewResponse = { ...defaultServerResponse };
      const advertisementId = await promotion_service.getAdvertisementId(
        request.params.promotionId
      );
      const ownerDetails = await advertisementService.getOwner(
        advertisementId
      );
      newResponse.status = success.OK.code;
      newResponse.message = advertisementFollowInfo["OWNER_DETAILS"];
      newResponse.body = ownerDetails;
      response.json(newResponse);

    } catch (error: any) {
      logger.error(`Error in getOwner: ${error}`);
      next(error);
    }
  };

  getFollowerList = async (request: Request | any, response: Response, next: NextFunction) => {
      try {
        const newResponse: NewResponse = { ...defaultServerResponse };
        const advertisementId = await promotion_service.getAdvertisementId(
          request.params.promotionId
        );
        console.log(advertisementId)
        const followerList = await advertisementService.getFollowerList({
          advertisementId,
          query: request.query,
        });
        newResponse.status = success.OK.code;
        newResponse.message = advertisementFollowInfo["LIST_OF_FOLLOWER"];
        newResponse.body = followerList;
        response.json(newResponse);
      } catch (error: any) {
        logger.error(`Error in getFollowerList: ${error}`);
        next(error);
      }
  };
}

export default new PromotionController();
