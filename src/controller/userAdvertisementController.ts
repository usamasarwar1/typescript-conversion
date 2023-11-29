import { defaultServerResponse } from "../utilities/common/response";
import {
  advertisementFollowInfo,
  advertisementFavouriteInfo,
} from "../utilities/common/advertisement_label";
import { success } from "../utilities/success";
import { decode } from "../utilities/jwt";
import followFavouriteService from "../services/advertisement/followFavouriteService";
import promotion_service from "../services/promotionService";
import ebanner_service from "../services/ebannerService";
import { logger } from "../logger/logger";
import { Request, Response, NextFunction } from 'express';

interface NewResponse {
  status: number;
  message: string | any;
  body: string | any;
}

class AdvertisementController {
  static async followUnfollowAdvertisementById(
    request: Request | any,
    response: Response,
    next: NextFunction
  ) {
    try {
      const newResponse = { ...defaultServerResponse };
      const decodedData = decode(request.token);
      const { query, params } = request;
      const { advertisementId } = params;

      const userFollowAdvertisement = await followFavouriteService.followUnfollowAdvertisement({
        userId: decodedData.id,
        query,
        advertisement_id: advertisementId
      });

      newResponse.status = success.OK.code;
      newResponse.message = userFollowAdvertisement.message;
      newResponse.body = userFollowAdvertisement.body;

      logger.info(`Sent response for followUnfollowAdvertisementById: ${JSON.stringify(newResponse)}`);
      response.json(newResponse);
    } catch (error) {
      logger.error(`Error in followUnfollowAdvertisementById: ${error}`);
      next(error);
    }
  }

  static async setFavouriteAdvertisementById(
    request: Request | any,
    response: Response,
    next: NextFunction
  ) {
    let newResponse: NewResponse = defaultServerResponse;
    try {
      let decodedData = decode(request.token);
      const userFavouriteAdvertisement = await followFavouriteService.setFavouritesAdvertisementById({
        userId: decodedData["id"],
        query: request.query,
        advertisement_id: request.params.advertisementId,
      });
      newResponse.status = success.OK.code;
      newResponse.message = userFavouriteAdvertisement.message;
      newResponse.body = userFavouriteAdvertisement.body;
      logger.info(`Sent response for setFavouriteAdvertisementById: ${JSON.stringify(newResponse)}`);
      response.json(newResponse);
    } catch (error: any) {
      logger.error(`Error in setFavouriteAdvertisementById: ${error}`);
      next(error);
    }
  }

  static async getAdvertisementFollowList(
    request: Request | any,
    response: Response,
    next: NextFunction
  ) {
    let newResponse: NewResponse = defaultServerResponse;
    try {
      let decodedData = decode(request.token);
      const userFollowedAdvertisement =
        await followFavouriteService.getAdvertisementFollowFavoriteList({
          userId: decodedData["id"],
          query: request.query,
          type: "follow_list",
        });
      newResponse.status = success.OK.code;
      newResponse.message = advertisementFollowInfo["LIST_FOLLOWED_ADVERTISEMENT_DETAILS"];
      newResponse.body = userFollowedAdvertisement;
      logger.info(`Sent response for getAdvertisementFollowList`);
      response.json(newResponse);
    } catch (error: any) {
      logger.error(`Error in getAdvertisementFollowList: ${error}`);
      next(error);
    }

  }

  static async getAdvertisementFavoriteList(
    request: Request | any,
    response: Response,
    next: NextFunction
  ) {
    let newResponse: NewResponse = defaultServerResponse;
    try {
      let decodedData = decode(request.token);
      const userFavouriteAdvertisement =
        await followFavouriteService.getAdvertisementFollowFavoriteList({
          userId: decodedData["id"],
          query: request.query,
          type: "favourite_list",
        });
      newResponse.status = success.OK.code;
      newResponse.message = advertisementFavouriteInfo["LIST_FAVOURITE_ADVERTISEMENT_DETAILS"];
      newResponse.body = userFavouriteAdvertisement;
      logger.info(`Sent response for getAdvertisementFavoriteList`);
      response.json(newResponse);
    } catch (error: any) {
      logger.error(`Error in getAdvertisementFavoriteList: ${error}`);
      next(error);
    }
  }

