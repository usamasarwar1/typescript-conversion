import { Request, Response, NextFunction } from "express";
import { defaultServerResponse } from "../utilities/common/response";
import { success } from "../utilities/success";
import { advertisementFollowInfo } from "../utilities/common/advertisement_label";
import advertisementService from "../services/advertisement/advertisementService";
import ebanner_service from "../services/ebannerService";
import { logger } from "../logger/logger";

interface NewResponse {
  status: number;
  message: string;
  body: string | any;
}

class EbannerController {
  
  getOwner = async (request: Request, response: Response, next: NextFunction) => {
    try {
      const newResponse: NewResponse = { ...defaultServerResponse };
      const advertisementId = await ebanner_service.getAdvertisementId(
        request.params.ebannerId
      );
      const ownerDetails = await advertisementService.getOwner({advertisementId});
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
      const advertisementId = await ebanner_service.getAdvertisementId(
        request.params.ebannerId
      );
      const followerList = await advertisementService.getFollowerList({
        advertisementId,
        query: request.query,
      });
      newResponse.status = success.OK.code;
      newResponse.message = advertisementFollowInfo["LIST_OF_FOLLOWER"];
      newResponse.body = followerList;
      response.json(newResponse);
    } catch (error: any) {
      logger.error(`Error in getOwner: ${error}`);
      next(error);
    }
  };
}

export default new EbannerController();
