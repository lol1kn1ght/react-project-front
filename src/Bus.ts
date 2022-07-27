type events_type = "login" | "logout";
type event_callback_type = (...args: any) => any;

export class EventBus {
  private _events_list: {
    [event_name in events_type]?: event_callback_type[];
  } = {};

  addEventListener(event_name: events_type, callback: event_callback_type) {
    const current_event_list = this._events_list[event_name] || [];

    current_event_list.push(callback);
    this._events_list[event_name] = current_event_list;
  }

  emit(event_name: events_type, ...args: any) {
    const callbacks_arr = this._events_list[event_name];

    if (!callbacks_arr) return;

    for (const callback of callbacks_arr) {
      callback(args);
    }
  }
}
