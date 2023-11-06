import express, { Application, Request, Response, NextFunction } from "express";
import dbConnect from "./db";
import dotenv from "dotenv";
import token from "./router/temporarytoken";
import bodyParser from "body-parser";
import routes from "./router/routes";
import { logger } from "./logger/logger";

const app: Application = express();

app.use(express.json());
dotenv.config();

app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);
app.use(bodyParser.json());
app.use("/token",token)
app.use("/api/", routes);

//const multiply = (a: number, b: number): number => a * b;

// app.get(
//   "/",
//   (req: express.Request, res: express.Response, next: NextFunction) => {
//     res.send("From root address");
//     console.log(multiply(9, 5));
//   },
// );

const PORT = process.env.PORT || 5000;
dbConnect();

app.listen(PORT, () => {
  logger.info(`The project is running on PORT ${PORT}.`);
});
