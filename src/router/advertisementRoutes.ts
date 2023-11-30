import express from "express";
import { validateToken } from "../utilities/AuthToke";
import advertisement_controller from "../controller/advertisementController";
import { validateManagementParmas, validateManagementQuery } from "../utilities/validation/index";
import { AdvertisementValidation } from "../schemaValidation/userAdvertisement";
const advertisementIdSchema = new AdvertisementValidation().getAdvertisementIdSchema();
const advertisementIdPaginationSchema = new AdvertisementValidation().getAdvertisementIdPaginationSchema();
const advertisementNotificationSchema = new AdvertisementValidation().getAdvertisementNotificationSchema()
const advertisementRouter = express.Router();

advertisementRouter.get(
  "/owner/:advertisementId",
  validateToken,
  validateManagementParmas(advertisementIdSchema), //FEEDBACK --THIS Validation is not working
  validateManagementQuery(advertisementNotificationSchema),
  advertisement_controller.getOwner
);
advertisementRouter.get(
  "/follower/:advertisementId",
  validateToken,
  validateManagementQuery(advertisementIdPaginationSchema),
  validateManagementParmas(advertisementIdSchema),  //FEEDBACK --THIS Validation is not working
  advertisement_controller.getFollowerList
);

export { advertisementRouter };
