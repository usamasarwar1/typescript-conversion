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

const followUnfollowAdvertisementById = async (request: any, response: any) => {
  let newResponse: any = defaultServerResponse;
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
  } catch (error: any) {
    newResponse.status = 500;
    newResponse.message = JSON.parse(error)["messages"];
    newResponse.body = undefined;
  }
  response.status(newResponse.status).send(newResponse);
};

const setFavouriteAdvertisementById = async (request: any, response: any) => {
  let newResponse: any = defaultServerResponse;
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
  } catch (error: any) {
    newResponse.status = 500;
    newResponse.message = JSON.parse(error)["messages"];
    newResponse.body = undefined;
  }
  response.status(newResponse.status).send(newResponse);
};

const getAdvertisementFollowList = async (request: any, response: any) => {
  let newResponse: any = defaultServerResponse;
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
  } catch (error: any) {
    newResponse.status = 500;
    newResponse.message = JSON.parse(error)["messages"];
    newResponse.body = undefined;
  }
  response.status(newResponse.status).send(newResponse);
};

const getAdvertisementFavoriteList = async (request: any, response: any) => {
  let newResponse: any = defaultServerResponse;
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
  } catch (error: any) {
    newResponse.status = 500;
    newResponse.message = JSON.parse(error)["messages"];
    newResponse.body = undefined;
  }
  response.status(newResponse.status).send(newResponse);
};

const getFavoritesAdvertisementPromotionList = async (
  request: any,
  response: any,
) => {
  let newResponse: any = defaultServerResponse;
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
  } catch (error: any) {
    newResponse.status = 500;
    newResponse.message = JSON.parse(error)["messages"];
    newResponse.body = undefined;
  }
  response.status(newResponse.status).send(newResponse);
};

const getFavoritesAdvertisementEbannerList = async (
  request: any,
  response: any,
) => {
  let newResponse: any = defaultServerResponse;
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
  } catch (error: any) {
    newResponse.status = 500;
    newResponse.message = JSON.parse(error)["messages"];
    newResponse.body = undefined;
  }
  response.status(newResponse.status).send(newResponse);
};

export default {
  followUnfollowAdvertisementById,
  setFavouriteAdvertisementById,
  getAdvertisementFollowList,
  getAdvertisementFavoriteList,
  getFavoritesAdvertisementEbannerList,
  getFavoritesAdvertisementPromotionList,
};
