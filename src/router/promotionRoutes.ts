import express from "express";
import { validateToken } from "../utilities/AuthToke";
import promotion_controller from "../controller/promotionController";

const promotionRouter = express.Router();

promotionRouter.get(
  "/followed",
  validateToken,
  promotion_controller.getUserFollowedAdvertisementPromotions,
);

promotionRouter.get(
  "/owner/:promotionId",
  validateToken,
  promotion_controller.getOwner,
);

promotionRouter.get(
  "/advertisement/follower/:promotionId",
  validateToken,
  promotion_controller.getFollowerList,
);

export { promotionRouter };
