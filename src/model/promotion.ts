import mongoose, { Schema, Document, Types } from "mongoose";
import { promotion } from "../utilities/enum";
import model_name from "../model/model_name";

const ObjectId = Types.ObjectId;

interface IPromotion extends Document {
  user_id: any;
  category_ids: Types.ObjectId[];
  advertisement_id: any;
  by: string;
  start_date: Date;
  end_date: Date;
  start_time: string;
  end_time: string;
  title: string;
  status: string;
  is_repeat_every: boolean;
  repeat: string[];
  promotion_data_ids: Types.ObjectId[];
}

const promotionSchema: Schema<IPromotion> = new Schema<IPromotion>(
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
    by: {
      type: String,
      enum: promotion.by,
    },
    start_date: {
      type: Date,
    },
    end_date: {
      type: Date,
    },
    start_time: {
      type: String,
    },
    end_time: {
      type: String,
    },
    title: {
      type: String,
    },
    status: {
      type: String,
      enum: promotion.status,
      default: "CREATED",
    },
    is_repeat_every: {
      type: Boolean,
      default: false,
    },
    repeat: [
      {
        type: String,
        enum: promotion.repeat,
      },
    ],
    promotion_data_ids: [
      {
        type: Types.ObjectId,
        ref: model_name.PROMOTION_DATA,
      },
    ],
  },
  {
    timestamps: true,
    toObject: {
      transform: function (doc: any, ret: any, options: any) {
        delete ret._id;
        delete ret.__v;
        return ret;
      },
    },
  },
);

const promotionModel = mongoose.model<IPromotion>(
  model_name.PROMOTION,
  promotionSchema,
);

export { promotionModel };
