import Joi, { Schema } from "joi";
import mongoose from 'mongoose';

  export class AdvertisementValidation {
    private readonly advertisementIdSchema: Schema = Joi.object({
      advertisementId: Joi.string().custom((value, helpers) => {
        if (!mongoose.Types.ObjectId.isValid(value)) {
          return helpers.error('any.invalid');
        }
        return value;
      }, 'MongoDB ObjectId')
    });
    
  private readonly advertisementIdPaginationSchema: Schema = Joi.object({
    advertisementId: Joi.string().custom((value, helpers) => {
      if (!mongoose.Types.ObjectId.isValid(value)) {
        return helpers.error('any.invalid');
      }
      return value;
    }, 'MongoDB ObjectId'),
    is_pagination: Joi.string().valid("true", "false"),
    page_index: Joi.number(), //FEEDBACK - Can this be number
    page_size: Joi.number(),
    notificationEnabled: Joi.string().valid("true", "false"),
  });

  private readonly advitertismentNotificationSchema: Schema = Joi.object({
    notificationEnabled: Joi.string().valid("true", "false"),
  });

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
      return this.advertisementIdSchema;
    }

  getAdvertisementIdPaginationSchema(){
    return this.advertisementIdPaginationSchema;
  }

  getAdvertisementNotificationSchema(){
    return this.advitertismentNotificationSchema;
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