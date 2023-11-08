import express from "express";
import { validateToken } from "../utilities/AuthToke";
import { validateBody } from "../utilities/validation/joiSchemaValidation";
import { categoryFollowSchema } from "../schemaValidation/userCategory";
import UserCategoriesController from "../controller/userCategoryController";

const user_category_router = express.Router();
const UserCategoryController = new UserCategoriesController();

user_category_router.post(
  "/category/",
  validateToken,
  validateBody(categoryFollowSchema),
  UserCategoryController.categoryFollowOrUnfollow,
);

user_category_router.get(
  "/category/follow_list",
  validateToken,
  UserCategoryController.getFollowCategory,
);

user_category_router.get(
  "/category/follow_list:/:categoryId",
  validateToken,
  UserCategoryController.getFollowCategory,
);


export { user_category_router };
