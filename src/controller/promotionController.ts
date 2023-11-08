import { Request, Response } from "express";
import { defaultServerResponse } from "../utilities/common/response";
import promotion_service from "../services/promotionService";
import { decode } from "../utilities/jwt";
import { success } from "../utilities/success";
import { errors } from "../utilities/error";
import { advertisementFollowInfo } from "../utilities/common/advertisement_label";
import advertisementService from "../services/advertisement/advertisementService";
import { promotionInfo } from "../utilities/common/promotion_label";
import { logger } from "../logger/logger";

interface NewResponse {
  status: number;
  message: string;
  body: string | any;
}

interface CustomRequest extends Request {
  token: string; // Define the type of the 'token' property
}

class PromotionController {
  private async handleRequest(
    request: Request | any,
    response: Response,
    callback: () => Promise<void>
  ) {
    let newResponse: NewResponse = defaultServerResponse;
    try {
      await callback();
    } catch (error: any) {
      logger.error(`Error: ${error}`);
      newResponse.status = 500;
      newResponse.message = "An error occurred while processing the request.";
      newResponse.body = { error: error.message };
    }
  }

  getUserFollowedAdvertisementPromotions = async (
    request: Request,
    response: Response
  ) => {
    await this.handleRequest(request, response, async () => {
      const newResponse: NewResponse = { ...defaultServerResponse };
      try {
        const decodedData = await decode((request as CustomRequest).token);
        const userAdvertisementPromotionsDetail =
          await promotion_service.getUserAdvertisementPromotionsByType({
            query: {
              is_pagination: request.query.is_pagination,
              page_index: request.query.page_index,
              page_size: request.query.page_size,
            },
            userId: decodedData?.id,
            type: "FOLLOWEDADVERTISEMENT",
          });
        newResponse.status = success.OK.code;
        newResponse.message =
          promotionInfo["USER_FOLLOWED_ADVERTISEMENT_PROMOTIONS"];
        newResponse.body = userAdvertisementPromotionsDetail;
        logger.info(`Sent response for getUserFollowedAdvertisementPromotions: ${JSON.stringify(newResponse)}`);
      } catch (error: any) {
        logger.error(`Error in getUserFollowedAdvertisementPromotions: ${error}`);
        newResponse.status = errors.Bad_Request.code; // Default to Bad_Request for simplicity
        newResponse.message = "An error occurred while processing the request.";
        newResponse.body = { error: error.message }; // Include error message in the response
      }
      response.status(newResponse.status).send(newResponse);
    });
  };
  

  getOwner = async (request: Request | any, response: Response) => {
    await this.handleRequest(request, response, async () => {
      const newResponse: NewResponse = { ...defaultServerResponse };
      try {
        logger.info(`Received request for getOwner: ${JSON.stringify(request.params)}`);
        const advertisementId = await promotion_service.getAdvertisementId(request.params.promotionId);
        if (advertisementId) {
          const ownerDetails = await advertisementService.getOwner({ advertisementId });
          newResponse.status = success.OK.code;
          newResponse.message = advertisementFollowInfo["OWNER_DETAILS"];
          newResponse.body = ownerDetails;
        } else {
          newResponse.status = errors.Not_Found.code;
          newResponse.message = errors.Not_Found.message;
          newResponse.body = null;
        }
      } catch (error: any) {
        logger.error(`Error in getOwner: ${error}`);
        newResponse.status = errors.Bad_Request.code;
        newResponse.message = "An error occurred while processing the request.";
        newResponse.body = { error: error.message };
      }
      response.status(newResponse.status).send(newResponse);
    });
  };
  
  getFollowerList = async (request: Request | any, response: Response) => {
    await this.handleRequest(request, response, async () => {
      const newResponse: NewResponse = { ...defaultServerResponse };
      try {
        const advertisementId = await promotion_service.getAdvertisementId(request.params.promotionId);
        if (advertisementId) {
          const followerList = await advertisementService.getFollowerList({
            advertisementId,
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
        logger.error(`Error in getFollowerList: ${error}`);
        newResponse.status = errors.Bad_Request.code;
        newResponse.message = "An error occurred while processing the request.";
        newResponse.body = { error: error.message };
      }
      response.status(newResponse.status).send(newResponse);
    });
  };
  
}

export default new PromotionController();
