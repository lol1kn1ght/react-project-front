import React from "react";
import "css/error.css";
import { Link } from "react-router-dom";

type props_type = {
  error: string;
};

export class Error extends React.Component {
  constructor(public props: props_type) {
    super(props);
  }

  render() {
    const error_plate = (
      <div className='error-container'>
        <h1 className='error-title'>Произошла ошибка!</h1>
        <h3 className='error-content'>{this.props.error}</h3>
        <Link to={"/"} className='default-button'>
          Главная страница
        </Link>
      </div>
    );

    return error_plate;
  }
}
