declare global {
  namespace NodeJS {
    interface ProcessEnv {
      REACT_APP_AUTHORISE_URL: string;
    }
  }
}

export {};
