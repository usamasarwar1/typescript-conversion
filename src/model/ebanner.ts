import mongoose, { Schema, Document, Types } from "mongoose";
import model_name from "../model/model_name";

const ObjectId = Types.ObjectId;

interface IEbanner extends Document {
  user_id: any;
  category_ids: Types.ObjectId[];
  advertisement_id: any;
  is_live: boolean;
  title: string;
  description: string;
  reference_image_id: Types.ObjectId[];
  reference_video_id: Types.ObjectId[];
}

const ebannerSchema: Schema<IEbanner> = new Schema<IEbanner>(
  {
    user_id: {
      type: Types.ObjectId,
      ref: model_name.USER,
    },
    category_ids: [
      {
        type: Types.ObjectId,
        ref: model_name.CATEGORY,
      },
    ],
    advertisement_id: {
      type: Types.ObjectId,
      ref: model_name.ADVERTISEMENT,
    },
    is_live: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
    },
    description: {
      type: String,
    },
    reference_image_id: [
      {
        type: Types.ObjectId,
        ref: model_name.ATTACHMENTS,
      },
    ],
    reference_video_id: [
      {
        type: Types.ObjectId,
        ref: model_name.ATTACHMENTS,
      },
    ],
  },
  {
    timestamps: true,
    toObject: {
      transform: function (doc, ret, options) {
        delete ret._id;
        delete ret.__v;
        return ret;
      },
    },
  },
);

const ebannerModel = mongoose.model<IEbanner>(
  model_name.EBANNER,
  ebannerSchema,
);

export { ebannerModel };
