import Joi, { Schema } from "joi";
import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';

  export class AdvertisementValidation {

    //New Function added
    validateAdvertisementId(req: Request, res: Response, next: NextFunction) {
      const { advertisementId } = req.params;
      console.log("the advertsiemnt id ");
      if (!mongoose.Types.ObjectId.isValid(advertisementId)) {
        return res.status(400).json({ error: 'Invalid advertisement ID' });
      }
        next();
    }

    
  private readonly advertisementIdPaginationSchema: Schema = Joi.object({
    advertisementId: Joi.string().custom((value, helpers) => {
      if (!mongoose.Types.ObjectId.isValid(value)) {
        return helpers.error('any.invalid');
      }
      return value;
    }, 'MongoDB ObjectId'),
    is_pagination: Joi.string().valid("true", "false"),
    page_index: Joi.number(), //FEEDBACK - Can this be number
    page_size: Joi.number()
  });

//New Function added
  validateAdvertisementPagination(req: Request, res: Response, next: NextFunction) {
    const { advertisementId, page_index, page_size } = req.params;
    if (!mongoose.Types.ObjectId.isValid(advertisementId)) {
      return res.status(400).json({ error: 'Invalid advertisement ID' });
    }
    const paginationSchema: Schema = Joi.object({
      page_index: Joi.number(),
      page_size: Joi.number()
    });
    const paginationValidation = paginationSchema.validate({
      page_index,
      page_size
    });
    if (paginationValidation.error) {
      return res.status(400).json({ error: paginationValidation.error.message });
    }
  
    next();
  }
  

  private readonly followerAdvertisementSchema: Schema = Joi.object({
    is_follow: Joi.string().valid("true", "false"),
  });

  private readonly favouriteAdvertisementSchema: Schema = Joi.object({
    is_favourite: Joi.string().valid("true", "false"),
  });

  private readonly paginationSchema: Schema = Joi.object({
    is_pagination: Joi.string().valid("true", "false"),
    page_index: Joi.number(),
    page_size: Joi.number(),
    status: Joi.string().valid("CREATED", "PAUSED", "STARTED", "SCHEDULED", "FINISHED")
  });

    getAdvertisementIdSchema(){
      console.log(" inside getAdvertisementIdSchema123");
      return this.validateAdvertisementId;
    }

  getAdvertisementIdPaginationSchema(){
    return this.advertisementIdPaginationSchema;
  }

  getFollowerAdvertisementSchema() {
    return this.followerAdvertisementSchema;
  }

  getFavouriteAdvertisementSchema() {
    return this.favouriteAdvertisementSchema;
  }

  getPaginationSchema() {
    return this.paginationSchema;
  }
}