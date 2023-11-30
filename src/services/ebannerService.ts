import { pagination } from "../utilities/pagination";
import advertisementService from "../services/advertisement/advertisementService";
import * as EBanners from "../model/ebanner";
import mongoose from "mongoose";
import { NotFoundException } from "../exceptions";
const { ebannerModel } = EBanners;

interface EbannerData {
  query: {
    is_pagination: string;
    page_index: number;
    page_size: number;
  };
  userId: string | undefined;
  type: "FOLLOWEDADVERTISEMENT" | "FAVOURITESADVERTISEMENT" | string;
}

class EbannerService {
  async getUserAdvertisementEbannersByType(
    ebannerData: EbannerData
  ): Promise<any> {
    try {
      const { query, userId, type } = ebannerData;
      let { is_pagination, page_index, page_size } = query;

      if (!(type === "FOLLOWEDADVERTISEMENT" || type === "FAVOURITESADVERTISEMENT")) {
        return [];
      }

      //Get Advertisement Id by User ID
      const advertisementIds = await advertisementService.getUserAdvertisementIdsByUserId({
        userId,
        type,
      });

      let fetchquery = { advertisement_id: { $in: advertisementIds }, is_live: true };
      const match: any[] = [{ $match: fetchquery }];

      if (is_pagination === "true") {
        let dataCount = await ebannerModel.find(fetchquery).count().lean();

        let { skip, limit, paginationObject } = pagination(
          page_index,
          page_size,
          dataCount
        );

        match.push({ $skip: skip }, { $limit: limit });

        paginationObject.data = await this.getEbannerDetailsByMatch({
          match,
          userId: userId ? userId : undefined,
        });

        return paginationObject;
      } else {
        return await this.getEbannerDetailsByMatch({
          match,
          userId: userId ? userId : undefined,
        });
      }
    } catch (error) {
      throw error;
    }
  }

  async getAdvertisementId(ebannerId: string)
    : Promise<mongoose.Types.ObjectId | null> {
    try {
      let ebanner = await ebannerModel
        .findOne({ _id: ebannerId });

      if (!ebanner) throw new NotFoundException(ebannerId, "EBANNER_ID");
      return ebanner ? ebanner.advertisement_id : null;
    } catch (error) { throw error; }
  }

  private async getEbannerDetailsByMatch(matchData: {
    match: any[];
    userId: string | undefined;
  }): Promise<any[]> {
    let { match, userId } = matchData;
    try {

      return await ebannerModel.aggregate([
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
        { $lookup: { from: "ebannerlikedetails", localField: "_id", foreignField: "ebanner_id", as: "ebannerlikedetails" } },
        { $unwind: { path: "$ebannerlikedetails", preserveNullAndEmptyArrays: true } },
        { $project: { _id: 0, ebanner_id: "$_id", title: "$title", description: "$description", is_live: "$is_live", reference_image_id: "$reference_image_id", reference_video_id: "$reference_video_id", user_id: "$user_id", advertisement_id: "$advertisement_id", advertisement_title: "$advertisements.title", advertisement_image_url: "$image.url", advertisement_ratings: "$advertisements.ratings", advertisement_state: "$address.state", advertisement_country: "$address.country", categories: "$categoryDetails", like_counts: { $ifNull: ["$ebannerlikedetails.like_counts", 0] }, is_like: { $in: [new mongoose.Types.ObjectId(userId), { $ifNull: ["$ebannerlikedetails.likes_list", []] }] } } }
      ])
    } catch (error) {
      throw error;
    }
  }
}

export default new EbannerService();
