import { Bus, storage } from "index";

export async function unauthorise_member() {
  delete storage.api_user;
  delete storage.db_user;

  window.localStorage.removeItem("session_id");

  Bus.emit("logout");
}
