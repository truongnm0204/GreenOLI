import config from "@payload-config";
import { getPayload } from "payload";

/**
 * Singleton Payload Local API client.
 * Dùng ở server components / route handlers để query DB trực tiếp
 * (không qua HTTP), hợp môi trường serverless Vercel.
 */
export const getPayloadClient = async () => getPayload({ config });
