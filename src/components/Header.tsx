import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import "../css/Header.css";
import { Bus } from "index";

import { storage } from "index";

export class Header extends React.Component {
  componentDidMount() {
    Bus.addLogoutEventListener(() => {
      this.setState({});
    });

    Bus.addLoginEventListener(() => {
      this.setState({});
    });
  }

  render() {
    const user_data = storage.api_user;
    let user_place: JSX.Element | undefined;

    if (user_data) {
      const avatar_url = `https://cdn.discordapp.com/avatars/${user_data.id}/${user_data.avatar}`;

      user_place = (
        <>
          <img
            src={avatar_url}
            alt='Аватар пользователя'
            className='header-user-avatar'
          />
          <div className='header-user-username'>
            {user_data.username}#{user_data.discriminator}
          </div>
        </>
      );
    } else {
      user_place = (
        <a
          href={process.env.REACT_APP_AUTHORISE_URL}
          className='header-navigate-button'>
          Авторизоваться
        </a>
      );
    }

    return (
      <header>
        <div className='header-navigate-buttons-container'>
          <div className='header-logo-place'>
            <div className='header-navigate-button'>
              <Link
                to='/'
                className='header-navigate-button navigate-logo-icon'>
                ЛОГО БОТА
              </Link>
            </div>
          </div>

          <div className='header-navigate-place'>
            <div className='header-navigate-button'>
              <Link to='/' className='header-navigate-button'>
                Главная
              </Link>
            </div>
            <div className='header-navigate-button'>
              <Link to='/dashboard' className='header-navigate-button'>
                Список серверов
              </Link>
            </div>
            <div className='header-navigate-button'>
              <Link to='/help' className='header-navigate-button'>
                Помощь
              </Link>
            </div>
          </div>

          <div className='header-navigate-profile-place'>{user_place}</div>
        </div>
      </header>
    );
  }
}
