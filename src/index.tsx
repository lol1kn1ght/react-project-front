import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { EventBus } from "Bus";
import { api_user_data_type } from "types";

const bus = new EventBus();
bus.addEventListener("login", (data: api_user_data_type) => {
  console.log("ЛОГИН ПРОИЗОШЕЛ");
});
console.log("слушатель навешан");

bus.emit("login", { test: 50 });
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
