import advertisementService from "./advertisementService";
import { pagination } from "../../utilities/pagination";
import mongoose, { Types } from "mongoose";
import * as AdvertisementSchema from "../../model/advertisement";
import { BadRequestException, NotFoundException, NotAcceptedException } from "../../exceptions";
import { AdvertisementData } from "./IAdvertisementData";

const { advertisementFavouritesFollowersModel } = AdvertisementSchema;

class FollowFavouriteService {
  //FOLLOW-UNFOLLOW
  async followUnfollowAdvertisement(advertisementData: {
    query: { is_follow?: boolean }; //FEEDBACK changing is_follow as boolean
    userId: Types.ObjectId;
    advertisement_id: Types.ObjectId;
  }) {
    try {
      const { query, userId, advertisement_id } = advertisementData;
      let { is_follow } = query;
      is_follow = typeof is_follow === 'boolean' ? is_follow : true;
      let followerDetail: any;

      await advertisementService.validateAdvertisement(advertisement_id, userId);

      let existingFollowAdvertisement: any =
        await advertisementFavouritesFollowersModel
          .findOne({ advertisement_id })
          .lean();
      let alreadyFollowedUserIds: string[] = [];

      if (existingFollowAdvertisement) {
        alreadyFollowedUserIds = existingFollowAdvertisement.followers.map(
          (follower: any) => follower.toString()
        );
      }

      //Follow
      if (is_follow) {
        // ADD the new Advertisement Follow Count
        if (!existingFollowAdvertisement) {
          let advertisementFollow = new advertisementFavouritesFollowersModel({
            advertisement_id: advertisement_id,
            followers: [userId],
            followers_count: 1,
          });
          followerDetail = await advertisementFollow.save();
        }
        // UPDATE the existing Advertisement Follow  Count
        else {
          if (alreadyFollowedUserIds.includes(userId.toString())) throw new NotAcceptedException("ALREADY_ADVERTISEMENT_FOLLOW");

          followerDetail =
            await advertisementFavouritesFollowersModel.findByIdAndUpdate(
              { _id: existingFollowAdvertisement._id },
              {
                $addToSet: { followers: userId },
                followers_count:
                  existingFollowAdvertisement.followers_count + 1,
              },
              { new: true }
            );
        }
      }
      //UnFollow is_follow === "false"
      else if (is_follow) {
        if (!alreadyFollowedUserIds.includes(userId.toString())) throw new NotFoundException(userId.toString(), "User ID");

        followerDetail = await advertisementFavouritesFollowersModel.findOneAndUpdate(
          {
            _id: existingFollowAdvertisement._id,
          },
          {
            $pull: { followers: userId },
            followers_count:
              existingFollowAdvertisement?.followers_count === 0
                ? 0
                : existingFollowAdvertisement.followers_count - 1,
          },
          { new: true }
        );
      } else throw new BadRequestException("Invalid value for is_follow parameter");


      return {
        message:
          is_follow
            ? "UPDATING_ADVERTISEMENT_FOLLOWING"
            : "UPDATING_ADVERTISEMENT_UNFOLLOWING",
        body: {
          followers_count: followerDetail.followers_count,
          is_follow: is_follow,
        },
      };
    } catch (error: any) {
      throw error;
    }
  }

