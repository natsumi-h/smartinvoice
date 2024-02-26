import { JWTPayload, JWTVerifyResult } from "jose";
import { getSession } from "./action";

export const checkIfUserIsAdmin = async () => {
  try {
    console.log("checkIfUserIsAdmin");
    const session: JWTVerifyResult<JWTPayload> | null = await getSession();
    if (!session || session.payload.role !== "Admin") {
      throw new Error("Unauthorized");
    }
  } catch (e: any) {
    console.error(e.message);
    throw e;
  }
};

export const checkIfUserIsLoggedIn = async () => {
  try {
    console.log("checkIfUserIsLoggedIn");
    const session: JWTVerifyResult<JWTPayload> | null = await getSession();
    if (!session) {
      throw new Error("Unauthorized");
    }
  } catch (e: any) {
    console.error(e.message);
    throw e;
  }
}