import express from "express";
import { validateToken } from "../utilities/AuthToke";
import advertisement_controller from "../controller/advertisementController";

const advertisementRouter = express.Router();

advertisementRouter.get(
  "/owner/:advertisementId",
  validateToken,
  advertisement_controller.getOwner
);
advertisementRouter.get(
  "/follower/:advertisementId",
  validateToken,
  advertisement_controller.getFollowerList
);

export { advertisementRouter };
