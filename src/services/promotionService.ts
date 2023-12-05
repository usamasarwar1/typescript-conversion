import { pagination } from "../utilities/pagination";
import AdvertisementService from "../services/advertisement/advertisementService";
import * as Promotions from "../model/promotion";
import mongoose from "mongoose";
import { NotFoundException } from "../exceptions";

const { promotionModel } = Promotions;

interface PromotionData {
  query: {
    is_pagination: boolean;
    page_index: number | any;
    page_size: number | any;
    status: string | any;
  };
  userId: any;
  type: string;
}

class PromotionService {

  async getUserAdvertisementPromotionsByType(
    promotionData: PromotionData
  ): Promise<any> {
    try {
      console.log("in here");
      const { query, userId, type } = promotionData;
      let { is_pagination, page_index, page_size, status } = query;
      is_pagination = typeof is_pagination === 'boolean' ? is_pagination : is_pagination === 'true' ? true : is_pagination === 'false' ? false : true;


      if (!(type === "FOLLOWEDADVERTISEMENT" || type === "FAVOURITESADVERTISEMENT")) {
        return [];
      }
      //Get Advertisement Id by User ID
      const advertisementIds = await AdvertisementService.getUserAdvertisementIdsByUserId({
        userId,
        type,
      });

      const getStatusQuery = (status: string | undefined) => {
        const baseQuery: { [key: string]: any } = { advertisement_id: { $in: advertisementIds } };
        if (status) {
          baseQuery['status'] = status.toUpperCase();
        } else {
          baseQuery['status'] = { $exists: true };
        }
        return baseQuery;
      };

      const match: any[] = [{ $match: getStatusQuery(status) }];

      if (is_pagination) {
        const dataCount = await promotionModel.find(getStatusQuery(status)).count().lean();

        const { skip, limit, paginationObject } = pagination(page_index, page_size, dataCount);

        match.push({ $skip: skip } as any, { $limit: limit } as any);

        paginationObject.data = await this.getPromotionDetailsByMatch({
          match,
          userId: userId || undefined,
        });

        return paginationObject;
      } else {
        return await this.getPromotionDetailsByMatch({
          match,
          userId: userId || undefined,
        });
      }


    } catch (error) {
      throw error;
    }
  }

  async getAdvertisementId(promotionId: mongoose.Types.ObjectId)
    : Promise<mongoose.Types.ObjectId | null> {
    try {
      let promotion = await promotionModel
        .findOne({ _id: promotionId });

      if (!promotion) throw new NotFoundException(promotionId.toString(), "PROMOTION_ID");
      return promotion ? promotion.advertisement_id : null;
    } catch (error) { throw error; }
  }

  async getPromotionDetailsByMatch(matchData: {
    match: any[];
    userId: string;
  }): Promise<any> {
    let { match, userId } = matchData;
    try {
      return await promotionModel.aggregate([
        ...match,
        {
          $lookup: {
            from: "advertisements",
            let: { advertisementId: "$advertisement_id" },
            pipeline: [
              {
                $match: { $and: [{ $expr: { $eq: ["$_id", "$$advertisementId"] } }, { is_deleted: false, published_id: { $exists: true } }] }
              },
              { $project: { title: 1, image_id: 1, ratings: 1 } }
            ],
            as: "advertisements"
          }
        },
        { $unwind: "$advertisements" },
        { $lookup: { from: "common.attachments", localField: "advertisements.image_id", foreignField: "_id", as: "image" } },
        { $unwind: { path: "$image", preserveNullAndEmptyArrays: true } },
        { $lookup: { from: "locationdetails", let: { advertisementId: "$advertisement_id" }, pipeline: [{ $match: { $and: [{ $expr: { $eq: ["$advertisement_id", "$$advertisementId"] } }, { data_for: "PUBLISH" }, { is_primary_address: true }] } }, { $project: { state: 1, country: 1 } }], as: "address" } },
        { $unwind: { path: "$address", preserveNullAndEmptyArrays: true } },
        { $lookup: { from: "categories", let: { categoryIds: "$category_ids" }, pipeline: [{ $match: { $expr: { $in: ["$_id", "$$categoryIds"] }, is_active: true } }, { $project: { _id: 0, id: "$_id", title: 1 } }], as: "categoryDetails" } },
        { $lookup: { from: "promotiondatas", let: { promotionDataIds: "$promotion_data_ids" }, pipeline: [{ $match: { $expr: { $in: ["$_id", "$$promotionDataIds"] } } }, { $project: { _id: 0, id: "$_id", type: 1, content_text: "$content.text", content_background_url: "$content.background_url", content_background_thumbnail_url: "$content.background_thumbnail_url", image_url: "$images.image_url", image_thumbnail_url: "$images.image_thumbnail_url" } }], as: "promotionData" } },
        { $lookup: { from: "promotionlikedetails", localField: "_id", foreignField: "promotion_id", as: "promotionlikedetails" } },
        { $unwind: { path: "$promotionlikedetails", preserveNullAndEmptyArrays: true } },
        { $project: { _id: 0, promotion_id: "$_id", title: "$title", by: "$by", status: "$status", start_date: "$start_date", end_date: "$end_date", start_time: "$start_time", end_time: "$end_time", is_repeat_every: "$is_repeat_every", user_id: "$user_id", advertisement_id: "$advertisement_id", advertisement_title: "$advertisements.title", advertisement_image_url: "$image.url", advertisement_ratings: "$advertisements.ratings", advertisement_state: "$address.state", advertisement_country: "$address.country", categories: "$categoryDetails", data: "$promotionData", like_counts: { $ifNull: ["$promotionlikedetails.like_counts", 0] }, is_like: { $in: [new mongoose.Types.ObjectId(userId), { $ifNull: ["$promotionlikedetails.likes_list", []] }] } } }
      ]
      );
    } catch (error) {
      throw error;
    }
  }
}
export default new PromotionService();
