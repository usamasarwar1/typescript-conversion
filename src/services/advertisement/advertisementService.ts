import mongoose from "mongoose";
import * as AdvertisementSchema from "../../model/advertisement";
const { advertisementModel, advertisementFavouritesFollowersModel } =
  AdvertisementSchema;
import { pagination } from "../../utilities/pagination";

const getFollowFaviouriteDetails = async (advertisementData: any) => {
  try {
    let { match = [], filter = [], userId } = advertisementData;
    let advertisementDetails =
      await advertisementFavouritesFollowersModel.aggregate([
        ...match,
        {
          $project: {
            advertisement_id: 1,
          },
        },
        {
          $lookup: {
            from: "advertisements",
            let: { advertisementId: "$advertisement_id" },
            pipeline: [
              {
                $match: {
                  $and: [
                    {
                      $expr: {
                        $eq: ["$_id", "$$advertisementId"],
                      },
                    },
                    {
                      is_deleted: false,
                    },
                  ],
                },
              },
            ],
            as: "advertisements",
          },
        },
        {
          $unwind: "$advertisements",
        },
        ...filter,
        {
          $lookup: {
            from: "common.attachments",
            localField: "advertisements.image_id",
            foreignField: "_id",
            as: "image",
          },
        },
        {
          $unwind: {
            path: "$image",
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $lookup: {
            from: "advertisementfavouritesfollowers",
            localField: "advertisements._id",
            foreignField: "advertisement_id",
            as: "advertisementMetaData",
          },
        },
        {
          $unwind: {
            path: "$advertisementMetaData",
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $addFields: {
            "advertisements.image_url": {
              $cond: [{ $ifNull: ["$image.url", false] }, "$image.url", null],
            },
            "advertisements.followers_count": {
              $cond: [
                { $ifNull: ["$advertisementMetaData.followers_count", false] },
                "$advertisementMetaData.followers_count",
                0,
              ],
            },
            "advertisements.favourites_count": {
              $cond: [
                { $ifNull: ["$advertisementMetaData.favourites_count", false] },
                "$advertisementMetaData.favourites_count",
                0,
              ],
            },
            "advertisements.is_follow": {
              $in: [
                new mongoose.Types.ObjectId(userId),
                { $ifNull: ["$advertisementMetaData.followers", []] },
              ],
            },
            "advertisements.is_favourite": {
              $in: [
                new mongoose.Types.ObjectId(userId),
                { $ifNull: ["$advertisementMetaData.favourites", []] },
              ],
            },
          },
        },
        {
          $unset: ["image", "advertisementMetaData"],
        },
        {
          $lookup: {
            from: "publishdetails",
            localField: "advertisements.published_id",
            foreignField: "_id",
            as: "publishdetails",
          },
        },
        {
          $unwind: {
            path: "$publishdetails",
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $addFields: {
            categoryStage: {
              $filter: {
                input: "$publishdetails.stages",
                as: "item",
                cond: {
                  $eq: ["$$item.stage", "CONTACT_CATEGORIES"],
                },
              },
            },
            locationStage: {
              $filter: {
                input: "$publishdetails.stages",
                as: "item",
                cond: {
                  $eq: ["$$item.stage", "LOCATION_SLIDER"],
                },
              },
            },
          },
        },
        {
          $unwind: {
            path: "$locationStage",
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $unwind: {
            path: "$categoryStage",
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $unset: "publishdetails",
        },
        {
          $lookup: {
            from: "locationandsliderstages",
            localField: "locationStage.stage_id",
            foreignField: "stage_id",
            as: "locationandslider",
          },
        },
        {
          $unwind: {
            path: "$locationandslider",
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $lookup: {
            from: "contactandcategorystages",
            localField: "categoryStage.stage_id",
            foreignField: "stage_id",
            as: "contactandcategory",
          },
        },
        {
          $unwind: {
            path: "$contactandcategory",
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $addFields: {
            locationIds: {
              $cond: [
                { $ifNull: ["$locationandslider.locations_id", false] },
                "$locationandslider.locations_id",
                [],
              ],
            },
            categoryIds: {
              $cond: [
                { $ifNull: ["$contactandcategory.category_ids", false] },
                "$contactandcategory.category_ids",
                [],
              ],
            },
          },
        },
        {
          $unset: [
            "categoryStage",
            "locationStage",
            "locationandslider",
            "contactandcategory",
          ],
        },
        {
          $lookup: {
            from: "locationdetails",
            let: { locationIds: "$locationIds" },
            pipeline: [
              {
                $match: {
                  $and: [
                    { $expr: { $in: ["$_id", "$$locationIds"] } },
                    { is_primary_address: true },
                  ],
                },
              },
              {
                $project: {
                  _id: 0,
                  id: "$_id",
                  title: 1,
                  address_line_1: 1,
                  address_line_2: 1,
                  state: 1,
                  country: 1,
                  zip_code: 1,
                  latitude: 1,
                  longitude: 1,
                  is_primary_address: 1,
                },
              },
            ],
            as: "address",
          },
        },
        {
          $unwind: {
            path: "$address",
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $lookup: {
            from: "categories",
            let: { categoryIds: "$categoryIds" },
            pipeline: [
              {
                $match: {
                  $and: [
                    { $expr: { $in: ["$_id", "$$categoryIds"] } },
                    { is_active: true },
                  ],
                },
              },
              {
                $project: { _id: 0, id: "$_id", title: 1 },
              },
            ],
            as: "category",
          },
        },
        {
          $lookup: {
            from: "usercategories",
            let: { user_id: new mongoose.Types.ObjectId(userId) },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $eq: ["$user_id", "$$user_id"],
                  },
                },
              },
              {
                $project: {
                  _id: 0,
                  category_id: 1,
                },
              },
            ],
            as: "categoryFollowers",
          },
        },
        {
          $addFields: {
            categories: {
              $map: {
                input: "$category",
                in: {
                  id: "$$this.id",
                  title: "$$this.title",
                  is_follow: {
                    $in: [
                      "$$this.id",
                      { $ifNull: ["$categoryFollowers.category_id", []] },
                    ],
                  },
                },
              },
            },
          },
        },
        {
          $unset: [
            "categoryFollowers",
            "locationIds",
            "categoryIds",
            "category",
          ],
        },
        {
          $group: {
            _id: "$advertisements",
            location: { $first: "$address" },
            categoriesDetail: { $first: "$categories" },
          },
        },
        {
          $project: {
            id: "$_id._id",
            title: "$_id.title",
            first_name: "$_id.first_name",
            last_name: "$_id.last_name",
            image_url: "$_id.image_url",
            state: "$address.state",
            country: "$address.country",
            country_code: "$_id.country_code",
            phone_number: "$_id.phone_number",
            is_verified: "$_id.is_verified",
            email: "$_id.email",
            ratings: "$_id.ratings",
            followers_count: "$_id.followers_count",
            favourites_count: "$_id.favourites_count",
            is_follow: "$_id.is_follow",
            is_favourite: "$_id.is_favourite",
            address: "$location",
            categories: "$categoriesDetail",
            createdAt: "$_id.createdAt",
            updatedAt: "$_id.updatedAt",
            _id: 0,
          },
        },
      ]);
    return advertisementDetails;
  } catch (error) {
    throw error;
  }
};

const getOwner = async (advertisementId: any) => {
  try {
    advertisementId = new mongoose.Types.ObjectId(advertisementId);

    var pipeline = [
      {
        $project: {
          _id: 0,
          advertisement: "$$ROOT",
        },
      },
      {
        $lookup: {
          localField: "advertisement.user_id",
          from: "users",
          foreignField: "_id",
          as: "user",
        },
      },
      {
        $unwind: {
          path: "$user",
          preserveNullAndEmptyArrays: false,
        },
      },
      {
        $match: {
          "user.is_notification_enabled": true,
          "advertisement._id": advertisementId,
        },
      },
      {
        $project: {
          "user._id": "$user._id",
          "user.email": "$user.email",
          _id: 0,
        },
      },
    ];

    let owner = await advertisementModel.aggregate(pipeline);

    return owner;
  } catch (error) {
    throw error;
  }
};

const getFollowerList = async (advertisementData: any) => {
  try {
    let { advertisementId, query } = advertisementData;
    let { is_pagination, page_index, page_size } = query;
    let match = [];
    let filter: any = [];
    let skip, limit, paginationObject, projectData;
    advertisementId = new mongoose.Types.ObjectId(advertisementId);

    match.push({
      $match: { advertisement_id: advertisementId },
    });

    if (is_pagination === "true") {
      projectData = await advertisementFavouritesFollowersModel
        .find({ advertisement_id: advertisementId })
        .select('favourites_count')
        .lean();

      let paginationDetails = pagination(
        page_index,
        page_size,
        (projectData as any).favourites_count,
      );

      skip = paginationDetails.skip;
      limit = paginationDetails.limit;

      paginationObject = paginationDetails.paginationObject;

      if (skip) filter.push({ $skip: skip });

      if (limit) filter.push({ $limit: limit });

      let data = await advertisementFavouritesFollowersModel.aggregate([
        ...match,
        ...filter,
        {
          $lookup: {
            from: "users", // The name of the User collection
            localField: "followers",
            foreignField: "_id",
            as: "followers", // Output field that will contain the user documents
          },
        },
        {
          $unwind: {
            path: "$followers",
            preserveNullAndEmptyArrays: false,
          },
        },
        {
          $match: {
            "followers.is_notification_enabled": true,
          },
        },
        {
          $project: {
            user_id: "$followers._id",
            user_email: "$followers.email",
          },
        },
      ]);

      paginationObject.data = data;
      return paginationObject;
    } else {
      let data = await advertisementFavouritesFollowersModel.aggregate([
        ...match,
        ...filter,
        {
          $lookup: {
            from: "users", // The name of the User collection
            localField: "followers",
            foreignField: "_id",
            as: "followers", // Output field that will contain the user documents
          },
        },
        {
          $project: {
            user_id: "$followers._id",
            user_email: "$followers.email",
          },
        },
      ]);
      return data;
    }
  } catch (error) {
    throw error;
  }
};

const getUserAdvertisementIdsByUserId = async (data: any) => {
  try {
    let { userId, type } = data;

    let match = [];

    if (type === "FOLLOWEDADVERTISEMENT") {
      match.push({
        $match: { followers: { $in: [new mongoose.Types.ObjectId(userId)] } },
      });
    } else if (type === "FAVOURITESADVERTISEMENT") {
      match.push({
        $match: { favourites: { $in: [new mongoose.Types.ObjectId(userId)] } },
      });
    } else {
      return [];
    }

    let advertisementIds =
      await advertisementFavouritesFollowersModel.aggregate([
        ...match,
        {
          $lookup: {
            from: "advertisements",
            let: { advertisementId: "$advertisement_id" },
            pipeline: [
              {
                $match: {
                  $and: [
                    {
                      $expr: {
                        $eq: ["$_id", "$$advertisementId"],
                      },
                    },
                    {
                      is_deleted: false,
                      published_id: { $exists: true },
                    },
                  ],
                },
              },
              {
                $project: {
                  _id: 1,
                },
              },
            ],
            as: "advertisements",
          },
        },
        {
          $unwind: "$advertisements",
        },
        {
          $project: {
            advertisement_id: "$advertisements._id",
          },
        },
      ]);
    return advertisementIds.length
      ? advertisementIds.map((o: any) => o.advertisement_id)
      : [];
  } catch (error) {
    throw error;
  }
};

export default {
  getUserAdvertisementIdsByUserId,
  getFollowFaviouriteDetails,
  getOwner,
  getFollowerList,
};
