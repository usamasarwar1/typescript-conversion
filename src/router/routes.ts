import express, { Router } from "express";
import { user_advertisement_router } from "../router/userAdvertisementRoutes";
import { user_category_router } from "../router/userCategoryRoutes";
import { advertisementRouter } from "../router/advertisementRoutes";
import { promotionRouter } from "../router/promotionRoutes";
import { ebannerRouter } from "../router/ebannerRoutes";

const allRoutes: Router = express.Router();

allRoutes.use("/user", user_advertisement_router);
allRoutes.use("/user", user_category_router);
allRoutes.use("/advertisement", advertisementRouter);
allRoutes.use("/promotion", promotionRouter);
allRoutes.use("/ebanner", ebannerRouter);

export default allRoutes;
