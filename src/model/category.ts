import mongoose, { Schema, Document } from "mongoose";
import model from "./model_name";

interface ICategory extends Document {
  title: string;
  code?: string;
  description?: string;
  image: {
    url?: string;
    type?: string;
    name?: string;
  };
  folder_id?: string;
  thumbnail_url?: string;
  index: number;
  is_active: boolean;
  is_deleted: boolean;
  is_menu_bar: boolean;
}

const categorySchema: Schema<ICategory> = new Schema<ICategory>(
  {
    title: {
      type: String,
      text: true,
    },
    code: {
      type: String,
    },
    description: {
      type: String,
    },
    image: {
      url: {
        type: String,
      },
      type: {
        type: String,
      },
      name: {
        type: String,
      },
    },
    folder_id: {
      type: String,
    },
    thumbnail_url: {
      type: String,
    },
    index: {
      type: Number,
      default: 0,
    },
    is_active: {
      type: Boolean,
      default: true,
    },
    is_deleted: {
      type: Boolean,
      default: false,
    },
    is_menu_bar: {
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
  },
);

const existModel = mongoose.models[
  model.CATEGORIES
] as mongoose.Model<ICategory>;
const categoryModel =
  existModel || mongoose.model<ICategory>(model.CATEGORIES, categorySchema);

export { categoryModel };
