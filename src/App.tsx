import React from "react";
import { Header } from "./components/Header";
import { Routes, Route } from "react-router-dom";
import { Home } from "components/Home";
import { Login } from "components/Login";

export class App extends React.Component {
  render() {
    return (
      <div className='App'>
        <div className='navigate-menu-container'>
          <Header />
        </div>
        <div className='content-container'>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login/result' element={<Login />} />
          </Routes>
        </div>
      </div>
    );
  }
}
