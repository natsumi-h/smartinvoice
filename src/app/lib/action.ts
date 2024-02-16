"use server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export const setCookie = (jwt: string, expiryDate: string) => {
  const date = new Date(expiryDate);
  cookies().set("token", jwt, { expires: date, httpOnly: false });
};

// JWTをデコード
const decrypt = async (token: string) => {
  const secret = process.env.SECRET;
  if (!secret) {
    throw new Error("SECRET is not set");
  }
  const decoded = jwt.verify(token, secret);
  return decoded;
};

// セッションを取得して、デコードして返す
export const getSession = async () => {
  const session = cookies().get("token")?.value;
  if (!session) return null;
  return await decrypt(session);
};