declare global {
  namespace NodeJS {
    interface ProcessEnv {
      REACT_APP_AUTHORISE_URL: string;
      REACT_APP_HASH_KEY: string;
    }
  }
}

declare module "*.jpg";
declare module "*.png";

export {};
