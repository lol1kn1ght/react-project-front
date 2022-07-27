import React from "react";
import { Bus } from "index";
import { loading_plate } from "./tools/loading";
import { api_user_data_type } from "types";

export class Login extends React.Component {
  state: Readonly<{
    user?: api_user_data_type;
  }> = {};
  async componentDidMount() {
    const code = window.location.search.split("=")[1];
  }

  render(): React.ReactNode {
    return <>{loading_plate}</>;
  }
}
