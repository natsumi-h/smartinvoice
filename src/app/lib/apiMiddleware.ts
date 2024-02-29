import { JWTPayload, JWTVerifyResult } from "jose";
import { getSession } from "./action";

export const checkIfUserIsAdmin = async () => {
  try {
    const session: JWTVerifyResult<JWTPayload> | null = await getSession();
    if (!session || session.payload.role !== "Admin") {
      throw new Error("Unauthorized");
    }
  } catch (e: any) {
    throw e;
  }
};

export const checkIfUserIsLoggedIn = async () => {
  try {
    const session: JWTVerifyResult<JWTPayload> | null = await getSession();
    if (!session) {
      throw new Error("Unauthorized");
    }
  } catch (e: any) {
    throw e;
  }
}