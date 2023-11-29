import mongoose from "mongoose";
import dotenv from "dotenv";
import { logger } from "./logger/logger";

//FEEDBACK - It should load from the Config
dotenv.config({ path: "./.env" });

const DB_URL: any = process.env.DATABASE_URL;
//FEEBBACK - DB_URL is not logged.
logger.info("DB_URL", process.env.DATABASE_URL);

const dbConnect = async () => {
  await mongoose
    .connect(DB_URL, {})

    .then(() => {
      logger.info("Connection Successful to Database");
      return;
    })
    .catch((err: any) => logger.error("no connection: ", err));
};

export default dbConnect;
