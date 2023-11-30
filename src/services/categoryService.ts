// import logger from "../../utils/logger";
import * as Category from "../model/category";
const { categoryModel } = Category;

class CategoryService {
  async validCategory(categoryId: string | string[]): Promise<string[] | null> {
    try {
      if (Array.isArray(categoryId)) {
        const inputCategoryId: string[] = [];
        categoryId.forEach((category) => {
          if (!inputCategoryId.includes(category)) {
            inputCategoryId.push(category);
          }
        });

        const verifiedId: string[] = [];
        const categories = await categoryModel
          .find(
            {
              _id: { $in: inputCategoryId },
            },
            { _id: 1 }
          )
          .lean();

        if (!categories.length) {
          return [];
        }

        categories.map((obj: any) => {
          verifiedId.push(obj._id);
        });

        return verifiedId;
      }
      // Assuming that categoryModel is properly defined
      const category = await categoryModel.findOne({ _id: categoryId }).lean();
      return category ? [category._id] : null;
    } catch (error: any) {
      throw error;
    }
  }
}

export default new CategoryService();
