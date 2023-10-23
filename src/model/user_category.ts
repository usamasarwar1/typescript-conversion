import mongoose, { Schema, Document, Types } from "mongoose";
import model from "./model_name";

const objectId = Types.ObjectId;

interface IUserCategory extends Document {
  user_id: any;
  category_id: Types.ObjectId;
}

const userCategorySchema: Schema<IUserCategory> = new Schema<IUserCategory>(
  {
    user_id: {
      type: Types.ObjectId,
      ref: model.USER,
      required: true,
    },
    category_id: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: model.CATEGORIES,
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

const userCategoryModel = mongoose.models.Categories || mongoose.model<IUserCategory>(
  model.CATEGORIES,
  userCategorySchema,
);

export { userCategoryModel };
