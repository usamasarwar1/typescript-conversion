import { userModel } from "../model/user";
import { commonLabel } from "../utilities/common/label";
import { errors } from "../utilities/error";
import { userLabel, userMessage } from "../utilities/common/user_label";

interface UserData {
  email?: string;
  userId?: string;
}

const userService = {
  getVerifiedUser: async (userData: UserData) => {
    try {
      const { email, userId } = userData;
      let user;
      if (userId || email) {
        if (email) {
          user = await userService.getUserByEmail(email);
        } else if (userId) {
          user = await userModel.findOne({ _id: userId }).lean();
          if (!user)
            throw JSON.stringify({
              status: errors.Not_Found.code,
              messages: `${userLabel["user_id"]} ${commonLabel["NOT_VALID"]}.`,
            });
        }
        // Additional logic for verification and activation can be added here
        return user;
      } else {
        return null;
      }
    } catch (error) {
      throw error;
    }
  },

  getUserByEmail: async (email: string) => {
    try {
      let user = await userModel.findOne({ email: email }).lean();
      if (!user) {
        throw JSON.stringify({
          status: 512,
          messages: `${userLabel["email"]} ${commonLabel["NOT_VALID"]}.`,
        });
      }
      return user;
    } catch (error) {
      throw error;
    }
  },

  getActiveUser: async (email: string) => {
    try {
      let user = await userService.getUserByEmail(email);
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
  },
};

export default userService;
