import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { loading_plate } from "components/tools/loading";
import { decrypt } from "functions/decrypt";
import { session_id_type } from "types";
import { authorise_member } from "functions/authorise_member";

import { Header } from "./components/Header";
import { Home } from "components/Home";
import { Login } from "components/Login";
import { Dashboard } from "components/Dashboard";
import { Bus } from "index";
import { Error } from "components/tools/error";

const session_id = window.localStorage.getItem("session_id");

type state_type = Partial<{
  loading: boolean;
  redirect: string;
  error: undefined | string;
}>;

let redirect: string | undefined;

export class App extends React.Component {
  state: state_type = {
    loading: true,
  };

  async componentDidMount() {
    console.log("mount");

    Bus.addLogoutEventListener(() => {
      redirect = "/";
      this.setState({});
    });

    if (!session_id) {
      this.setState({
        loading: false,
      });
      return;
    }

    const decrypted_session_id = decrypt<session_id_type>(session_id);

    if (!decrypted_session_id) {
      window.localStorage.removeItem("session_id");
      this.setState({
        loading: false,
      });

      return;
    }

    const { expired_at, token } = decrypted_session_id;

    if (!token || !expired_at) {
      window.localStorage.removeItem("session_id");
      this.setState({
        loading: false,
      });
      return;
    }

    if (expired_at < new Date().getTime()) {
      window.localStorage.removeItem("session_id");
      this.setState({
        loading: false,
      });
      return;
    }

    const authorise_data = await authorise_member({
      access_token: token,
      token_type: "Bearer",
    });

    if (!authorise_data) {
      this.setState({
        loading: false,
        error:
          "При попытке получить информацию об аккаунте произошла ошибка. Попробуйте позже.",
      });
      return;
    }

    this.setState({
      loading: false,
    });
    return;
  }

  render() {
    if (redirect) {
      const redirect_plate = <Navigate replace to={redirect} />;
      redirect = undefined;
      console.log(redirect);

      return redirect_plate;
    }

    if (this.state.loading)
      return <div className='content-container'>{loading_plate}</div>;

    if (this.state.error)
      return (
        <div className='content-container'>
          <Error error={this.state.error} />
        </div>
      );

    return (
      <div className='App'>
        <div className='navigate-menu-container'>
          <Header />
        </div>
        <div className='content-container'>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login/result' element={<Login />} />
            <Route path='/dashboard' element={<Dashboard />} />
          </Routes>
        </div>
      </div>
    );
  }
}
