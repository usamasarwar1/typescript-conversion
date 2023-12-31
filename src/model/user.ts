import {
  Gender as gender_enum,
  ContactType as contact_type_enum,
  SocialMediaType,
  PrivacyType,
} from "../utilities/enum";
import model from "../model/model_name";
import mongoose, { Schema, Document, Types } from "mongoose";

export interface User extends Document {
  first_name: string;
  last_name: string;
  email: string;
  phone_number?: number;
  country_code?: string;
  gender: string;
  contact_type: string;
  profile_image_id: Types.ObjectId;
  cover_image_id: Types.ObjectId;
  shortcuts: any;
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
  user_id: Types.ObjectId;
  is_advertisement_enabled: boolean;
  is_deals_enabled: boolean;
  is_messages_enabled: boolean;
}

const userSchema: Schema<User> = new Schema<User>(
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
      type: Schema.Types.ObjectId,
      ref: model.ATTACHMENTS,
    },
    cover_image_id: {
      type: Schema.Types.ObjectId,
      ref: model.ATTACHMENTS,
    },
    shortcuts: {
      type: [Schema.Types.Mixed],
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
      enum: SocialMediaType,
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
      enum: PrivacyType,
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
      transform: function (doc: Document, ret: Record<string, any>) {
        delete ret.__v;
        delete ret.password;
        return ret;
      },
    },
  }
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
      transform: function (doc: Document, ret: Record<string, any>) {
        delete ret.__v;
        return ret;
      },
    },
  }
);

const notificationSettingsSchema: Schema<INotificationSettings> =
  new Schema<INotificationSettings>(
    {
      user_id: {
        type: Schema.Types.ObjectId,
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
        transform: function (doc: Document, ret: Record<string, any>) {
          delete ret.__v;
          return ret;
        },
      },
    }
  );

const userModel = mongoose.model<User>(model.USER, userSchema);
const userLogoutModel = mongoose.model<IUserLogout>(
  model.USER_LOGOUT,
  userLogoutSchema
);
const notificationSettingsModel = mongoose.model<INotificationSettings>(
  model.NOTIFICATION_SETTING,
  notificationSettingsSchema
);

// Create and export the user model
export { userModel, userLogoutModel, notificationSettingsModel };
