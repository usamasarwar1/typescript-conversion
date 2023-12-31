import mongoose, { Schema, Document, Types } from "mongoose";
import model_name from "./model_name";

interface IEbanner extends Document {
  user_id: Types.ObjectId;
  category_ids: Types.ObjectId[];
  advertisement_id: Types.ObjectId;
  is_live: boolean;
  title: string;
  description: string;
  reference_image_id: Types.ObjectId[];
  reference_video_id: Types.ObjectId[];
}

const ebannerSchema: Schema<IEbanner> = new Schema<IEbanner>(
  {
    user_id: {
      type: Schema.Types.ObjectId,
      ref: model_name.USER,
    },
    category_ids: [
      {
        type: Schema.Types.ObjectId,
        ref: model_name.CATEGORIES,
      },
    ],
    advertisement_id: {
      type: Schema.Types.ObjectId,
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
      transform: function (doc: Document, ret: Record<string, any>) {
        delete ret._id;
        delete ret.__v;
        return ret;
      },
    },
  }
);

const ebannerModel = mongoose.model<IEbanner>(
  model_name.EBANNER,
  ebannerSchema
);

export { ebannerModel };
