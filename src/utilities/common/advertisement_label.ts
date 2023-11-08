interface AdvertisementFollowInfo {
  readonly UPDATING_ADVERTISEMENT_FOLLOWING: string;
  readonly UPDATING_ADVERTISEMENT_UNFOLLOWING: string;
  readonly SELF_ADVERTISEMENT_CANT_BE_FOLLOW: string;
  readonly ALREADY_ADVERTISEMENT_FOLLOW: string;
  readonly ALREADY_ADVERTISEMENT_UNFOLLOW: string;
  readonly LIST_FOLLOWED_ADVERTISEMENT_DETAILS: string;
  readonly OWNER_DETAILS: string;
  readonly LIST_OF_FOLLOWER: string;
}

interface AdvertisementFavouriteInfo {
  readonly ADVERTISEMENT_ADD_FAVOURITE: string;
  readonly ADVERTISEMENT_REMOVED_FAVOURITE: string;
  readonly ADVERTISEMENT_ALREADY_FAVOURITE: string;
  readonly ADVERTISEMENT_ALREADY_REMOVED_FAVOURITE: string;
  readonly LIST_FAVOURITE_ADVERTISEMENT_DETAILS: string;
  readonly LIST_FAVOURITE_ADVERTISEMENT_PROMOTION_DETAILS: string;
  readonly LIST_FAVOURITE_ADVERTISEMENT_EBANNER_DETAILS: string;
}

const advertisementFollowInfo: AdvertisementFollowInfo = {
  UPDATING_ADVERTISEMENT_FOLLOWING: "Your Following This Advertisement",
  UPDATING_ADVERTISEMENT_UNFOLLOWING: "Your UnFollowed This Advertisement",
  SELF_ADVERTISEMENT_CANT_BE_FOLLOW:
    "Advertisement Self Can't Be Follow & UnFollow",
  ALREADY_ADVERTISEMENT_FOLLOW: "Already Following This Advertisement",
  ALREADY_ADVERTISEMENT_UNFOLLOW: "Already Unfollowed This Advertisement",
  LIST_FOLLOWED_ADVERTISEMENT_DETAILS: "List Of Followed Advertisement Details",
  OWNER_DETAILS: "Owner Details.",
  LIST_OF_FOLLOWER: "List of Followers.",
};

const advertisementFavouriteInfo: AdvertisementFavouriteInfo = {
  ADVERTISEMENT_ADD_FAVOURITE: "This Advertisement Added To Your Favourites",
  ADVERTISEMENT_REMOVED_FAVOURITE: "This Advertisement Removed From Your Favourites",
  ADVERTISEMENT_ALREADY_FAVOURITE: "This Advertisement Already Added To Your Favourites",
  ADVERTISEMENT_ALREADY_REMOVED_FAVOURITE: "This Advertisement Already Removed From Your Favourites",
  LIST_FAVOURITE_ADVERTISEMENT_DETAILS: "List Of Favourite Advertisement Details",
  LIST_FAVOURITE_ADVERTISEMENT_PROMOTION_DETAILS: "List Of Favourite Advertisement Promotion Details",
  LIST_FAVOURITE_ADVERTISEMENT_EBANNER_DETAILS: "List Of Favourite Advertisement Ebanner Details",
};

export { advertisementFollowInfo, advertisementFavouriteInfo };
