import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config({ path: "./.env" });

const DB_URL: any = process.env.DATABASE_URL;
console.log("DB_URL", process.env.DATABASE_URL);

const dbConnect = async (): Promise<any> => {
  await mongoose
    .connect(DB_URL, {})

    .then(() => {
      console.log("Connection Successful to Database");
      return;
    })
    .catch((err: any) => console.log("no connection: ", err));
};

export default dbConnect;
