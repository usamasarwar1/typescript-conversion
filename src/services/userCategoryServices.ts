import user_service from "./user.service";

import category_service from "../services/categoryService"; // Import your dependencies

import { categoryInfo } from "../utilities/common/category_label"; // Import constants
import { errors } from "../utilities/error";
import { success } from "../utilities/success";
import { userCategoryModel } from "../model/user_category";

const categoryFollowOrUnfollow = async (
  userId: any,
  categoryFollow: any,
  query: any,
) => {
  try {
    const { category_ids } = categoryFollow;
    const { is_follow } = query;
    const user = await user_service.getVerifiedUser({ userId });
    let valid_category_ids: any = await category_service.validCategory(
      category_ids,
    );
    let alreadyFollowedCategory: any = await userCategoryModel.find({
      user_id: user._id,
      category_id: { $in: valid_category_ids },
    });

    if (!valid_category_ids.length) {
      return {
        status: 400,
        message: "users Categories provided or invalid",
        body: {
          error: {
            message: `The Invalid Categories Id Are ${category_ids}`,
            values: category_ids,
          },
        },
      };
    } else if (query && is_follow === "true") {
      let UsersCategoryItems: any[] = [];

      if (
        valid_category_ids.length === category_ids.length &&
        !alreadyFollowedCategory.length
      ) {
        await valid_category_ids.forEach(async (categoryId: any) => {
          const userCategory = {
            user_id: user._id,
            category_id: categoryId,
          };
          UsersCategoryItems.push(userCategory);
        });

        UsersCategoryItems = await userCategoryModel.insertMany(
          UsersCategoryItems,
        );

        return {
          status: success.OK.code,
          message: "users Categories followed successfully",
          body: {
            success: UsersCategoryItems,
          },
        };
      } else {
        alreadyFollowedCategory = alreadyFollowedCategory.map((Category: any) =>
          Category.category_id.toString(),
        );
        valid_category_ids = valid_category_ids.map((id: any) => id.toString());
        const followCategoryId = valid_category_ids.filter(
          (id: any) => !alreadyFollowedCategory.includes(id),
        );
        const invalidId = category_ids.filter(
          (id: any) => !valid_category_ids.includes(id.toString()),
        );

        await followCategoryId.forEach(async (categoryId: any) => {
          const userCategory = {
            user_id: user._id,
            category_id: categoryId,
          };
          UsersCategoryItems.push(userCategory);
        });

        UsersCategoryItems = await userCategoryModel.insertMany(
          UsersCategoryItems,
        );

        return {
          status: UsersCategoryItems.length
            ? success.Partial_Content.code
            : errors.Not_Acceptable.code,
          message: UsersCategoryItems.length
            ? "users Categories followed partially"
            : errors.Not_Acceptable.message,
          body: {
            success: UsersCategoryItems.length ? UsersCategoryItems : undefined,
            error: {
              message: {
                invalid_id: invalidId.length
                  ? `The Invalid Categories Id Are ${invalidId}`
                  : undefined,
                already_followed_id: alreadyFollowedCategory.length
                  ? `Already Followed Categories ${alreadyFollowedCategory}`
                  : undefined,
              },
              values: {
                invalid_id: invalidId.length ? invalidId : undefined,
                already_followed_id: alreadyFollowedCategory.length
                  ? alreadyFollowedCategory
                  : undefined,
              },
            },
          },
        };
      }
    } else if (query && is_follow === "false") {
      if (!alreadyFollowedCategory.length) {
        throw JSON.stringify({
          status: errors.Not_Found.code,
          messages: errors.Not_Found.message,
        });
      }

      await userCategoryModel.deleteMany({
        user_id: user._id,
        category_id: { $in: valid_category_ids },
      });

      return {
        status: success.OK.code,
        message: ` ${categoryInfo["DELETE_FOLLOWED_CATEGORY"]}`,
        body: valid_category_ids,
      };
    }
  } catch (error) {
    throw error;
  }
};

const getCategoryFollowedList = async (userId: string) => {
  try {
    const user = await user_service.getVerifiedUser({ userId });
    const userCategory = await userCategoryModel.aggregate([
      {
        $match: { user_id: user._id },
      },
      {
        $lookup: {
          from: "categories",
          localField: "category_id",
          foreignField: "_id",
          as: "category",
        },
      },
      {
        $unwind: "$category",
      },
      {
        $project: {
          _id: 0,
          id: "$category._id",
          title: "$category.title",
          code: "$category.code",
        },
      },
    ]);
    return userCategory;
  } catch (error) {
    throw error;
  }
};

export default {
  categoryFollowOrUnfollow,
  getCategoryFollowedList,
};
