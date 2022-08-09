import axios, { AxiosError } from "axios";
import { unauthorise_member } from "functions/unauthorise_member";
import React from "react";
import { api_guild_type } from "types";
import { loading_plate } from "./tools/loading";
import "css/Dashboard.css";
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

    if (!response) {
      this.setState({
        error:
          "При попытке связаться с сервером произошла ошибка! Попробуйте снова чуть позже.",
      });
      return;
    }

    const guilds_data = response?.data as api_guild_type[] | undefined;
    if (!guilds_data) {
      this.setState({
        error: "При попытке получить ваши сервера произошла ошибка!",
      });
    }

    this.setState({
      guilds: guilds_data,
    });
  }

  render() {
    if (this.state.error) {
      return <>{<Error error={this.state.error} />}</>;
    }
    if (!this.state.guilds) return <>{loading_plate}</>;

    const guilds = this.state.guilds;
    const permitted_guilds = guilds.filter((guild) => guild.owner);
    const other_guilds = guilds.filter((guild) => !guild.owner);

    const sorted_guild = ([] as api_guild_type[]).concat(
      permitted_guilds,
      other_guilds
    );

    const guilds_plates = sorted_guild.map((guild) => {
      const guild_avatar_url = guild.icon
        ? `https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.webp?size=128`
        : `https://cdn-icons.flaticon.com/png/512/2582/premium/2582610.png?token=exp=1659469473~hmac=6da5ec96c02aba1e55ff93f68290526a `;

      const is_manageable = permitted_guilds.includes(guild);
      return (
        <div
          className={`guild ${is_manageable ? "manageable" : ""}`}
          key={guild.id}>
          <div className='icon-plate'>
            <img
              className='guild-icon'
              width={"64px"}
              src={guild_avatar_url}
              alt='Guild Icon'
            />
          </div>
          <div className='info-plate'>
            <div className='guild-name'>{guild.name}</div>
          </div>
        </div>
      );
    });

    return (
      <div className='dashboard-container'>
        <h1 className='dashboard-title'>Ваши сервера:</h1>
        <div className='guilds-container'>{guilds_plates}</div>
      </div>
    );
  }
}
