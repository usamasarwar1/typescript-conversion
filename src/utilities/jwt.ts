import jwt, { JwtPayload } from "jsonwebtoken";
import jwtDecode from "jwt-decode";

interface DecodedToken extends JwtPayload {
  fields?: boolean;
}

const verifyJwtToken = async (token: string): Promise<JwtPayload> => {
  return jwt.verify(
    token,
    process.env.SECRET_KEY || "my-secret-key"
  ) as JwtPayload;
};

const getTokenFromRequest = (bearerToken: string): string => {
  const [, token] = String(bearerToken).split(" ");
  return token || "";
};

const decode = (token: string, fields?: boolean): DecodedToken => {
  const decoded = jwtDecode<JwtPayload>(token);
  if (fields) {
    const { fields, ...rest } = decoded;
    return { fields };
  }
  return decoded;
};

export { verifyJwtToken, decode, getTokenFromRequest };
