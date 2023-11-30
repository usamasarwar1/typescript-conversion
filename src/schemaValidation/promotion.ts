import Joi, { Schema } from "joi";
import mongoose from 'mongoose';

  export class PromotionValidation {
    private readonly promotionIdSchema: Schema = Joi.object({
      promotionId: Joi.string().custom((value, helpers) => {
        if (!mongoose.Types.ObjectId.isValid(value)) {
          return helpers.error('any.invalid');
        }
        return value;
      }, 'MongoDB ObjectId')
    });

    getPromotionIdSchema(){
      return this.promotionIdSchema;
    }  
}