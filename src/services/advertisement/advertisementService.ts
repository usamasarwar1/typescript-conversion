import mongoose from "mongoose";
import * as AdvertisementSchema from "../../model/advertisement";
const { advertisementModel, advertisementFavouritesFollowersModel } =
  AdvertisementSchema;
import { pagination } from "../../utilities/pagination";
import { NotFoundException, NotAcceptedException } from "../../exceptions";
import { AdvertisementIdQuery, UserAdvertisementData, AdvertisementIdOwner } from "./IAdvertisementData";
import { logger } from "../../logger/logger";

class AdvertisementService {
  //FEEDBACK - remove this if unused
  // we are using 
  private advertisementModel: any;
  private advertisementFavouritesFollowersModel: any;

  constructor() {
    const { advertisementModel, advertisementFavouritesFollowersModel } =
      AdvertisementSchema;
    this.advertisementModel = advertisementModel;
    this.advertisementFavouritesFollowersModel =
      advertisementFavouritesFollowersModel;
  }

  // Method to get valid Advertisement
  async getValidAdvertisement(
    advertisement_id: string
  ): Promise<mongoose.Types.ObjectId | null> {
    try {
      let advertisement = await advertisementModel.findOne(
        {
          _id: advertisement_id,
          is_deleted: false,
          published_id: { $exists: true },
        }
      );

      if (!advertisement) throw new NotFoundException(advertisement_id.toString(), "ADVERTISEMENT_ID");

      return advertisement ? advertisement._id : null;
    } catch (error) {
      throw error;
    }
  }

  // Method to validate Advertisement
  async validateAdvertisement(
    advertisement_id: mongoose.Types.ObjectId,
    userId: mongoose.Types.ObjectId
  ) {
    let advertisement = await advertisementModel.findOne(
      {
        _id: advertisement_id,
        is_deleted: false,
        published_id: { $exists: true },
      },
      { user_id: 1 }
    );

    if (!advertisement) throw new NotFoundException(advertisement_id.toString(), "ADVERTISEMENT_ID");

    if (advertisement["user_id"].toString() === userId.toString())
      throw new NotAcceptedException("SELF_ADVERTISEMENT_CANT_BE_FOLLOW");

  }

  //FEEDBACK the parameter forNotification should come from the request and need to passed to this
  async getOwner(advertisementData:AdvertisementIdOwner) {
    try {
      const { advertisementId, query } = advertisementData;
      const { notificationEnabled } = query||{ notificationEnabled: false };
      let owner = await advertisementModel.aggregate([
        { $project: { _id: 0, advertisement: "$$ROOT" } },
        { $lookup: { localField: "advertisement.user_id", from: "users", foreignField: "_id", as: "user" } },
        { $unwind: { path: "$user", preserveNullAndEmptyArrays: false } },
        {
          $match: {
            $and: [
              { "advertisement._id": advertisementId },
              { $expr: notificationEnabled ? { $eq: ["$user.is_notification_enabled", true] } : {} }
            ]
          }
        },
        { $project: { user_id: "$user._id", user_email: "$user.email", _id: 0 } }
      ]);
      return owner;
    } catch (error) {
      throw error;
    }
  }

  //FEEDBACK the parameter forNotification should come from the request and need to passed to this
  async getFollowerList(advertisementData: AdvertisementIdQuery) {
    try {
      const { advertisementId, query } = advertisementData;
      const { is_pagination, page_index, page_size, notificationEnabled } = query;
      const match: any[] = [{ $match: { advertisement_id: advertisementId } }];
      const filter: any[] = [];
      let paginationObject: any;  
      if (is_pagination === 'true') {
        const dataCountResult = await advertisementFavouritesFollowersModel.aggregate([
          ...match,
          { $lookup: { from: 'users', localField: 'followers', foreignField: '_id', as: 'followersDetails' } },
          { $unwind: '$followersDetails' },
          { $match: { 'followersDetails.is_notification_enabled': true }},
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
      
      const data = await advertisementFavouritesFollowersModel.aggregate([
        ...match,
        { $lookup: { from: 'users', localField: 'followers', foreignField: '_id', as: 'followersDetails' } },
        { $unwind: '$followersDetails' },
        { $match: { 'followersDetails.is_notification_enabled': true }},
        ...filter,
        { $project: { user_id: '$followersDetails._id', user_email: '$followersDetails.email', _id: 0 } }
      ]);

      if (is_pagination === 'true') {
        paginationObject.data = data;
        return paginationObject;
      }
      return data;

    } catch (error) {
      console.log(error)
      throw error;
    }
  }
  //GET Advertisement IDS by User ID
  async getUserAdvertisementIdsByUserId(data: UserAdvertisementData) {
    try {
      const { userId, type } = data;
      const match: any[] = [];
      const field = type === "FOLLOWEDADVERTISEMENT" ? "followers" : "favourites";

      if (!(type === "FOLLOWEDADVERTISEMENT" || type === "FAVOURITESADVERTISEMENT")) {
        return [];
      }

      match.push({ $match: { [field]: { $in: [new mongoose.Types.ObjectId(userId)] } } });

      const advertisementIds = await advertisementFavouritesFollowersModel.aggregate([
        ...match,
        {
          $lookup: {
            from: "advertisements",
            let: { advertisementId: "$advertisement_id" },
            pipeline: [
              {
                $match: {
                  $and: [
                    { $expr: { $eq: ["$_id", "$$advertisementId"] } },
                    { is_deleted: false, published_id: { $exists: true } },
                  ],
                },
              },
              { $project: { _id: 1 } },
            ],
            as: "advertisements",
          },
        },
        { $unwind: "$advertisements" },
        { $project: { advertisement_id: "$advertisements._id" } },
      ]);

      return advertisementIds.map((o: any) => o.advertisement_id) || [];
    } catch (error) {
      throw error;
    }
  }
}

export default new AdvertisementService();
