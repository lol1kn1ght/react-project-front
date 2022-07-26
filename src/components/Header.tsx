import React from "react";
import { Link } from "react-router-dom";
import "../css/Header.css";

export class Header extends React.Component {
  render() {
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
          <div className='header-navigate-profile-place header-navigate-button'>
            TEst placeholder
          </div>
        </div>
      </header>
    );
  }
}
