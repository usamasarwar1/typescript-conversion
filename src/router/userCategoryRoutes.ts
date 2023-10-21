import express, { Router } from "express";
import { validateToken } from "../utilities/AuthToke";
import { validateBody } from "../utilities/validation/joiSchemaValidation";
import { categoryFollowSchema } from "../schemaValidation/userCategory";
import user_category_controller from "../controller/userCategoryController";

const user_category_router: Router = express.Router();

user_category_router.post(
  "/",
  validateToken,
  validateBody(categoryFollowSchema),
  user_category_controller.categoryFollowOrUnfollow,
);

user_category_router.get(
  "/follow_list",
  validateToken,
  user_category_controller.getFollowCategory,
);

export { user_category_router };
