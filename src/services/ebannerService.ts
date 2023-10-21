import { pagination } from "../utilities/pagination";
import advertisementService from "../services/advertisement/advertisementService";
// Import your EBanners model and any necessary modules here.
import { EBanners } from "bb-data-model";
const { ebannerModel } = EBanners;

const getUserAdvertisementEbannersByType = async (ebannerData: any) => {
  try {
    const { query, userId, type } = ebannerData;

    let { is_pagination, page_index, page_size } = query;

    let match = [];
    let advertisementIds;

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
    } else advertisementIds = [];

    match.push({
      $match: { advertisement_id: { $in: advertisementIds }, is_live: true },
    });

    if (is_pagination === "true") {
      // Import your EBanners model and replace `ebannerModel` with the actual model.
      // let dataCount = await ebannerModel
      //   .find({ advertisement_id: advertisementIds, is_live: true })
      //   .count()
      //   .lean();

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

    // Import your EBanners model and replace `ebannerModel` with the actual model.
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

async function getEbannerDetailsByMatch(matchData: any) {
  // Ensure that 'mongoose' is properly imported and configured.
  let { match, userId } = matchData;
  try {
    // Replace 'ebannerModel' with the actual model you are using.
    // return ebannerModel.aggregate([
    // ... (rest of your aggregation pipeline)
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
