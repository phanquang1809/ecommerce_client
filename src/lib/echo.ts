import { authApi } from "@/services/apiServices";
import Echo from "laravel-echo";
import Pusher from "pusher-js";

declare global {
  interface Window {
    Pusher: typeof Pusher;
  }
}
window.Pusher = Pusher;

const echo = new Echo({
  broadcaster: "pusher",
  key: import.meta.env.VITE_PUSHER_APP_KEY,
  cluster: import.meta.env.VITE_PUSHER_APP_CLUSTER,
  forceTLS: true,
  authorizer: (channel) => {
    return {
      authorize: (socketId, callback) => {
        authApi
          .post("/broadcasting/auth", {
            socket_id: socketId,
            channel_name: channel.name,
          })
          .then((response) => {
            callback(null, response.data); // ✅ success
          })
          .catch((error) => {
            console.error("Echo auth error:", error); // ✅ log
            callback(error, null); // ✅ phải gọi thế này
          });
      },
    };
  },
});

export default echo;
