import express from "express";
import { validateToken } from "../utilities/AuthToke";
import { validateManagementQuery } from "../utilities/validation/index";
import {
  followerAdvertisementSchema,
  favouriteAdvertisementSchema,
  paginationSchema,
} from "../schemaValidation/userAdvertisement";

import user_advertisement_controller from "../controller/userAdvertisementController";

const user_advertisement_router = express.Router();

user_advertisement_router.post(
  "/advertisement/follow/:advertisementId",
  validateToken,
  validateManagementQuery(followerAdvertisementSchema),
  user_advertisement_controller.followUnfollowAdvertisementById,
);

user_advertisement_router.post(
  "/advertisement/favourite/:advertisementId",
  validateToken,
  validateManagementQuery(favouriteAdvertisementSchema),
  user_advertisement_controller.setFavouriteAdvertisementById,
);

user_advertisement_router.get(
  "/advertisement/followed",
  validateToken,
  validateManagementQuery(paginationSchema),
  user_advertisement_controller.getAdvertisementFollowList,
);

user_advertisement_router.get(
  "/advertisement/favourites",
  validateToken,
  validateManagementQuery(paginationSchema),
  user_advertisement_controller.getAdvertisementFavoriteList,
);

user_advertisement_router.get(
  "/advertisement/favourites/promotions",
  validateToken,
  validateManagementQuery(paginationSchema),
  user_advertisement_controller.getFavoritesAdvertisementPromotionList,
);

user_advertisement_router.get(
  "/advertisement/favourites/ebanners",
  validateToken,
  validateManagementQuery(paginationSchema),
  user_advertisement_controller.getFavoritesAdvertisementEbannerList,
);

export { user_advertisement_router };
