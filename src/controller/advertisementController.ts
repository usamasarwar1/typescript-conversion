import { Request, Response, NextFunction } from "express";
import { defaultServerResponse } from "../utilities/common/response";
import { advertisementFollowInfo } from "../utilities/common/advertisement_label";
import { success } from "../utilities/success";
import { errors } from "../utilities/error";
import advertisementService from "../services/advertisement/advertisementService";
interface NewResponse {
  status: number;
  message: string;
  body: string | any;
}
const getOwner = async (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  const newResponse: NewResponse = { ...defaultServerResponse };
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
  const newResponse: NewResponse = { ...defaultServerResponse };
  try {
    const followerList = await advertisementService.getFollowerList({
      advertisementId: request.params.advertisementId,
      query: request.query,
    });
    newResponse.status = success.OK.code;
    newResponse.message = advertisementFollowInfo["LIST_OF_FOLLOWER"];
    newResponse.body = followerList;
  } catch (error: any) {
    newResponse.status = JSON.parse(error)["status"];
    newResponse.message = JSON.parse(error)["messages"];
    newResponse.body = undefined;
  }
  response.status(newResponse.status).send(newResponse);
};

export default {
  getOwner,
  getFollowerList,
};