  async setFavouritesAdvertisementById(advertisementData: {
    query: { is_favourite?: string };
    userId: Types.ObjectId;
    advertisement_id: Types.ObjectId;
  }) {
    try {
      const { query, userId, advertisement_id } = advertisementData;
      let { is_favourite } = query;
      is_favourite = is_favourite ? is_favourite : "true";
      let favouritesDetail: any;

      await advertisementService.validateAdvertisement(advertisement_id, userId);

      let existingFavouriteAdvertisement: any =
        await advertisementFavouritesFollowersModel
          .findOne({ advertisement_id })
          .lean();
      let alreadyFavouriteUserIds: string[] = [];

      if (existingFavouriteAdvertisement) {
        alreadyFavouriteUserIds = existingFavouriteAdvertisement.favourites.map(
          (favourite: any) => favourite.toString()
        );
      }
      //FAVOURITE
      if (is_favourite === "true") {
        // ADD the new Advertisement Favourite Count
        if (!existingFavouriteAdvertisement) {
          let advertisementFavourite =
            new advertisementFavouritesFollowersModel({
              advertisement_id: advertisement_id,
              favourites: [userId],
              favourites_count: 1,
            });
          favouritesDetail = await advertisementFavourite.save();
        }
        // UPDATING the Existing Advertisement Favourite Count
        else {
          if (alreadyFavouriteUserIds.includes(userId.toString())) throw new NotAcceptedException("ADVERTISEMENT_ALREADY_FAVOURITE");

          favouritesDetail = await advertisementFavouritesFollowersModel.findByIdAndUpdate(
            { _id: existingFavouriteAdvertisement._id },
            {
              $addToSet: { favourites: userId },
              favourites_count: existingFavouriteAdvertisement.favourites_count + 1,
            },
            { new: true }
          );
        }
      }
      //UN-FAVOURITE
      else if (is_favourite === "false") {
        if (!alreadyFavouriteUserIds.includes(userId.toString())) throw new NotAcceptedException("ADVERTISEMENT_ALREADY_REMOVED_FAVOURITE");

        favouritesDetail = await advertisementFavouritesFollowersModel.findOneAndUpdate(
          {
            _id: existingFavouriteAdvertisement._id,
          },
          {
            $pull: { favourites: userId },
            favourites_count:
              existingFavouriteAdvertisement.favourites_count === 0
                ? 0
                : existingFavouriteAdvertisement.favourites_count - 1,
          },
          {
            new: true,
          }
        );
      } else throw new BadRequestException("Invalid value for is_favourite parameter");

      return {
        message: is_favourite === "true" ? "ADVERTISEMENT_ADD_FAVOURITE" : "ADVERTISEMENT_REMOVED_FAVOURITE",
        body: {
          favourites_count: favouritesDetail.favourites_count,
          is_favourites: is_favourite === "true",
        }
      };
    } catch (error) {
      throw error;
    }
  }

  async getAdvertisementFollowFavoriteList(advertisementData: {
    userId: Types.ObjectId;
    query: { is_pagination: string; page_index: number; page_size: number };
    type: "favourite_list" | "follow_list";
  }) {
    try {
      const { userId, query, type } = advertisementData;
      const { is_pagination, page_index, page_size } = query;

      let match: any = [];
      let filter: any = [];
      let skip: number | undefined, limit: number | undefined, paginationObject: any, dataCount: number | undefined;

      if (type === "favourite_list" || type === "follow_list") {
        const matchCondition = type === "favourite_list" ?
          { favourites: { $in: [new mongoose.Types.ObjectId(userId)] } } :
          { followers: { $in: [new mongoose.Types.ObjectId(userId)] } };

        match.push({ $match: matchCondition });

        if (is_pagination === "true") {
          dataCount = await advertisementFavouritesFollowersModel
            .find(matchCondition)
            .count();

          const paginationDetails: any = pagination(page_index, page_size, dataCount);

          skip = paginationDetails.skip;
          limit = paginationDetails.limit;
          paginationObject = paginationDetails.paginationObject;

          if (skip) filter.push({ $skip: skip });
          if (limit) filter.push({ $limit: limit });
        }
      }

      const data = await this.getFollowFavouriteDetails({
        match,
        filter,
        userId,
      });

      return is_pagination === "true" ? { ...paginationObject, data } : data;
    } catch (error) {
      throw error;
    }
  }

