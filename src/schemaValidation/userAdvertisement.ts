import Joi from "joi";

const followerAdvertisementSchema = Joi.object({
  is_follow: Joi.string().valid("true", "false"),
});

const favouriteAdvertisementSchema = Joi.object({
  is_favourite: Joi.string().valid("true", "false"),
});

const paginationSchema = Joi.object({
  is_pagination: Joi.string().valid("true", "false"),
  page_index: Joi.string(),
  page_size: Joi.string(),
});

export {
  followerAdvertisementSchema,
  favouriteAdvertisementSchema,
  paginationSchema,
};
