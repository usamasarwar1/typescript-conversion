import { Request, Response, NextFunction } from "express";
import { defaultServerResponse } from "../utilities/common/response";
import { advertisementFollowInfo } from "../utilities/common/advertisement_label";
import { success } from "../utilities/success";
import { logger } from "../logger/logger";
import advertisementService from "../services/advertisement/advertisementService";

interface NewResponse {
  status: number;
  message: string;
  body: string | any;
}

class AdvertisementController {
  getOwner = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {

    try {
      const newResponse: NewResponse = { ...defaultServerResponse };
      let advertisementId = await advertisementService.getValidAdvertisement(request.params.advertisementId);
      const ownerDetails = await advertisementService.getOwner(advertisementId);
      newResponse.status = success.OK.code;
      newResponse.message = advertisementFollowInfo["OWNER_DETAILS"];
      newResponse.body = ownerDetails;
      logger.info(`Sent response for getOwner: ${JSON.stringify(newResponse)}`);
      response.json(newResponse);
    } catch (error: any) {
      logger.error(`Error in getOwner: ${error}`);
      next(error);
    }

  };

  getFollowerList = async (request: any, response: any, next: NextFunction) => {
    const newResponse: NewResponse = { ...defaultServerResponse };
    try {
      let advertisementId = await advertisementService.getValidAdvertisement(request.params.advertisementId);
      const followerList = await advertisementService.getFollowerList({
        advertisementId: advertisementId,
        query: request.query,
      });
      newResponse.status = success.OK.code;
      newResponse.message = advertisementFollowInfo["LIST_OF_FOLLOWER"];
      newResponse.body = followerList;
      logger.info(
        `Sent response for getFollowerList.`
      );
      response.json(newResponse);
    } catch (error: any) {
      logger.error(`Error in getOwner: ${error}`);
      next(error);
    }
  };
}

export default new AdvertisementController();
