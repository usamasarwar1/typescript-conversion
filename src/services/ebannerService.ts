import { pagination } from "../utilities/pagination";
import advertisementService from "../services/advertisement/advertisementService";
import * as EBanners from "../model/ebanner";
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
  async getUserAdvertisementEbannersByType(ebannerData: EbannerData): Promise<any> {
    try {
      const { query, userId, type } = ebannerData;
      let { is_pagination, page_index, page_size } = query;
      let match: any[] = [];
      let advertisementIds: string[] = [];

      if (
        type === "FOLLOWEDADVERTISEMENT" ||
        type === "FAVOURITESADVERTISEMENT"
      ) {
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
        let dataCount = 0; // Replace with your data count logic.

        let { skip, limit, paginationObject } = pagination(
          page_index,
          page_size,
          dataCount,
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

  async getAdvertisementId(ebannerId: any): Promise<any> {
    try {
      return null; // Update your logic to fetch advertisement_id based on ebannerId.
    } catch (error) {
      throw error;
    }
  }

  private async getEbannerDetailsByMatch(matchData: {
    match: any[];
    userId: string | undefined;
  }): Promise<any[]> {
    let { match, userId } = matchData;
    try {
      return []; // Update your aggregation pipeline according to your model.
    } catch (error) {
      throw error;
    }
  }
}

export default new EbannerService();
