import express from "express";
import { validateToken } from "../utilities/AuthToke";
import ebanner_controller from "../controller/ebannerController";

const ebannerRouter = express.Router();

ebannerRouter.get(
  "/followed",
  validateToken,
  ebanner_controller.userFollowedAdvertisementsEbanners,
);

ebannerRouter.get(
  "/owner/:promotionId",
  validateToken,
  ebanner_controller.getOwner,
);

ebannerRouter.get(
  "/follower/:promotionId",
  validateToken,
  ebanner_controller.getFollowerList,
);

export { ebannerRouter };
