import express, { Application, Request, Response, NextFunction } from "express";
import dbConnect from "./db";
import dotenv from "dotenv";
import token from "./router/temporarytoken";
import bodyParser from "body-parser";
import routes from "./router/routes"
 import {CONFIG} from '../src/config/config'
import { logger } from "./logger/logger";
import { exceptionHandlerMiddleware } from "./middleware/exceptionHandlerMiddleware";
const app: Application = express();


app.use(express.json());
dotenv.config();

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());



app.use("/token", token);
app.use("/api/", routes);

// Register the exception handler middleware
app.use(exceptionHandlerMiddleware);
//FEEDBACK - the port should be brought from the config. I don't see the config folder and file to read configs
const PORT = CONFIG.port;
//FEEDBACK- TO START THE SERVER AFTER SUCCESSFULL CONNECTION TO Database
dbConnect().then(() => {
  app.listen(PORT, () => {
      logger.info(`The project is running on PORT ${PORT}.`);
  });
}).catch(()=>logger.info("error while connection db"));