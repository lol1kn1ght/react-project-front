import axios, { AxiosError } from "axios";
import { unauthorise_member } from "functions/unauthorise_member";
import React from "react";
import { api_guild_type } from "types";
import { loading_plate } from "./tools/loading";

import { Navigate } from "react-router-dom";
import { Error } from "./tools/error";

type state_type = Partial<{
  guilds: api_guild_type[];
  redirect: string;
  error: string;
}>;
export class Dashboard extends React.Component {
  state: state_type = {};

  async componentDidMount() {
    const session_id = window.localStorage.getItem("session_id");

    console.log(session_id);

    if (!session_id) {
      unauthorise_member();
      return;
    }
    const response = await axios
      .get("https://localhost:3001/api/guilds", {
        headers: {
          authorisation: session_id,
        },
      })
      .catch((err) => {
        const error = err as AxiosError;
        console.log(error);

        if (error.code === "401") {
          unauthorise_member();
          return;
        }

        return undefined;
      });

    if (!response)
      this.setState({
        error:
          "При попытке связаться с сервером произошла ошибка! Попробуйте снова чуть позже.",
      });
  }

  render() {
    if (this.state.redirect)
      return <Navigate replace to={this.state.redirect} />;
    if (this.state.error) {
      return <>{<Error error={this.state.error} />}</>;
    }
    if (!this.state.guilds) return <>{loading_plate}</>;

    return <>Test dashboard</>;
  }
}
