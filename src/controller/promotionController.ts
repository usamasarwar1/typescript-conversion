import { Request, Response } from "express";
import { defaultServerResponse } from "../utilities/common/response";
import promotion_service from "../services/promotionService";
import { decode } from "../utilities/jwt";
import { success } from "../utilities/success";
import { errors } from "../utilities/error";
import { advertisementFollowInfo } from "../utilities/common/advertisement_label";
import advertisementService from "../services/advertisement/advertisementService";
import { promotionInfo } from "../utilities/common/promotion_label";
interface NewResponse {
  status: number;
  message: string;
  body: string | any;
}
interface CustomRequest extends Request {
  token: string; // Define the type of the 'token' property
}

const getUserFollowedAdvertisementPromotions = async (
  request: Request,
  response: Response,
) => {
  const newResponse: NewResponse = { ...defaultServerResponse };
  try {
    const decodedData = await decode((request as CustomRequest).token);
    const userAdvertisementPromotionsDetail =
      await promotion_service.getUserAdvertisementPromotionsByType({
        // query: request.query,
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
  } catch (error: any) {
    newResponse.status = errors.Bad_Request.code; // Default to Bad_Request for simplicity
    newResponse.message = "An error occurred while processing the request.";
    newResponse.body = { error: error.message }; // Include error message in the response
  }
  response.status(newResponse.status).send(newResponse);
};

const getOwner = async (request: Request | any, response: Response) => {
  const newResponse: NewResponse = { ...defaultServerResponse };
  try {
    const advertisementId = await promotion_service.getAdvertisementId(
      request.params.promotionId,
    );
      console.log("advertisementId: ", advertisementId)
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
    newResponse.status = errors.Bad_Request.code; // Default to Bad_Request for simplicity
    newResponse.message = "An error occurred while processing the request.";
    newResponse.body = { error: error.message }; // Include error message in the response
  }
  response.status(newResponse.status).send(newResponse);
};

const getFollowerList = async (request: Request | any, response: Response) => {
  const newResponse: NewResponse = { ...defaultServerResponse };
  try {
    const advertisementId = await promotion_service.getAdvertisementId(
      request.params.promotionId,
    );

    console.log("Advertisement ID:", advertisementId);  

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
    newResponse.status = errors.Bad_Request.code; // Default to Bad_Request for simplicity
    newResponse.message = "An error occurred while processing the request.";
    newResponse.body = { error: error.message }; // Include error message in the response
  }
  response.status(newResponse.status).send(newResponse);
};

export default {
  getUserFollowedAdvertisementPromotions,
  getOwner,
  getFollowerList,
};
