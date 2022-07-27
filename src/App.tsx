import React from "react";
import { Header } from "./components/Header";
import { Routes, Route } from "react-router-dom";
import { Home } from "components/Home";

function App() {
  return (
    <div className='App'>
      <div className='navigate-menu-container'>
        <Header />
      </div>
      <div className='content-container'>
        <Routes>
          <Route path='/' element={<Home />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
