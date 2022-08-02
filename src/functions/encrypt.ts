import crypto from "crypto-js";

export function encrypt<T extends object>(data: T): string {
  const enc_session_id = crypto.AES.encrypt(
    JSON.stringify(data),
    process.env.REACT_APP_HASH_KEY
  ).toString();
  return enc_session_id;
}
