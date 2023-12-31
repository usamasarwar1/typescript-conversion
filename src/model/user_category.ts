import mongoose, { Schema, Document, Types } from "mongoose";
import model from "./model_name";

interface IUserCategory extends Document {
  user_id: Types.ObjectId;
  category_id: Types.ObjectId;
}

const userCategorySchema: Schema<IUserCategory> = new Schema<IUserCategory>(
  {
    user_id: {
      type: Schema.Types.ObjectId,
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
      transform: function (doc: Document, ret: Record<string, any>) {
        delete ret.__v;
        return ret;
      },
    },
  }
);

const userCategoryModel =
  mongoose.models.USER_CATEGORY ||
  mongoose.model<IUserCategory>(model.USER_CATEGORY, userCategorySchema);

export { userCategoryModel };
