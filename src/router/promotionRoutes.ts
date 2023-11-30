import express from "express";
import { validateToken } from "../utilities/AuthToke";
import promotion_controller from "../controller/promotionController";
import { PromotionValidation } from "../schemaValidation/promotion";
import { validateManagementParmas } from "../utilities/validation/index";
const promotionIdSchema = new PromotionValidation().getPromotionIdSchema();
const promotionRouter = express.Router();

promotionRouter.get(
  "/owner/:promotionId",
  validateToken, //FEEDBACK - Parameter validation need to done
  validateManagementParmas(promotionIdSchema),
  promotion_controller.getOwner
);

promotionRouter.get(
  "/follower/:promotionId",
  validateToken, //FEEDBACK - Parameter validation need to done
  validateManagementParmas(promotionIdSchema),
  promotion_controller.getFollowerList
);

export { promotionRouter };
