import mongoose from "mongoose";
import {CONFIG} from "./config/config"
import { logger } from "./logger/logger";

//FEEDBACK - It should load from the Config
const DB_URL: any = CONFIG.dburl

const dbConnect = async () => {
  await mongoose
    .connect(DB_URL, {})

    .then(() => {
      logger.info("Connection Successful to Database");
      return;
    })
    .catch((err: any) => {logger.error("no connection: ", err)
          throw(err)}
    );
};

export default dbConnect;
