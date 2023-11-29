import dotenv from "dotenv";
dotenv.config();

const DB_URL: string | undefined = process.env.DATABASE_URL;
const PORT =process.env.PORT || "5000";
interface Config {
  port: string;
  dburl?: string;
}
const CONFIG: Config = {
  port:PORT,
  dburl: DB_URL
};
export { CONFIG };
