import mongoose from "mongoose";

export interface AdvertisementData {
  match: [];
  filter: [];
  userId: mongoose.Types.ObjectId;
}
export interface AdvertisementIdQuery {
  advertisementId: mongoose.Types.ObjectId | any;
  query: {
    is_pagination: string | any;
    page_index: number | any;
    page_size: number | any;
    notificationEnabled: boolean | any;
  };
}

export interface AdvertisementIdOwner {
  advertisementId: mongoose.Types.ObjectId | any;
  query?: {
    notificationEnabled: boolean | any;
  };
}

export interface CategoryIdQuery {
  category_id: mongoose.Types.ObjectId | any;
  query: {
    is_pagination: string | any;
    page_index: number | any;
    page_size: number | any;
  };
}

export interface UserAdvertisementData {
  userId: mongoose.Types.ObjectId | any;
  type: string;
}
