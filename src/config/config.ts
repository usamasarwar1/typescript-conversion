import dotenv from "dotenv";
dotenv.config();

const DB_URL: string | undefined = process.env.DATABASE_URL||"mongodb+srv://bb-application:jkaGIhvoShxffitf@bb-cluster.wrabc8j.mongodb.net/busibeez?retryWrites=true&w=majority";;
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
