import { login_data_type } from "types";

type event_callback<Event = undefined> = (data: Event) => any;
type events_list_type = {
  login: event_callback<login_data_type>[];
  logout: event_callback[];
};

export class EventsBus {
  private _events_list: events_list_type = {
    login: [],
    logout: [],
  };

  addLoginEventListener(callback: event_callback<login_data_type>) {
    const login_events = this._events_list.login;

    login_events.push(callback);
  }

  addLogoutEventListener(callback: event_callback) {
    const logout_events = this._events_list.logout;

    logout_events.push(callback);
  }

  emit(event_name: "logout"): void;
  emit(event_name: "login", data: login_data_type): void;
  emit(event_name: "login" | "logout", data?: login_data_type) {
    if (event_name === "login") {
      const callbacks_list = this._events_list.login;

      for (const callback of callbacks_list) {
        if (data) callback(data);
      }
    }

    if (event_name === "logout") {
      const callbacks_list = this._events_list.logout;

      for (const callback of callbacks_list) {
        callback(undefined);
      }
    }
  }
}
