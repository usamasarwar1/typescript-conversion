// Example route for generating a temporary JWT token
import dotenv from "dotenv";
dotenv.config();
import express from "express";
import jwt from "jsonwebtoken";
const token = express.Router();

token.post("/generate-token", (req: any, res: any) => {
  const secretKey = process.env.SECRET_KEY || "my-secret-key";

  const user = { id: "633a799bae95cbe9757e49f8" };
  const token = jwt.sign(user, secretKey, { expiresIn: "1d" }); // Token expires in 1  day
  res.json({ token });
});

export default token;
