import express from "express";
import { validateToken } from "../utilities/AuthToke";
import advertisement_controller from "../controller/advertisementController";
import { validateManagementQuery } from "../utilities/validation";
import { AdvertisementValidation } from "../schemaValidation/userAdvertisement";
const advertisementIdSchema = new AdvertisementValidation().getAdvertisementIdSchema();
const advertisementIdPaginationSchema = new AdvertisementValidation().getAdvertisementIdPaginationSchema();
const advertisementRouter = express.Router();

advertisementRouter.get(
  "/owner/:advertisementId",
  validateToken,
  validateManagementQuery(advertisementIdSchema), //FEEDBACK --THIS Validation is not working
  advertisement_controller.getOwner
);
advertisementRouter.get(
  "/follower/:advertisementId",
  validateToken,
  validateManagementQuery(advertisementIdPaginationSchema), //FEEDBACK --THIS Validation is not working
  advertisement_controller.getFollowerList
);

export { advertisementRouter };
