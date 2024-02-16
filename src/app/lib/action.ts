"use server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

// export const setCookie = (jwt: string, expiryDate: string) => {
//   const date = new Date(expiryDate);
//   cookies().set("token", jwt, { expires: date, httpOnly: true });
// };

// JWTをデコード
// const decrypt = async (token: string) => {
//   const secret = process.env.SECRET;
//   if (!secret) {
//     throw new Error("SECRET is not set");
//   }
//   const decoded = jwt.verify(token, secret);
//   return decoded;
// };

// セッションを取得して、デコードして返す
export const getSession = () => {
  const session = cookies().get("token")?.value;
  if (!session) return null;

  const secret = process.env.SECRET;
  if (!secret) {
    throw new Error("SECRET is not set");
  }
  const decoded = jwt.verify(session, secret);

  return decoded;
};

export const createJWT = (payload: any) => {
  const secret = process.env.SECRET;
  if (!secret) {
    throw new Error("SECRET is not set");
  }
  return jwt.sign({ payload }, secret, { expiresIn: "24h" });
};

export const getExpiry = (token: string) => {
  const payloadBase64 = token.split(".")[1];
  const decodedJson = Buffer.from(payloadBase64, "base64").toString();
  const decoded = JSON.parse(decodedJson);
  const exp = decoded.exp;
  return exp * 1000;
};
