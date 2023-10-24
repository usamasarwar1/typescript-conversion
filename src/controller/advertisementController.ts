import { Request, Response, NextFunction } from "express";
import { defaultServerResponse } from "../utilities/common/response";
import { advertisementFollowInfo } from "../utilities/common/advertisement_label";
import { success } from "../utilities/success";
import { ObjectId } from 'mongodb';
import { errors } from "../utilities/error";
import advertisementService from "../services/advertisement/advertisementService";

const getOwner = async (request: any, response: any, next: NextFunction) => {
  const newResponse: any = { ...defaultServerResponse };
  try {
    const ownerDetails = await advertisementService.getOwner({
      advertisementId: request.params.advertisementId,
    });
    newResponse.status = success.OK.code;
    newResponse.message = advertisementFollowInfo["OWNER_DETAILS"];
    newResponse.body = ownerDetails;
  } catch (error: any) {
    console.log(error);
    newResponse.status = errors.Bad_Request.code;
    newResponse.message = "An error occurred while processing the request.";
    newResponse.body = { error: error.message };
  }
  response.status(newResponse.status).send(newResponse);
};

const getFollowerList = async (
  request: any,
  response: any,
  next: NextFunction,
) => {
  const newResponse: any = { ...defaultServerResponse };
  try {
    const followerList = await advertisementService.getFollowerList({
      advertisementId: request.params.advertisementId,
      query: request.query,
    });
    newResponse.status = success.OK.code;
    newResponse.message = advertisementFollowInfo["LIST_OF_FOLLOWER"];
    newResponse.body = followerList;
  } catch (error: any) {
    newResponse.status = errors.Bad_Request.code;
    newResponse.message = "An error occurred while processing the request.";
    newResponse.body = { error: error.message };
  }
  response.status(newResponse.status).send(newResponse);
};

export default {
  getOwner,
  getFollowerList,
};
