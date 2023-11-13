import mongoose, { Schema, Document, Types } from "mongoose";
import model_name from "../model/model_name";

interface IAdvertisement extends Document {
  title: string;
  is_draft: boolean;
  draft_id: Types.ObjectId;
  published_id: Types.ObjectId;
  user_id: Types.ObjectId;
  is_owner: boolean;
  is_global_profile: boolean;
  first_name: string;
  last_name: string;
  country_code: string;
  phone_number?: number;
  image_id: Types.ObjectId;
  folder_id: string;
  email: string;
  ratings: number;
  is_deal_available: boolean;
  is_verified: boolean;
  publish_createdAt?: Date;
  publish_updatedAt?: Date;
  is_deleted: boolean;
}

const advertisementSchema: Schema<IAdvertisement> = new Schema<IAdvertisement>(
  {
    title: {
      type: String,
      default: "",
      required: true,
    },
    is_draft: {
      type: Boolean,
      default: false,
    },
    draft_id: {
      type: Schema.Types.ObjectId,
      ref: model_name.DRAFT,
    },
    published_id: {
      type: Schema.Types.ObjectId,
      ref: model_name.PUBLISHED,
    },
    user_id: {
      type: Schema.Types.ObjectId,
      ref: model_name.USER,
    },
    is_owner: {
      type: Boolean,
      default: false,
    },
    is_global_profile: {
      type: Boolean,
      default: false,
    },
    first_name: {
      type: String,
      default: "",
    },
    last_name: {
      type: String,
      default: "",
    },
    country_code: {
      type: String,
      default: "",
    },
    phone_number: {
      type: Number,
    },
    image_id: {
      type: Schema.Types.ObjectId,
      ref: model_name.ATTACHMENTS,
    },
    folder_id: {
      type: String,
      default: "",
    },
    email: {
      type: String,
      default: "",
    },
    ratings: {
      type: Number,
      default: 0,
    },
    is_deal_available: {
      type: Boolean,
      default: false,
    },
    is_verified: {
      type: Boolean,
      default: false,
    },
    publish_createdAt: {
      type: Date,
    },
    publish_updatedAt: {
      type: Date,
    },
    is_deleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    toObject: {
      transform: function (doc: Document, ret: Record<string, any>) {
        delete ret.__v;
        return ret;
      },
    },
  }
);

const advertisementModel = mongoose.model<IAdvertisement>(
  model_name.ADVERTISEMENT,
  advertisementSchema
);

interface IAdvertisementFavouritesFollowers extends Document {
  advertisement_id: Types.ObjectId;
  followers_count: number;
  followers: Types.ObjectId[];
  favourites_count: number;
  favourites: Types.ObjectId[];
}

const advertisementFavouritesFollowersSchema: Schema<IAdvertisementFavouritesFollowers> =
  new Schema<IAdvertisementFavouritesFollowers>(
    {
      advertisement_id: {
        type: Schema.Types.ObjectId,
        ref: model_name.ADVERTISEMENT,
      },
      followers_count: {
        type: Number,
        default: 0,
      },
      followers: [
        {
          type: Types.ObjectId,
          ref: model_name.USER,
        },
      ],
      favourites_count: {
        type: Number,
        default: 0,
      },
      favourites: [
        {
          type: Types.ObjectId,
          ref: model_name.USER,
        },
      ],
    },
    {
      timestamps: true,
    }
  );

const advertisementFavouritesFollowersModel =
  mongoose.model<IAdvertisementFavouritesFollowers>(
    model_name.ADVERTISEMENT_FAVOURITES_FOLLOWERS,
    advertisementFavouritesFollowersSchema
  );

export { advertisementModel, advertisementFavouritesFollowersModel };
