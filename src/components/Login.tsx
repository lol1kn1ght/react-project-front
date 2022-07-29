import React from "react";
import { Bus } from "index";
import { loading_plate } from "./tools/loading";
import { api_user_data_type } from "types";
import axios from "axios";
import crypto from "crypto-js";

(window as any).process = {};

type hash_data_type = {
  token_type: string;
  access_token: string;
  expires_in: string;
  scope: string;
};

export class Login extends React.Component {
  state: Readonly<{
    user?: api_user_data_type;
  }> = {};
  async componentDidMount() {
    const hash_data_arr = window.location.hash.split("&").map((hash) => {
      const hash_arr = hash.replace("#", "").split("=");

      return { [hash_arr[0]]: hash_arr[1] };
    }) as hash_data_type[];

    const hash_data: hash_data_type = {
      token_type: "",
      access_token: "",
      expires_in: "",
      scope: "",
    };

    for (const hash of hash_data_arr) {
      const key = Object.keys(hash)[0];
      hash_data[key as keyof typeof hash_data] = hash[key as keyof typeof hash];
    }

    const authorise_data = await this.authorise(hash_data);
    console.log(authorise_data);
  }

  async authorise(data: hash_data_type) {
    const encrypted_data = this.ecnrypt_data(JSON.stringify(data));
    const response = await axios.post("http://localhost:3001/api/login", {
      encrypted_data,
    });

    console.log(response);
  }

  render(): React.ReactNode {
    return <>{loading_plate}</>;
  }

  ecnrypt_data<Data extends string>(data: Data) {
    const ecnrypted_data = crypto.AES.encrypt(
      data,
      process.env.REACT_APP_HASH_KEY
    ).toString();
    return ecnrypted_data;
  }
}
