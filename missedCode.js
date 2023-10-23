// userService.js =>  getVerifiedUser

const getVerifiedUser = async (userData) => {
    try {
      const { email, userId } = userData;
      let user;
      if (userId || email) {
        if (email) {
          user = await getUserByEmail(email);
        } else if (userId) {
          user = await userModel.findOne({ _id: userId }).lean();
          if (!user)
            throw JSON.stringify({
              status: errors.Not_Found.code,
              messages: `${userLabels["user_id"]} ${commonLabel["NOT_VALID"]}.`,
            });
        }
        if (!user["is_verified"]) {
          throw JSON.stringify({
            status: errors.Not_Acceptable.code,
            messages: userMessage["USER_NOT_VERIFIED"],
          });
        }
  
  
        user = await getActiveUser(user.email);
        return user;
      } else return null;
    } catch (error) {
      throw error;
    }
  };
  
  const getUserByEmail = async (email) => {
    try {
      let user = await userModel.findOne({ email: email }).lean();
      if (!user) {
        throw JSON.stringify({
          status: 512,
          messages: `${userLabels["email"]} ${commonLabel["NOT_VALID"]}.`,
        });
      }
      return user;
    } catch (error) {
      throw error;
    }
  };
  
  const getActiveUser = async (email) => {
    try {
      let user = await getUserByEmail(email);
      if (user["is_account_locked"]) {
        throw JSON.stringify({
          status: 513,
          messages: userMessage["USER_ACCOUNT_LOCKED"],
        });
      }
      return user;
    } catch (error) {
      throw error;
    }
  };
  

  ///////////////////////////////////////////////////////////////


//   joiSchemaValidation.js => validateObjectSchema

import { requestValidationMessage } from "../constant/common/validation_message";
import { defaultServerResponse } from "../constant/common/response";
import { errors } from "../constant/status/client_errors";
const Joi = require("joi");
import sanitizeHtml from 'sanitize-html';


export const validateObjectSchema = (data, schema) => {
  const validation = schema.validate(data, { abortEarly: false });
  if (validation.error) {
    const errorDetails = validation.error.details.map((value) => {
      return {
        error: value.message,
        path: value.path,
      };
    });
    return errorDetails;
  }
  return null;
};
