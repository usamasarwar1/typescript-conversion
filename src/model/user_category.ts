import mongoose, { Schema, Document, Types } from "mongoose";
import model from "../model/model_name";

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
      ref: model.CATEGORY,
    },
  },
  {
    timestamps: true,
    toObject: {
      transform: function (doc, ret) {
        delete ret.__v;
        return ret;
      },
    },
  },
);

const userCategoryModel = mongoose.model<IUserCategory>(
  model.CATEGORY,
  userCategorySchema,
);

export { userCategoryModel };
