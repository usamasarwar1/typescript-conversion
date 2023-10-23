import { pagination } from "../utilities/pagination";
import advertisementService from "../services/advertisement/advertisementService";
import * as EBanners from "../model/ebanner";
const { ebannerModel } = EBanners;

const getUserAdvertisementEbannersByType = async (ebannerData: {
  query: {
    is_pagination: string;
    page_index: number;
    page_size: number;
  };
  userId: string | undefined;
  type: "FOLLOWEDADVERTISEMENT" | "FAVOURITESADVERTISEMENT" | string;
}): Promise<any> => {
  try {
    const { query, userId, type } = ebannerData;
    let { is_pagination, page_index, page_size } = query;
    let match: any[] = [];
    let advertisementIds: string[] = [];

    if (
      type === "FOLLOWEDADVERTISEMENT" ||
      type === "FAVOURITESADVERTISEMENT"
    ) {
      // Use appropriate logic to fetch advertisement IDs based on the type.
      advertisementIds =
        await advertisementService.getUserAdvertisementIdsByUserId({
          userId,
          type,
        });
    }

    match.push({
      $match: { advertisement_id: { $in: advertisementIds }, is_live: true },
    });

    if (is_pagination === "true") {
      // Replace this logic with your actual data count logic.
      let dataCount = 0; // Replace with your data count logic.

      let { skip, limit, paginationObject } = pagination(
        page_index,
        page_size,
        dataCount,
      );

      match.push({ $skip: skip }, { $limit: limit });

      paginationObject.data = await getEbannerDetailsByMatch({
        match,
        userId: userId ? userId : undefined,
      });

      return paginationObject;
    } else {
      return await getEbannerDetailsByMatch({
        match,
        userId: userId ? userId : undefined,
      });
    }
  } catch (error) {
    throw error;
  }
};

const getAdvertisementId = async (ebannerId: any) => {
  try {
    // Ensure that 'mongoose' is properly imported and configured.
    // ebannerId = mongoose.Types.ObjectId(ebannerId);

    // Replace this logic with your actual query to fetch advertisement_id based on ebannerId.
    // For example:
    // let projectData = await ebannerModel
    //   .find({ _id: ebannerId })
    //   .project({ advertisement_id: 1 })
    //   .lean();

    // Update your projectData logic.

    return null;
  } catch (error) {
    throw error;
  }
};

// Continue with the rest of your code.

async function getEbannerDetailsByMatch(matchData: {
  match: any[];
  userId: string | undefined;
}) {
  // Ensure that 'mongoose' is properly imported and configured.
  let { match, userId } = matchData;
  try {
    // Replace 'ebannerModel' with the actual model you are using.
    // Return your data based on the provided match conditions.
    // For example:
    // return ebannerModel.aggregate([
    //   // ... (rest of your aggregation pipeline)
    // ]);

    // Update your aggregation pipeline according to your model.

    return [];
  } catch (error) {
    throw error;
  }
}

export default {
  getUserAdvertisementEbannersByType,
  getAdvertisementId,
};
