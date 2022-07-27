import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App";
import { BrowserRouter } from "react-router-dom";

import { EventsBus } from "Bus";
import { storage_type } from "types";
export const Bus = new EventsBus();

export const storage: storage_type = {
  user: {
    discriminator: "1061",
    flags: 560,
    id: "348038599083556864",
    username: "loli_knight",
    avatar:
      "https://images-ext-1.discordapp.net/external/-6W4njUjzMgziglsAZs-2OOS7Avs2jyL0DEhpGTABNI/%3Fsize%3D1024/https/cdn.discordapp.com/avatars/348038599083556864/746fe2541b192d9d307106e94f1e6969.webp",
  },
};

setTimeout(() => Bus.emit("logout"), 5000);

Bus.addLogoutEventListener(() => {
  if (storage.user) delete storage.user;
});
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