  //Get Favouite Promotion by User 
  //(It get the favourite Advertisement for a user and gets the active promotion for those advertisement)
  static async getFavoritesAdvertisementPromotionList(
    request: Request | any,
    response: Response,
    next: NextFunction
  ) {
    let newResponse: NewResponse = defaultServerResponse;
    try {
      let decodedData = decode(request.token);
      const userFavouriteAdvertisementPrmotions = await promotion_service.getUserAdvertisementPromotionsByType({
        userId: decodedData["id"],
        query: request.query,
        type: "FAVOURITESADVERTISEMENT",
      });
      newResponse.status = success.OK.code;
      newResponse.message = advertisementFavouriteInfo["LIST_FAVOURITE_ADVERTISEMENT_PROMOTION_DETAILS"];
      newResponse.body = userFavouriteAdvertisementPrmotions;
      logger.info(`Sent response for getFavoritesAdvertisementPromotionList.`);
      response.json(newResponse);
    } catch (error: any) {
      logger.error(`Error in getFavoritesAdvertisementPromotionList: ${error}`);
      next(error);
    }
  }

  //Get Follow Promotion by User 
  //(It get the Followed Advertisement for a user and gets the active promotion for those advertisement)
  static async getFollowedAdvertisementPromotionList(
    request: Request | any,
    response: Response,
    next: NextFunction
  ) {
    let newResponse: NewResponse = defaultServerResponse;
    try {
      let decodedData = decode(request.token);
      const userFavouriteAdvertisementPrmotions = await promotion_service.getUserAdvertisementPromotionsByType({
        userId: decodedData["id"],
        query: request.query,
        type: "FOLLOWEDADVERTISEMENT",
      });
      newResponse.status = success.OK.code;
      newResponse.message = advertisementFavouriteInfo["LIST_FOLLOWED_ADVERTISEMENT_PROMOTION_DETAILS"];
      newResponse.body = userFavouriteAdvertisementPrmotions;
      logger.info(`Sent response for getFavoritesAdvertisementPromotionList.`);
      response.json(newResponse);
    } catch (error: any) {
      logger.error(`Error in getFavoritesAdvertisementPromotionList: ${error}`);
      next(error);
    }
  }

  static async getFavoritesAdvertisementEbannerList(
    request: Request | any,
    response: Response,
    next: NextFunction
  ) {
    let newResponse: NewResponse = defaultServerResponse;
    try {
      let decodedData = decode(request.token);
      const userFavouriteAdvertisementEbanners = await ebanner_service.getUserAdvertisementEbannersByType({
          userId: decodedData["id"],
          query: request.query,
          type: "FAVOURITESADVERTISEMENT",
        });
      newResponse.status = success.OK.code;
      newResponse.message = advertisementFavouriteInfo["LIST_FAVOURITE_ADVERTISEMENT_EBANNER_DETAILS"];
      newResponse.body = userFavouriteAdvertisementEbanners;
      logger.info(`Sent response for getFavoritesAdvertisementEbannerList.`);
      response.json(newResponse);
    } catch (error: any) {
      logger.error(`Error in getFavoritesAdvertisementEbannerList: ${error}`);
      next(error);
    }
  }


  static async getFollowedAdvertisementEbannerList(
    request: Request | any,
    response: Response,
    next: NextFunction
  ) {
    let newResponse: NewResponse = defaultServerResponse;
    try {
      let decodedData = decode(request.token);
      const userFavouriteAdvertisementEbanners = await ebanner_service.getUserAdvertisementEbannersByType({
          userId: decodedData["id"],
          query: request.query,
          type: "FOLLOWEDADVERTISEMENT",
        });
      newResponse.status = success.OK.code;
      newResponse.message = advertisementFavouriteInfo["LIST_FAVOURITE_ADVERTISEMENT_EBANNER_DETAILS"];
      newResponse.body = userFavouriteAdvertisementEbanners;
      logger.info(`Sent response for getFavoritesAdvertisementEbannerList.`);
      response.json(newResponse);
    } catch (error: any) {
      logger.error(`Error in getFavoritesAdvertisementEbannerList: ${error}`);
      next(error);
    }
  }
}

export default AdvertisementController;
