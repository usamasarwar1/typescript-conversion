import {
  gender as gender_enum,
  contact_type as contact_type_enum,
  social_media_type,
  privacy_type,
} from "../utilities/enum";
import model from "../model/model_name";
import mongoose, { Schema, Document } from "mongoose";

const ObjectId = mongoose.Types.ObjectId;

interface IUser extends Document {
  first_name: string;
  last_name: string;
  email: string;
  phone_number?: number;
  country_code?: string;
  gender: string;
  contact_type: string;
  profile_image_id: any;
  cover_image_id: any;
  shortcuts: any; // Replace 'any[]' with a more specific type if necessary
  state?: string;
  country?: string;
  description?: string;
  password: string;
  is_verified: boolean;
  is_2fa_enabled: boolean;
  password_attempt: number;
  is_notification_enabled: boolean;
  is_social_media: boolean;
  is_social_type: string;
  social_media_id: string;
  is_account_locked: boolean;
  is_trail_period_completed: boolean;
  privacy: string;
  fcm_token: string[];
}

interface IUserLogout extends Document {
  token: string;
}

interface INotificationSettings extends Document {
  user_id: any;
  is_advertisement_enabled: boolean;
  is_deals_enabled: boolean;
  is_messages_enabled: boolean;
}

const userSchema: Schema<IUser> = new Schema<IUser>(
  {
    first_name: {
      type: String,
      trim: true,
    },
    last_name: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      unique: true,
    },
    phone_number: {
      type: Number,
    },
    country_code: {
      type: String,
    },
    gender: {
      type: String,
      enum: gender_enum,
    },
    contact_type: {
      type: String,
      enum: contact_type_enum,
    },
    profile_image_id: {
      type: ObjectId,
      ref: model.ATTACHMENTS,
    },
    cover_image_id: {
      type: ObjectId,
      ref: model.ATTACHMENTS,
    },
    shortcuts: {
      type: [Schema.Types.Mixed], // Use a more specific type for shortcuts
      default: [],
    },
    state: {
      type: String,
    },
    country: {
      type: String,
      // default: ''
    },
    description: {
      type: String,
      // default: ''
    },
    password: {
      type: String,
    },
    is_verified: {
      type: Boolean,
      default: false,
    },
    is_2fa_enabled: {
      type: Boolean,
      default: false,
    },
    password_attempt: {
      type: Number,
      default: 0,
    },
    is_notification_enabled: {
      type: Boolean,
      default: false,
    },
    is_social_media: {
      type: Boolean,
      default: false,
    },
    is_social_type: {
      type: String,
      enum: social_media_type,
    },
    social_media_id: {
      type: String,
    },
    is_account_locked: {
      type: Boolean,
      default: false,
    },
    is_trail_period_completed: {
      type: Boolean,
      default: false,
    },
    privacy: {
      type: String,
      enum: privacy_type,
      default: "PUBLIC",
    },
    fcm_token: [
      {
        type: String,
      },
    ],
  },
  {
    timestamps: true,
    toObject: {
      transform: function (doc: any, ret: any) {
        delete ret.__v;
        delete ret.password;
        return ret;
      },
    },
  },
);

const userLogoutSchema: Schema<IUserLogout> = new Schema<IUserLogout>(
  {
    token: {
      type: String,
    },
  },
  {
    timestamps: true,
    toObject: {
      transform: function (doc: any, ret: any) {
        delete ret.__v;
        return ret;
      },
    },
  },
);

const notificationSettingsSchema: Schema<INotificationSettings> =
  new Schema<INotificationSettings>(
    {
      user_id: {
        type: ObjectId,
        ref: model.USER,
      },
      is_advertisement_enabled: {
        type: Boolean,
        default: false,
      },
      is_deals_enabled: {
        type: Boolean,
        default: false,
      },
      is_messages_enabled: {
        type: Boolean,
        default: false,
      },
    },
    {
      timestamps: true,
      toObject: {
        transform: function (doc: any, ret: any) {
          delete ret.__v;
          return ret;
        },
      },
    },
  );

const userModel = mongoose.model<IUser>(model.USER, userSchema);
const userLogoutModel = mongoose.model<IUserLogout>(
  model.USER_LOGOUT,
  userLogoutSchema,
);
const notificationSettingsModel = mongoose.model<INotificationSettings>(
  model.NOTIFICATION_SETTING,
  notificationSettingsSchema,
);

// Create and export the user model
export { userModel, userLogoutModel, notificationSettingsModel };
