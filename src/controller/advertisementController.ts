import { Request, Response, NextFunction } from "express";
import { defaultServerResponse } from "../utilities/common/response";
import { advertisementFollowInfo } from "../utilities/common/advertisement_label";
import { success } from "../utilities/success";
import { logger } from "../logger/logger";
import { errors } from "../utilities/error";
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
    const newResponse: NewResponse = { ...defaultServerResponse };
    try {
      const ownerDetails = await advertisementService.getOwner({
        advertisementId: request.params.advertisementId,
      });
      newResponse.status = success.OK.code;
      newResponse.message = advertisementFollowInfo["OWNER_DETAILS"];
      newResponse.body = ownerDetails;
      logger.info(`Sent response for getOwner: ${JSON.stringify(newResponse)}`);
    } catch (error: any) {
      logger.error(`Error in getOwner: ${error}`);
      newResponse.status = errors.Bad_Request.code;
      newResponse.message = "An error occurred while processing the request.";
      newResponse.body = { error: error.message };
    }
    response.status(newResponse.status).send(newResponse);
  };

  getFollowerList = async (request: any, response: any, next: NextFunction) => {
    const newResponse: NewResponse = { ...defaultServerResponse };
    try {
      const followerList = await advertisementService.getFollowerList({
        advertisementId: request.params.advertisementId,
        query: request.query,
      });
      newResponse.status = success.OK.code;
      newResponse.message = advertisementFollowInfo["LIST_OF_FOLLOWER"];
      newResponse.body = followerList;
      logger.info(
        `Sent response for getFollowerList: ${JSON.stringify(newResponse)}`
      );
    } catch (error: any) {
      newResponse.status = JSON.parse(error)["status"];
      newResponse.message = JSON.parse(error)["messages"];
      newResponse.body = undefined;
    }
    response.status(newResponse.status).send(newResponse);
  };
}

export default new AdvertisementController();
