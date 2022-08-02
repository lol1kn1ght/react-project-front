import crypto from "crypto-js";

export function decrypt<T extends object>(hash: string): T | undefined {
  try {
    const bytes = crypto.AES.decrypt(hash, process.env.REACT_APP_HASH_KEY);
    const decryptedData = JSON.parse(bytes.toString(crypto.enc.Utf8));

    return decryptedData as T;
  } catch (err) {
    return undefined;
  }
}
