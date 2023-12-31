import { errors } from "../../utilities/error";
import advertisementService from "./advertisementService";
import { pagination } from "../../utilities/pagination";
import mongoose, { Types } from "mongoose";
import * as AdvertisementSchema from "../../model/advertisement";

const { advertisementModel, advertisementFavouritesFollowersModel } =
  AdvertisementSchema;

class AdvertisementService {
  async validateAdvertisement(
    advertisement_id: Types.ObjectId,
    userId: Types.ObjectId
  ) {
    let advertisement = await advertisementModel.findOne(
      {
        _id: advertisement_id,
        is_deleted: false,
        published_id: { $exists: true },
      },
      { user_id: 1 }
    );

    if (!advertisement) {
      throw JSON.stringify({
        status: errors.Not_Found,
        messages: ["ADVERTISEMENT_ID_NOT_VALID"],
      });
    }

    if (advertisement["user_id"].toString() === userId.toString()) {
      throw JSON.stringify({
        status: errors.Not_Acceptable,
        messages: ["SELF_ADVERTISEMENT_CANT_BE_FOLLOW"],
      });
    }
  }

  async followUnfollowAdvertisement(advertisementData: {
    query: { is_follow?: string };
    userId: Types.ObjectId;
    advertisement_id: Types.ObjectId;
  }) {
    try {
      const { query, userId, advertisement_id } = advertisementData;
      let { is_follow } = query;
      is_follow = is_follow ? is_follow : "true";
      let followerDetail: any;

      await this.validateAdvertisement(advertisement_id, userId);

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

      if (is_follow === "true") {
        if (!existingFollowAdvertisement) {
          let advertisementFollow = new advertisementFavouritesFollowersModel({
            advertisement_id: advertisement_id,
            followers: [userId],
            followers_count: 1,
          });
          followerDetail = await advertisementFollow.save();
        } else {
          if (alreadyFollowedUserIds.includes(userId.toString())) {
            throw {
              status: 406, // Not Acceptable
              messages: ["ALREADY_ADVERTISEMENT_FOLLOW"],
            };
          }
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
      } else if (is_follow === "false") {
        if (!alreadyFollowedUserIds.includes(userId.toString())) {
          throw {
            status: 404, // Not Found
            messages: ["ALREADY_ADVERTISEMENT_UNFOLLOW"],
          };
        }
        followerDetail =
          await advertisementFavouritesFollowersModel.findOneAndUpdate(
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
      } else {
        throw {
          status: 400, // Bad Request
          messages: ["Invalid value for is_follow parameter"],
        };
      }

      return {
        message:
          is_follow === "true"
            ? ["UPDATING_ADVERTISEMENT_FOLLOWING"]
            : ["UPDATING_ADVERTISEMENT_UNFOLLOWING"],
        body: {
          followers_count: followerDetail.followers_count,
          is_follow: is_follow === "true",
        },
      };
    } catch (error) {
      throw error; // Rethrow the error to be handled by the calling function
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

      await this.validateAdvertisement(advertisement_id, userId);

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

      if (is_favourite === "true") {
        if (!existingFavouriteAdvertisement) {
          let advertisementFavourite =
            new advertisementFavouritesFollowersModel({
              advertisement_id: advertisement_id,
              favourites: [userId],
              favourites_count: 1,
            });
          favouritesDetail = await advertisementFavourite.save();
        } else {
          if (alreadyFavouriteUserIds.includes(userId.toString())) {
            throw JSON.stringify({
              status: errors.Not_Acceptable.code,
              messages: ["ADVERTISEMENT_ALREADY_FAVOURITE"],
            });
          }
          favouritesDetail =
            await advertisementFavouritesFollowersModel.findByIdAndUpdate(
              { _id: existingFavouriteAdvertisement._id },
              {
                $addToSet: { favourites: userId },
                favourites_count:
                  existingFavouriteAdvertisement.favourites_count + 1,
              },
              { new: true }
            );
        }
      } else if (is_favourite === "false") {
        if (!alreadyFavouriteUserIds.includes(userId.toString())) {
          throw JSON.stringify({
            status: errors.Not_Found.code,
            messages: ["ADVERTISEMENT_ALREADY_REMOVED_FAVOURITE"],
          });
        }
        favouritesDetail =
          await advertisementFavouritesFollowersModel.findOneAndUpdate(
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
      } else {
        throw JSON.stringify({
          status: errors.Bad_Request.code,
          messages: errors.Bad_Request.message,
        });
      }

      return {
        message:
          is_favourite === "true"
            ? ["ADVERTISEMENT_ADD_FAVOURITE"]
            : ["ADVERTISEMENT_REMOVED_FAVOURITE"],
        body: {
          favourites_count: favouritesDetail.favourites_count,
          is_favourites: is_favourite === "true",
        },
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
      let { userId, query, type } = advertisementData;
      let { is_pagination, page_index, page_size } = query;

      let match: any = [],
        filter: any = [];
      let skip, limit, paginationObject, dataCount: any;

      if (type === "favourite_list") {
        match.push({
          $match: {
            favourites: { $in: [new mongoose.Types.ObjectId(userId)] },
          },
        });
      } else if (type === "follow_list") {
        match.push({
          $match: { followers: { $in: [new mongoose.Types.ObjectId(userId)] } },
        });
      }
      if (is_pagination === "true") {
        if (type === "favourite_list") {
          dataCount = await advertisementFavouritesFollowersModel
            .find({
              favourites: { $in: [new mongoose.Types.ObjectId(userId)] },
            })
            .count();
        } else if (type === "follow_list") {
          dataCount = await advertisementFavouritesFollowersModel
            .find({ followers: { $in: [new mongoose.Types.ObjectId(userId)] } })
            .count();
        }
        let paginationDetails: any = pagination(
          page_index,
          page_size,
          dataCount
        );

        skip = paginationDetails.skip;
        limit = paginationDetails.limit;

        paginationObject = paginationDetails.paginationObject;

        if (skip) filter.push({ $skip: skip });

        if (limit) filter.push({ $limit: limit });
      }

      const data = await advertisementService.getFollowFavouriteDetails({
        match,
        filter,
        userId,
      });

      if (is_pagination === "true") {
        paginationObject.data = data;
        return paginationObject;
      }
      return data;
    } catch (error) {
      throw error;
    }
  }
}

export default new AdvertisementService();