  async getFollowFavouriteDetails(advertisementData: AdvertisementData) {
    try {
      const { match = [], filter = [], userId } = advertisementData;

      const advertisementDetails = await advertisementFavouritesFollowersModel.aggregate([
        ...match,
        { $project: { advertisement_id: 1 } },
        { $lookup: { from: "advertisements", let: { advertisementId: "$advertisement_id" }, pipeline: [{ $match: { $expr: { $eq: ["$_id", "$$advertisementId"], }, is_deleted: false, }, },], as: "advertisements", }, },
        { $unwind: "$advertisements" },
        ...filter,
        { $lookup: { from: "common.attachments", localField: "advertisements.image_id", foreignField: "_id", as: "image", }, },
        { $unwind: { path: "$image", preserveNullAndEmptyArrays: true } },
        { $lookup: { from: "advertisementfavouritesfollowers", localField: "advertisements._id", foreignField: "advertisement_id", as: "advertisementMetaData", }, },
        { $unwind: { path: "$advertisementMetaData", preserveNullAndEmptyArrays: true } },
        {
          $addFields: {
            "advertisements.image_url": { $ifNull: ["$image.url", null] },
            "advertisements.followers_count": { $ifNull: ["$advertisementMetaData.followers_count", 0] },
            "advertisements.favourites_count": { $ifNull: ["$advertisementMetaData.favourites_count", 0] },
            "advertisements.is_follow": { $in: [new mongoose.Types.ObjectId(userId), { $ifNull: ["$advertisementMetaData.followers", []] }] },
            "advertisements.is_favourite": { $in: [new mongoose.Types.ObjectId(userId), { $ifNull: ["$advertisementMetaData.favourites", []] }] },
          },
        },
        { $unset: ["image", "advertisementMetaData"] },
        { $lookup: { from: "publishdetails", localField: "advertisements.published_id", foreignField: "_id", as: "publishdetails", }, },
        { $unwind: { path: "$publishdetails", preserveNullAndEmptyArrays: true } },
        {
          $addFields: {
            categoryStage: {
              $filter: {
                input: "$publishdetails.stages",
                as: "item",
                cond: { $eq: ["$$item.stage", "CONTACT_CATEGORIES"] },
              },
            },
            locationStage: {
              $filter: {
                input: "$publishdetails.stages",
                as: "item",
                cond: { $eq: ["$$item.stage", "LOCATION_SLIDER"] },
              },
            },
          },
        },
        { $unwind: { path: "$locationStage", preserveNullAndEmptyArrays: true } },
        { $unwind: { path: "$categoryStage", preserveNullAndEmptyArrays: true } },
        { $unset: "publishdetails" },
        { $lookup: { from: "locationandsliderstages", localField: "locationStage.stage_id", foreignField: "stage_id", as: "locationandslider", }, },
        { $unwind: { path: "$locationandslider", preserveNullAndEmptyArrays: true } },
        { $lookup: { from: "contactandcategorystages", localField: "categoryStage.stage_id", foreignField: "stage_id", as: "contactandcategory", }, },
        { $unwind: { path: "$contactandcategory", preserveNullAndEmptyArrays: true } },
        { $addFields: { locationIds: { $ifNull: ["$locationandslider.locations_id", []] }, categoryIds: { $ifNull: ["$contactandcategory.category_ids", []] }, }, },
        { $unset: ["categoryStage", "locationStage", "locationandslider", "contactandcategory"] },
        { $lookup: { from: "locationdetails", let: { locationIds: "$locationIds" }, pipeline: [{ $match: { $and: [{ $expr: { $in: ["$_id", "$$locationIds"] } }, { is_primary_address: true },], }, }, { $project: { _id: 0, id: "$_id", title: 1, address_line_1: 1, address_line_2: 1, state: 1, country: 1, zip_code: 1, latitude: 1, longitude: 1, is_primary_address: 1, }, },], as: "address", }, },
        { $unwind: { path: "$address", preserveNullAndEmptyArrays: true } },
        { $lookup: { from: "categories", let: { categoryIds: "$categoryIds" }, pipeline: [{ $match: { $and: [{ $expr: { $in: ["$_id", "$$categoryIds"] } }, { is_active: true },], }, }, { $project: { _id: 0, id: "$_id", title: 1 } },], as: "category", }, },
        { $lookup: { from: "usercategories", let: { user_id: new mongoose.Types.ObjectId(userId) }, pipeline: [{ $match: { $expr: { $eq: ["$user_id", "$$user_id"], }, }}, { $project: { _id: 0, category_id: 1, }, },], as: "categoryFollowers", }, },
        { $addFields: { categories: { $map: { input: "$category", in: { id: "$$this.id", title: "$$this.title", is_follow: { $in: ["$$this.id", { $ifNull: ["$categoryFollowers.category_id", []] }], }, }, }, }, }, },
        { $unset: ["categoryFollowers", "locationIds", "categoryIds", "category"] },
        { $group: { _id: "$advertisements", location: { $first: "$address" }, categoriesDetail: { $first: "$categories" }, }, },
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
  }
}



export default new FollowFavouriteService();
