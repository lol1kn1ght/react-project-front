import { api_login_type, login_response_type } from "types";
import axios from "axios";
import { Bus, storage } from "index";
import { encrypt } from "./encrypt";

export async function authorise_member(
  data: api_login_type
): Promise<login_response_type | undefined> {
  const local_session_id =
    window.localStorage.getItem("session_id") ||
    encrypt({
      expired_at: new Date().getTime() + 300000,
      token: "authorisation",
    });

  console.log("authorise: " + local_session_id);

  const response = (await axios
    .post("https://localhost:3001/api/login", data, {
      headers: {
        authorisation: local_session_id,
      },
    })
    .catch((err) => {
      console.log(err);
      return undefined;
    })) as { data: login_response_type } | undefined;

  if (!response) {
    return undefined;
  }

  const { api_user_data, db_user_data, session_id } = response.data;

  if (!api_user_data || !db_user_data || !session_id) {
    return undefined;
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
