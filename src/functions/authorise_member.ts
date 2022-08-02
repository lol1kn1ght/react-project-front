import { api_login_type, login_response_type } from "types";
import axios from "axios";
import { Bus, storage } from "index";
import { encrypt } from "./encrypt";

export async function authorise_member(data: api_login_type) {
  const response = (await axios
    .post("https://localhost:3001/api/login", data, {
      headers: {
        authorisation: encrypt({
          expired_at: new Date().getTime() + 300000,
          token: "authorisation",
        }),
      },
    })
    .catch((err) => {
      console.log(err);
      // TODO: РЕДИРЕКТ НА ОШИБКУ
    })) as { data: login_response_type } | undefined;

  if (!response) {
    // TODO: РЕДИРЕКТ НА ОШИБКУ
    return;
  }

  const { api_user_data, db_user_data, session_id } = response.data;

  if (!api_user_data || !db_user_data || !session_id) {
    // TODO: РЕДИРЕКТ НА ОШИБКУ
    return;
  }

  storage.api_user = api_user_data;
  storage.db_user = db_user_data;

  window.localStorage.setItem("session_id", session_id);

  Bus.emit("login", {
    token: data.access_token,
    user: api_user_data,
  });

  return response.data;
}
