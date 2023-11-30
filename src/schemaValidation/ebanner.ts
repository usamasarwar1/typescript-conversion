import Joi, { Schema } from "joi";
import mongoose from 'mongoose';

  export class EbannerValidation {
    private readonly ebannerIdSchema: Schema = Joi.object({
      ebannerId: Joi.string().custom((value, helpers) => {
        if (!mongoose.Types.ObjectId.isValid(value)) {
          return helpers.error('any.invalid');
        }
        return value;
      }, 'MongoDB ObjectId')
    });

    getEbannerIdSchema(){
        return this.ebannerIdSchema;
      }
  
}