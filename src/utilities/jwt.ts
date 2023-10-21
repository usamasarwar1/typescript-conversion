import jwt, { JwtPayload } from "jsonwebtoken";
import jwt_decode from "jwt-decode";

const verifyJwtToken = async (token: string) => {
  return jwt.verify(token, process.env.SECERT_KEY || "my-secret-key");
};

const getTokenFromRequest = (bearerToken: string): string => {
  bearerToken = String(bearerToken).split(" ")[1];
  return bearerToken;
};

const decode = (
  token: string,
  fields?: boolean,
): JwtPayload | { [key: string]: any } => {
  const decoded = jwt_decode<JwtPayload>(token);
  if (fields) {
    const { fields, ...rest } = decoded;
    return fields;
  }
  return decoded;
};

export { verifyJwtToken, decode, getTokenFromRequest };
