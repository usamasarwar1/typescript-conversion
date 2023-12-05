import userService from "./userservice";
import {Category} from "../utilities/enum"
import categoryService from "../services/categoryService"; // Import your dependencies
import { CategoryInfo } from "../utilities/enum"; // Import constants
import { success } from "../utilities/success";
import { userCategoryModel } from "../model/user_category";
import { BadRequestException, NotFoundException, NotValidException } from "../exceptions";
import {  CategoryIdQuery } from "../services/advertisement/IAdvertisementData";

import mongoose from "mongoose";
import { pagination } from "../utilities/pagination";

interface CategoryFollowData {
  userId: string;
  category_ids: string[];
}

interface CategoryFollowQuery {
  category_ids: string[];
  is_follow: boolean;
}

class CategoryFollowService {
  async categoryFollowOrUnfollow(
    userId: string,
    query: CategoryFollowQuery
  ): Promise<any> {
    try {
      const { is_follow, category_ids } = query;
      console.log("folounfolofollow", is_follow);
      const user = await userService.getVerifiedUser({ userId });
      const valid_category_ids = await categoryService.validCategory(category_ids);

      if (!valid_category_ids || valid_category_ids.length === 0) {
        throw new BadRequestException("Valid category IDs are null or undefined.");
      }

      const alreadyFollowedCategory = await userCategoryModel.find({
        user_id: user?._id,
        category_id: { $in: valid_category_ids },
      });

      if (!valid_category_ids.length) {
        throw new BadRequestException("Users Categories provided or invalid.");
      }

      if (is_follow == true) {
        const UsersCategoryItems: any[] = [];
        const alreadyFollowedCategoryIds = alreadyFollowedCategory.map((Category) =>
          Category.category_id.toString()
        );

        const validCategoryId = valid_category_ids.map((id) => id.toString());

        const followCategoryId = valid_category_ids.filter(
          (id) => !alreadyFollowedCategoryIds.includes(id.toString())
        );

        const invalidId = category_ids.filter(
          (id) => !validCategoryId.includes(id.toString())
        );

        for (const categoryId of followCategoryId) {
          UsersCategoryItems.push({
            user_id: user?._id,
            category_id: categoryId,
          });
        }

        const result = UsersCategoryItems.length > 0 ? await userCategoryModel.insertMany(UsersCategoryItems) : [];

        return {
          status: result.length ? success.OK.code : success.Partial_Content.code,
          message: result.length
            ? "users Categories followed successfully"
            : "users Categories followed partially",
          body: {
            success: result.length ? result : undefined,
            error: {
              message: {
                invalid_id: invalidId.length
                  ? `The Invalid Categories Id Are ${invalidId}`
                  : undefined,
                already_followed_id: alreadyFollowedCategoryIds.length
                  ? `Already Followed Categories ${alreadyFollowedCategoryIds}`
                  : undefined,
              },
              values: {
                invalid_id: invalidId.length ? invalidId : undefined,
                already_followed_id: alreadyFollowedCategoryIds.length
                  ? alreadyFollowedCategoryIds
                  : undefined,
              },
            },
          },
        };
      } else if (is_follow == false) {
        if (!alreadyFollowedCategory.length) {
          throw new NotValidException("The category_ids is not valid for un-follow.");
        }

        await userCategoryModel.deleteMany({
          user_id: user?._id,
          category_id: { $in: valid_category_ids },
        });

        return {
          status: success.OK.code,
          message: ` ${CategoryInfo["DELETE_FOLLOWED_CATEGORY"]}`,
          body: valid_category_ids,
        };
      }
    } catch (error) {
      throw error;
    }
  }

  async getCategoryFollowedList(userId: string | any): Promise<any> {
    try {
      const user = await userService.getVerifiedUser({ userId });
      const userCategory = await userCategoryModel.aggregate([
        {
          $match: { user_id: user?._id },
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
          $match: { $and: [{ "category.is_active": true }, { "category.is_deleted": false }] },
        },
        {
          $project: {
            _id: 0,
            id: "$category._id",
            title: "$category.title",
            code: "$category.code",
            url: "$category.image.url",
          },
        },
      ]);
      return userCategory;
    } catch (error) {
      throw error;
    }
  }

  async getCategoryFollowerList(categoryIdQuery: CategoryIdQuery): Promise<any> {
    try {
      const { category_id, query } = categoryIdQuery;
      let { is_pagination, page_index, page_size } = query;
      console.log("the value is :",typeof is_pagination);
      is_pagination = typeof is_pagination === 'boolean' ? is_pagination : is_pagination === 'true' ? true : is_pagination === 'false' ? false : undefined;

      const categ_id = await categoryService.validCategory(category_id);
      if (!categ_id) throw new NotFoundException(category_id, Category.CATEGORY_ID); //FEEDBACK - Adding all the type to a enum / constant. 
      
      const match: any[] = [{ $match: { "category_id" : new mongoose.Types.ObjectId(category_id) } }];
      const filter: any[] = [];
      let paginationObject: any;

      if (is_pagination) {
        const dataCountResult = await userCategoryModel.aggregate([
          ...match,
          {
            $lookup: {
              from: "categories",
              localField: "category_id",
              foreignField: "_id",
              as: "category",
            },
          },
          { $unwind: "$category"},
          {
            $match: {
              "category.is_active": true,
              "category.is_deleted": false,
            },
          },
          {
            $lookup: {
              from: 'users',
              localField: 'user_id',
              foreignField: '_id',
              as: 'followersDetails'
            }
          },
          { $unwind: "$followersDetails"},
          { $group: { _id: null, count: { $sum: 1 } } },
          { $project: { _id: 0, count: '$count' } }
        ]);

        const dataCount = dataCountResult.length > 0 ? dataCountResult[0].count : 0;
        const paginationDetails = pagination(page_index, page_size, dataCount);
        const { skip, limit } = paginationDetails;

        paginationObject = paginationDetails.paginationObject;

        if (skip) filter.push({ $skip: skip });
        if (limit) filter.push({ $limit: limit });
      }

      const data = await userCategoryModel.aggregate([
        ...match,
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
          $match: {
            "category.is_active": true,
            "category.is_deleted": false,
          },
        },
        {
          $lookup: {
            from: 'users',
            localField: 'user_id',
            foreignField: '_id',
            as: 'followersDetails'
          }
        },
        {
          $unwind: "$followersDetails",
        },
        ...filter,
        { $project: { user_id: '$followersDetails._id', user_email: '$followersDetails.email', _id: 0 } }
      ]);
      if (is_pagination) {
        paginationObject.data = data;
        return paginationObject;
      }
      return data;
    } catch (error) {
      throw error;
    }
  }
}

export default new CategoryFollowService();
