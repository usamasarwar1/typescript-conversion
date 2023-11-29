import express from "express";
import { validateToken } from "../utilities/AuthToke";
import promotion_controller from "../controller/promotionController";

const promotionRouter = express.Router();

promotionRouter.get(
  "/owner/:promotionId",
  validateToken, //FEEDBACK - Parameter validation need to done
  promotion_controller.getOwner
);

promotionRouter.get(
  "/follower/:promotionId",
  validateToken, //FEEDBACK - Parameter validation need to done
  promotion_controller.getFollowerList
);

export { promotionRouter };
