import React from "react";

import { loading_plate } from "./tools/loading";
import { api_login_type, api_user_data_type } from "types";

import crypto from "crypto-js";
import { Navigate } from "react-router-dom";
import { authorise_member } from "functions/authorise_member";

export class Login extends React.Component {
  state: Readonly<{
    user?: api_user_data_type;
  }> = {};

  async componentDidMount() {
    const hash_data_arr = window.location.hash.split("&").map((hash) => {
      const hash_arr = hash.replace("#", "").split("=");

      return { [hash_arr[0]]: hash_arr[1] };
    }) as api_login_type[];

    const req_data: api_login_type = {
      token_type: "",
      access_token: "",
    };

    for (const hash of hash_data_arr) {
      const key = Object.keys(hash)[0];
      if (key in req_data)
        req_data[key as keyof typeof req_data] = hash[key as keyof typeof hash];
    }

    await this.authorise(req_data);
  }

  async authorise(data: api_login_type) {
    const authorised_data = await authorise_member(data);

    if (authorised_data)
      this.setState({
        user: authorised_data.db_user_data,
      });
  }

  render(): React.ReactNode {
    if (this.state.user) {
      return <Navigate replace to='/dashboard' />;
    } else {
      return <>{loading_plate}</>;
    }
  }

  decrypt_data<Data extends string>(hash: Data) {
    const bytes = crypto.AES.decrypt(hash, process.env.REACT_APP_HASH_KEY);
    const decryptedData = JSON.parse(bytes.toString(crypto.enc.Utf8));

    return decryptedData;
  }
}
