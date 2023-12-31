interface EbannerInfo {
  readonly CREATE_EBANNER: string;
  readonly UPDATE_EBANNER: string;
  readonly EBANNER_ID_NOT_VALID: string;
  readonly THIS_USER_CANT_BE_EDIT_EBANNER: string;
  readonly THIS_USER_CANT_BE_DELETE_EBANNER: string;
  readonly LIST_EBANNER: string;
  readonly EBANNER_DELETE: string;
  readonly EBANNER_ADD_LIKE: string;
  readonly EBANNER_IN_LIVE_STATE: string;
  readonly THIS_USER_CANT_SET_LIVE_EBANNER: string;
  readonly EBANNER_REMOVED_FROM_LIVE: string;
  readonly EBANNER_REMOVED_LIKE: string;
  readonly EBANNER_ALREADY_LIKE: string;
  readonly EBANNER_ALREADY_REMOVED_LIKE: string;
  readonly CATEGORY_BASED_EBANNER: string;
  readonly FEED_BASED_EBANNERS: string;
  readonly ADVERTISEMENT_BASED_EBANNER: string;
  readonly USER_FOLLOWED_ADVERTISEMENTS_EBANNERS: string;
}

const ebannerInfo: EbannerInfo = {
  CREATE_EBANNER: "Created New Ebanner",
  UPDATE_EBANNER: "Updated Existing Ebanner",
  EBANNER_ID_NOT_VALID: "Ebanner id is not valid",
  THIS_USER_CANT_BE_EDIT_EBANNER: "This user cant be Update this ebanner",
  THIS_USER_CANT_BE_DELETE_EBANNER: "This user cant be delete this ebanner",
  LIST_EBANNER: "List of ebanner",
  EBANNER_DELETE: "Ebanner deleted successfully",
  EBANNER_ADD_LIKE: "Your likes added to this ebanner",
  EBANNER_IN_LIVE_STATE: "Your Ebanner Is In Live State",
  THIS_USER_CANT_SET_LIVE_EBANNER: "This user can't set live to this ebanner",
  EBANNER_REMOVED_FROM_LIVE: "Your Ebanner Removed From Live State",
  EBANNER_REMOVED_LIKE: "Your likes removed from this ebanner",
  EBANNER_ALREADY_LIKE: "You already like this ebanner",
  EBANNER_ALREADY_REMOVED_LIKE: "You already unlike this ebanner",
  CATEGORY_BASED_EBANNER: "List of Ebanner Details by category",
  FEED_BASED_EBANNERS: "List Of Feed Based Ebanner Details",
  ADVERTISEMENT_BASED_EBANNER: "List Of  Ebanner Details By Advertisement",
  USER_FOLLOWED_ADVERTISEMENTS_EBANNERS:
    "List User Followed Advertisements Ebanners Details",
};

export { ebannerInfo };
