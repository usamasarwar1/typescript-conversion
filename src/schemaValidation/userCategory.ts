import Joi from "joi";

const categoryFollowSchema = Joi.object({
  category_ids: Joi.array().items(Joi.string().length(24).required()),
});

export { categoryFollowSchema };
