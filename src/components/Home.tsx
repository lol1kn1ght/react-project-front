import React from "react";
import "css/Home.css";

export class Home extends React.Component {
  render() {
    return (
      <div className='home-info-block-container'>
        <button className='default-button'>Закрыть</button>
        <div className='default-button'>Закрыть</div>
        <button className='success-button'>Сохранить</button>
        <div className='success-button'>Сохранить</div>
        <button className='dangerous-button'>Удалить</button>
        <div className='dangerous-button'>Удалить</div>
      </div>
    );
  }
}
