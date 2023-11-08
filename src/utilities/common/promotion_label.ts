interface PromotionInfo {
  readonly CREATE_PROMOTIONS: string;
  readonly UPDATE_PROMOTIONS: string;
  readonly LIST_OF_USER_PROMOTIONS: string;
  readonly START_DATE_NOT_VALID_FORMAT: string;
  readonly END_DATE_NOT_VALID_FORMAT: string;
  readonly PROMOTION_ADD_LIKE: string;
  readonly FEED_BASED_PROMOTIONS_DETAILS: string;
  readonly USER_FOLLOWED_ADVERTISEMENT_PROMOTIONS: string;
  readonly PROMOTION_REMOVED_LIKE: string;
  readonly PROMOTION_ID_NOT_VALID: string;
  readonly PROMOTION_ALREADY_LIKE: string;
  readonly PROMOTION_ALREADY_REMOVED_LIKE: string;
  readonly GET_PROMOTIONS: string;
  readonly LIST_BY_CATEGORY_PROMOTIONS_DETAILS: string;
  readonly LIST_BY_ADVERTISEMENT_PROMOTIONS_DETAILS: string;
}

const promotionInfo: PromotionInfo = {
  CREATE_PROMOTIONS: "Created Promotions",
  UPDATE_PROMOTIONS: "Updated Promotions",
  LIST_OF_USER_PROMOTIONS: "List Of User Promotions Detail",
  START_DATE_NOT_VALID_FORMAT: "Start Date Is Not Valid Format[YYYY-MM-DD]",
  END_DATE_NOT_VALID_FORMAT: "End Date Is Not Valid Format[YYYY-MM-DD]",
  PROMOTION_ADD_LIKE: "Your Likes Added To This Promotion",
  FEED_BASED_PROMOTIONS_DETAILS: "Feed Based Promotions Detail List",
  USER_FOLLOWED_ADVERTISEMENT_PROMOTIONS:
    "User Followed Advertisement Promotions Detail List",
  PROMOTION_REMOVED_LIKE: "Your Likes Removed From This Promotion",
  PROMOTION_ID_NOT_VALID: "Promotion Id Is Not Exist",
  PROMOTION_ALREADY_LIKE: "You Already Like This Promotion",
  PROMOTION_ALREADY_REMOVED_LIKE: "You Already Unlike This Promotion",
  GET_PROMOTIONS: "Get Promotion Data",
  LIST_BY_CATEGORY_PROMOTIONS_DETAILS: "List Of Category Promotions Detail",
  LIST_BY_ADVERTISEMENT_PROMOTIONS_DETAILS:
    "List Of Advertisement Promotions Detail",
};

export { promotionInfo };
