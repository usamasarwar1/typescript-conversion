import { userModel, User } from "../model/user";
import { CommonLabel } from "../utilities/enum";
import { errors } from "../utilities/error";
import { userLabel, userMessage } from "../utilities/common/user_label";
import { NotFoundException } from "../exceptions";

interface UserData {
  email?: string;
  userId?: string;
}

class UserService {
  async getVerifiedUser(userData: UserData): Promise<User | null> {
    try {
      const { email, userId } = userData;
      let user: User | null = null;

      if (userId || email) {
        if (email) {
          user = await this.getUserByEmail(email);
          if (!user)
            throw new NotFoundException(email, "USER_EMAIL");
        } else if (userId) {
          user = await userModel.findOne({ _id: userId }).lean();
          if (!user)
            throw new NotFoundException(userId, "USER_ID");
        }

        // Additional logic for verification and activation can be added here

        return user;
      } else {
        return null;
      }
    } catch (error) {
      throw error;
    }
  }

  async getUserByEmail(email: string): Promise<User | null> {
    try {
      let user: User | null = await userModel.findOne({ email: email }).lean();

      if (!user) {
        throw new Error(
          JSON.stringify({
            status: 512,
            messages: `${userLabel["email"]} ${CommonLabel["NOT_VALID"]}.`,
          })
        );
      }

      return user;
    } catch (error) {
      throw error;
    }
  }

  async getActiveUser(email: string): Promise<User | null> {
    try {
      let user: User | null = await this.getUserByEmail(email);

      if (user && user["is_account_locked"]) {
        throw new Error(
          JSON.stringify({
            status: 513,
            messages: userMessage["USER_ACCOUNT_LOCKED"],
          })
        );
      }

      return user;
    } catch (error) {
      throw error;
    }
  }
}

export default new UserService();
