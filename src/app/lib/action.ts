"use server";
import { cookies } from "next/headers";
import { jwtVerify, SignJWT, decodeJwt, JWTPayload } from "jose";
import { User } from "@prisma/client";

export const getSession = async () => {
  const session = cookies().get("token")?.value;
  if (!session) return null;
  const secret = process.env.SECRET;
  if (!secret) {
    throw new Error("SECRET is not set");
  }
  const encoder = new TextEncoder();
  const encodedSecret = encoder.encode(secret);
  const decoded = await jwtVerify(session, encodedSecret);
  if (!decoded) {
    cookies().set("token", "", { expires: new Date(0) });
    return null;
  }
  return decoded;
};

type Payload = {
  email: User["email"];
  role: User["role"];
  name: User["name"];
  id: User["id"];
  company: User["company_id"];
};

export const createJWT = async (payload: Payload) => {
  const secret = process.env.SECRET;
  if (!secret) {
    throw new Error("SECRET is not set");
  }
  const encodedSecret = new TextEncoder().encode(secret);
  const jwt = await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    // .setIssuer("urn:example:issuer")
    // .setAudience("urn:example:audience")
    .setExpirationTime("24h")
    .sign(encodedSecret);
  return jwt;
};

export const getExpiry = (token: string) => {
  const decoded: JWTPayload = decodeJwt(token);
  if(!decoded.exp) throw new Error("Token has no expiry");
  return decoded.exp * 1000;
};
