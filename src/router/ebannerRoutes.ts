import express from "express";
import { validateToken } from "../utilities/AuthToke";
import ebanner_controller from "../controller/ebannerController";

const ebannerRouter = express.Router();

ebannerRouter.get(
  "/owner/:ebannerId",
  validateToken,//FEEDBACK - Parameter validation need to done
  ebanner_controller.getOwner
);

ebannerRouter.get(
  "/follower/:ebannerId",
  validateToken, //FEEDBACK - Parameter validation need to done
  ebanner_controller.getFollowerList
);

export { ebannerRouter };
