import { Request, Response } from "express";
import { defaultServerResponse } from "../utilities/common/response";
import promotion_service from "../services/promotionService";
import { decode } from "../utilities/jwt";
import { success } from "../utilities/success";
import  {errors}  from "../utilities/error";
import { advertisementFollowInfo } from "../utilities/common/advertisement_label";
import advertisementService from "../services/advertisement/advertisementService";
import { promotionInfo } from "../utilities/common/promotion_label";

const getUserFollowedAdvertisementPromotions = async (
  request: any,
  response: any
) => {
  const newResponse: any = { ...defaultServerResponse };
  try {
    const decodedData = await decode((request as any).token);
    console.log(decodedData);
    const userAdvertisementPromotionsDetail =
      await promotion_service.getUserAdvertisementPromotionsByType({
        query: {
          is_pagination: request.query.is_pagination,
          page_index: request.query.page_index,
          page_size: request.query.page_size,
        },
        userId: decodedData?.id, // Simplified access to decodedData
        type: "FOLLOWEDADVERTISEMENT",
      });
    newResponse.status = success.OK.code;
    newResponse.message =
      promotionInfo["USER_FOLLOWED_ADVERTISEMENT_PROMOTIONS"];
    newResponse.body = userAdvertisementPromotionsDetail;
  } catch (error: any) {
    // Improved error handling
    newResponse.status = errors.Bad_Request.code; // Default to Bad_Request for simplicity
    newResponse.message = "An error occurred while processing the request.";
    newResponse.body = { error: error.message }; // Include error message in the response
  }
  response.status(newResponse.status).send(newResponse);
};


const getOwner = async (request: any, response: any) => {  
  const newResponse: any = { ...defaultServerResponse };

  try {
    const advertisementId = await promotion_service.getAdvertisementId(
      request.params.promotionId,
    );

    console.log("Advertisement ID:", advertisementId);  


    if (advertisementId) {
      const ownerDetails = await advertisementService.getOwner({
        advertisementId: advertisementId,
      });
      console.log("details of",ownerDetails);
      newResponse.status = success.OK.code;
      newResponse.message = advertisementFollowInfo["OWNER_DETAILS"];
      newResponse.body = ownerDetails;
    } else {
      newResponse.status = errors.Not_Found.code;
      newResponse.message = errors.Not_Found.message;
      newResponse.body = null;
    }
  } catch (error: any) {
    console.log("error promotion controller", error);
    newResponse.status = errors.Bad_Request.code; // Default to Bad_Request for simplicity
    newResponse.message = "An error occurred while processing the request.";
    newResponse.body = { error: error.message }; // Include error message in the response
  }
  response.status(newResponse.status).send(newResponse);
};

const getFollowerList = async (request: any, response: any) => {
  const newResponse: any = { ...defaultServerResponse };
  try {
    const advertisementId = await promotion_service.getAdvertisementId(
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
