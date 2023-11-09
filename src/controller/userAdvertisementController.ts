import { defaultServerResponse } from "../utilities/common/response";
import {
  advertisementFollowInfo,
  advertisementFavouriteInfo,
} from "../utilities/common/advertisement_label";
import { success } from "../utilities/success";
import { decode } from "../utilities/jwt";
import advertisementService from "../services/advertisement/indexService";
import promotion_service from "../services/promotionService";
import ebanner_service from "../services/ebannerService";
import { Request, Response } from "express";
import { logger } from "../logger/logger";

interface NewResponse {
  status: number;
  message: string | any;
  body: string | any;
}

interface CustomRequest extends Request {
  token: string; // Define the type of the 'token' property
}

class AdvertisementController {
  static async followUnfollowAdvertisementById(
    request: Request | any,
    response: Response
  ) {
    let newResponse: NewResponse = defaultServerResponse;
    try {
      let decodedData = await decode(request.token);
      const userFollowAdvertisement =
        await advertisementService.followUnfollowAdvertisement({
          userId: decodedData["id"],
          query: request.query,
          advertisement_id: request.params.advertisementId,
        });
      newResponse.status = success.OK.code;
      newResponse.message = userFollowAdvertisement["message"];
      newResponse.body = userFollowAdvertisement["body"];
      logger.info(`Sent response for followUnfollowAdvertisementById: ${JSON.stringify(newResponse)}`);
    } catch (error: any) {
      logger.error(`Error in followUnfollowAdvertisementById: ${error}`);
      newResponse.status = 500;
      newResponse.message = JSON.parse(error)["messages"];
      newResponse.body = undefined;
    }
    response.status(newResponse.status).send(newResponse);
  }

  static async setFavouriteAdvertisementById(
    request: Request | any,
    response: Response
  ) {
    let newResponse: NewResponse = defaultServerResponse;
    try {
      let decodedData = await decode(request.token);
      const userFavouriteAdvertisement =
        await advertisementService.setFavouritesAdvertisementById({
          userId: decodedData["id"],
          query: request.query,
          advertisement_id: request.params.advertisementId,
        });
      newResponse.status = success.OK.code;
      newResponse.message = userFavouriteAdvertisement["message"];
      newResponse.body = userFavouriteAdvertisement["body"];
      logger.info(`Sent response for setFavouriteAdvertisementById: ${JSON.stringify(newResponse)}`);
    } catch (error: any) {
      logger.error(`Error in setFavouriteAdvertisementById: ${error}`);
      newResponse.status = 500;
      newResponse.message = JSON.parse(error)["messages"];
      newResponse.body = undefined;
    }
    response.status(newResponse.status).send(newResponse);
  }

  static async getAdvertisementFollowList(
    request: Request | any,
    response: Response
  ) {
    let newResponse: NewResponse = defaultServerResponse;
    try {
      let decodedData = await decode(request.token);
      const userFollowedAdvertisement =
        await advertisementService.getAdvertisementFollowFavoriteList({
          userId: decodedData["id"],
          query: request.query,
          type: "follow_list",
        });
      newResponse.status = success.OK.code;
      newResponse.message =
        advertisementFollowInfo["LIST_FOLLOWED_ADVERTISEMENT_DETAILS"];
      newResponse.body = userFollowedAdvertisement;
      logger.info(`Sent response for getAdvertisementFollowList: ${JSON.stringify(newResponse)}`);
    } catch (error: any) {
      logger.error(`Error in getAdvertisementFollowList: ${error}`);
      newResponse.status = 500;
      newResponse.message = JSON.parse(error)["messages"];
      newResponse.body = undefined;
    }
    response.status(newResponse.status).send(newResponse);
  }

  static async getAdvertisementFavoriteList(
    request: Request | any,
    response: Response
  ) {
    let newResponse: NewResponse = defaultServerResponse;
    try {
      let decodedData = await decode(request.token);
      const userFavouriteAdvertisement =
        await advertisementService.getAdvertisementFollowFavoriteList({
          userId: decodedData["id"],
          query: request.query,
          type: "favourite_list",
        });
      newResponse.status = success.OK.code;
      newResponse.message =
        advertisementFavouriteInfo["LIST_FAVOURITE_ADVERTISEMENT_DETAILS"];
      newResponse.body = userFavouriteAdvertisement;
      logger.info(`Sent response for getAdvertisementFavoriteList: ${JSON.stringify(newResponse)}`);
    } catch (error: any) {
      logger.error(`Error in getAdvertisementFavoriteList: ${error}`);
      newResponse.status = 500;
      newResponse.message = JSON.parse(error)["messages"];
      newResponse.body = undefined;
    }
    response.status(newResponse.status).send(newResponse);
  }

  static async getFavoritesAdvertisementPromotionList(
    request: Request | any,
    response: Response
  ) {
    let newResponse: NewResponse = defaultServerResponse;
    try {
      let decodedData = await decode(request.token);
      const userFavouriteAdvertisementPrmotions =
        await promotion_service.getUserAdvertisementPromotionsByType({
          userId: decodedData["id"],
          query: request.query,
          type: "FAVOURITESADVERTISEMENT",
        });
      newResponse.status = success.OK.code;
      newResponse.message =
        advertisementFavouriteInfo[
          "LIST_FAVOURITE_ADVERTISEMENT_PROMOTION_DETAILS"
        ];
      newResponse.body = userFavouriteAdvertisementPrmotions;
      logger.info(`Sent response for getFavoritesAdvertisementPromotionList: ${JSON.stringify(newResponse)}`);
    } catch (error: any) {
      logger.error(`Error in getFavoritesAdvertisementPromotionList: ${error}`);
      newResponse.status = 500;
      newResponse.message = JSON.parse(error)["messages"];
      newResponse.body = undefined;
    }
    response.status(newResponse.status).send(newResponse);
  }

  static async getFavoritesAdvertisementEbannerList(
    request: Request | any,
    response: Response
  ) {
    let newResponse: NewResponse = defaultServerResponse;
    try {
      let decodedData = await decode(request.token);
      const userFavouriteAdvertisementEbanners =
        await ebanner_service.getUserAdvertisementEbannersByType({
          userId: decodedData["id"],
          query: request.query,
          type: "FAVOURITESADVERTISEMENT",
        });
      newResponse.status = success.OK.code;
      newResponse.message =
        advertisementFavouriteInfo[
          "LIST_FAVOURITE_ADVERTISEMENT_EBANNER_DETAILS"
        ];
      newResponse.body = userFavouriteAdvertisementEbanners;
      logger.info(`Sent response for getFavoritesAdvertisementEbannerList: ${JSON.stringify(newResponse)}`);
    } catch (error: any) {
      logger.error(`Error in getFavoritesAdvertisementEbannerList: ${error}`);
      newResponse.status = 500;
      newResponse.message = JSON.parse(error)["messages"];
      newResponse.body = undefined;
    }
    response.status(newResponse.status).send(newResponse);
  }
}

export default AdvertisementController;
