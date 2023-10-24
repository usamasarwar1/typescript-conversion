import { Request, Response } from "express";
import { defaultServerResponse } from "../utilities/common/response";
import { decode } from "../utilities/jwt";
import { success } from "../utilities/success";
import { errors } from "../utilities/error";
import { ebannerInfo } from "../utilities/common/ebanner_label";
import { advertisementFollowInfo } from "../utilities/common/advertisement_label";
import advertisementService from "../services/advertisement/advertisementService";
import ebanner_service from "../services/ebannerService";

const userFollowedAdvertisementsEbanners = async (
  request: any,
  response: any,
) => {
  const newResponse: any = { ...defaultServerResponse };
  try {
    const decodedData = await decode((request as any).token);
    const userAdvertisementEbanner =
      await ebanner_service.getUserAdvertisementEbannersByType({
        query: request.query,
        userId: decodedData?.id,
        type: "FOLLOWEDADVERTISEMENT",
      });
    newResponse.status = success.OK.code;
    newResponse.message = ebannerInfo["USER_FOLLOWED_ADVERTISEMENTS_EBANNERS"];
    newResponse.body = userAdvertisementEbanner;
  } catch (error: any) {
    newResponse.status = errors.Bad_Request.code;
    newResponse.message = "An error occurred while processing the request.";
    newResponse.body = { error: error.message };  
  }
  response.status(newResponse.status).send(newResponse);
};

const getOwner = async (request: any, response: any) => {
  const newResponse: any = { ...defaultServerResponse };
  try {
    const advertisementId = ebanner_service.getAdvertisementId(
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
    newResponse.status = errors.Bad_Request.code;
    newResponse.message = "An error occurred while processing the request.";
    newResponse.body = { error: error.message };  
  }
  response.status(newResponse.status).send(newResponse);
};

const getFollowerList = async (request: any, response: any) => {
  const newResponse: any = { ...defaultServerResponse };
  try {
    const advertisementId: any = ebanner_service.getAdvertisementId(
      request.params.advertisementId,
    );

    if (advertisementId) {
      const followerList = await advertisementService.getFollowerList({
        advertisementId: request.params.advertisementId,
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
    newResponse.status = errors.Bad_Request.code;
    newResponse.message = "An error occurred while processing the request.";
    newResponse.body = { error: error.message };  
  }
  response.status(newResponse.status).send(newResponse);
};

export default {
  userFollowedAdvertisementsEbanners,
  getOwner,
  getFollowerList,
};
