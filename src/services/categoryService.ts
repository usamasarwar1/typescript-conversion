// import logger from "../../utils/logger";
import * as Category from "../model/category";
const { categoryModel } = Category;

// Define the function to validate categories.
const validCategory = async (categoryId: string | string[]) => {
  try {
    if (Array.isArray(categoryId)) {
      const inputCategoryId: any = [];
      categoryId.forEach((category) => {
        if (!inputCategoryId.includes(category)) {
          inputCategoryId.push(category);
        }
      });
      const verifiedId: string[] = [];
      const category = await categoryModel
        .find(
          {
            _id: { $in: inputCategoryId },
          },
          { _id: 1 },
        )
        .lean();
      if (!category.length) {
        return [];
      }
      category.map((obj: any) => {
        verifiedId.push(obj._id);
      });
      return verifiedId;
    }

    // Assuming that categoryModel is properly defined
    const category = await categoryModel.findOne({ _id: categoryId }).lean();
    return category;
  } catch (error: any) {
    // logger.get("app_log").error({
    //   level: "error",
    //   message: error.message,
    //   metadata: error.stack,
    // });
    throw error;
  }
};

// Export the validCategory function.
export default {
  validCategory,
};
