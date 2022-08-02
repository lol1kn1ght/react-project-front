import ReactDOM from "react-dom/client";
import { App } from "./App";
import { BrowserRouter } from "react-router-dom";
import { EventsBus } from "Bus";
import { storage_type } from "types";

export const Bus = new EventsBus();
export const storage: storage_type = {};

Bus.addLogoutEventListener(() => {
  if (storage.db_user) delete storage.db_user;
});
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
