import express, { Application, Request, Response, NextFunction } from "express";
import dbConnect from "./db";
import dotenv from "dotenv";
import token from "./router/temporarytoken";
import bodyParser from "body-parser";
import routes from "./router/routes";

const app: any = express();

app.use(express.json());
dotenv.config();

app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);
app.use("/token",token)
app.use(bodyParser.json());
app.use("/", routes);

//const multiply = (a: number, b: number): number => a * b;

app.get(
  "/",
  (req: express.Request, res: express.Response, next: NextFunction) => {
    res.send("From root address");
  },
);

const PORT = process.env.PORT || 5000;
dbConnect();

app.listen(PORT, () => {
  console.log(`The project is running on PORT ${PORT}.`);
});
