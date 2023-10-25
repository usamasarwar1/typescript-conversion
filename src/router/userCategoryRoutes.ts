import express from "express";
import { validateToken } from "../utilities/AuthToke";
import { validateBody } from "../utilities/validation/joiSchemaValidation";
import { categoryFollowSchema } from "../schemaValidation/userCategory";
import user_category_controller from "../controller/userCategoryController";

const user_category_router = express.Router();

user_category_router.post(
  "/category/",
  validateToken,
  validateBody(categoryFollowSchema),
  user_category_controller.categoryFollowOrUnfollow,
);

user_category_router.get(
  "/category/follow_list",
  validateToken,
  user_category_controller.getFollowCategory,
);

user_category_router.get(
  "/category/follow_list:/:categoryId",
  validateToken,
  user_category_controller.getFollowCategory,
);


export { user_category_router };
