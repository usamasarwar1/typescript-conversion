import { pagination } from "../utilities/pagination";
import advertisementService from "../services/advertisement/advertisementService";
import * as Promotions from "../model/promotion";
const { promotionModel } = Promotions;
import mongoose from "mongoose";

const getUserAdvertisementPromotionsByType = async (PromotionData: {
  query: { is_pagination: any; page_index: any; page_size: any };
  userId: any;
  type: string;
}) => {
  try {
    const { query, userId, type } = PromotionData;

    let { is_pagination, page_index, page_size } = query;

    let match = [];
    let advertisementIds: string[] = [];

    if (type === "FOLLOWEDADVERTISEMENT") {
      advertisementIds =
        await advertisementService.getUserAdvertisementIdsByUserId({
          userId,
          type,
        });
    } else if (type === "FAVOURITESADVERTISEMENT") {
      advertisementIds =
        await advertisementService.getUserAdvertisementIdsByUserId({
          userId,
          type,
        });
    } else return [];

    match.push({ $match: { advertisement_id: { $in: advertisementIds } } });

    if (is_pagination === "true") {
      let dataCount = await promotionModel
        .find({ advertisement_id: advertisementIds })
        .count()
        .lean();

      let { skip, limit, paginationObject } = pagination(
        page_index,
        page_size,
        dataCount,
      );

      match.push({ $skip: skip }, { $limit: limit });

      paginationObject.data = await getPromotionDetailsByMatch({
        match,
        userId: userId ? userId : undefined,
      });

      return paginationObject;
    } else {
      return await getPromotionDetailsByMatch({
        match,
        userId: userId ? userId : undefined,
      });
    }
  } catch (error) {
    throw error;
  }
};

const getAdvertisementId = async (promotionId: any) => {
  try {
    promotionId = new mongoose.Types.ObjectId(promotionId);

    let projectData = await promotionModel
      .find({ _id: promotionId })
      .select('advertisement_id')
      .lean();

    if (projectData) {
      return (projectData as any).advertisement_id;
    }

    return null;
  } catch (error) {}
};

export default {
  getUserAdvertisementPromotionsByType,
  getAdvertisementId,
};

async function getPromotionDetailsByMatch(matchData: {
  match: any[];
  userId: string;
}) {
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
                title: 1,
                image_id: 1,
                ratings: 1,
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
          from: "locationdetails",
          let: { advertisementId: "$advertisement_id" },
          pipeline: [
            {
              $match: {
                $and: [
                  {
                    $expr: { $eq: ["$advertisement_id", "$$advertisementId"] },
                  },
                  { data_for: "PUBLISH" },
                  { is_primary_address: true },
                ],
              },
            },
            {
              $project: {
                state: 1,
                country: 1,
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
          let: { categoryIds: "$category_ids" },
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
          as: "categoryDetails",
        },
      },
      {
        $lookup: {
          from: "promotiondatas",
          let: { promotionDataIds: "$promotion_data_ids" },
          pipeline: [
            {
              $match: {
                $expr: { $in: ["$_id", "$$promotionDataIds"] },
              },
            },
            {
              $project: {
                _id: 0,
                id: "$_id",
                type: 1,
                content_text: "$content.text",
                content_background_url: "$content.background_url",
                content_background_thumbnail_url:
                  "$content.background_thumbnail_url",
                image_url: "$images.image_url",
                image_thumbnail_url: "$images.image_thumbnail_url",
              },
            },
          ],
          as: "promotionData",
        },
      },
      {
        $lookup: {
          from: "promotionlikedetails",
          localField: "_id",
          foreignField: "promotion_id",
          as: "promotionlikedetails",
        },
      },
      {
        $unwind: {
          path: "$promotionlikedetails",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $project: {
          _id: 0,
          promotion_id: "$_id",
          title: "$title",
          by: "$by",
          status: "$status",
          start_date: "$start_date",
          end_date: "$end_date",
          start_time: "$start_time",
          end_time: "$end_time",
          is_repeat_every: "$is_repeat_every",
          user_id: "$user_id",
          advertisement_id: "$advertisement_id",
          advertisement_title: "$advertisements.title",
          advertisement_image_url: "$image.url",
          advertisement_ratings: "$advertisements.ratings",
          advertisement_state: "$address.state",
          advertisement_country: "$address.country",
          categories: "$categoryDetails",
          data: "$promotionData",
          like_counts: { $ifNull: ["$promotionlikedetails.like_counts", 0] },
          is_like: {
            $in: [
              new mongoose.Types.ObjectId(userId),
              { $ifNull: ["$promotionlikedetails.likes_list", []] },
            ],
          },
        },
      },
    ]);
  } catch (error) {
    throw error;
  }
}
