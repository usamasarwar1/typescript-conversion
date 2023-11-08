import Joi, { Schema } from "joi";

export class AdvertisementValidation {
  private readonly followerAdvertisementSchema: Schema = Joi.object({
    is_follow: Joi.string().valid("true", "false"),
  });

  private readonly favouriteAdvertisementSchema: Schema = Joi.object({
    is_favourite: Joi.string().valid("true", "false"),
  });

  private readonly paginationSchema: Schema = Joi.object({
    is_pagination: Joi.string().valid("true", "false"),
    page_index: Joi.string(),
    page_size: Joi.string(),
  });


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

