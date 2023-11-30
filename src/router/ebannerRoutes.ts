import express from "express";
import { validateToken } from "../utilities/AuthToke";
import ebanner_controller from "../controller/ebannerController";
import { EbannerValidation } from "../schemaValidation/ebanner";
import { validateManagementParmas } from "../utilities/validation/index";
const ebannerIdSchema = new EbannerValidation().getEbannerIdSchema();
const ebannerRouter = express.Router();

ebannerRouter.get(
  "/owner/:ebannerId",
  validateToken,//FEEDBACK - Parameter validation need to done
  validateManagementParmas(ebannerIdSchema),
  ebanner_controller.getOwner
);

ebannerRouter.get(
  "/follower/:ebannerId",
  validateToken, //FEEDBACK - Parameter validation need to done
  validateManagementParmas(ebannerIdSchema),
  ebanner_controller.getFollowerList
);

export { ebannerRouter };
