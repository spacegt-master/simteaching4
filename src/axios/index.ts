import { useAccountStore } from "@/stores/account";
import { notify } from "@kyvg/vue3-notification";
import axios from "axios";

const service = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_SERVER,
  withCredentials: false,
  timeout: 0,
});

service.interceptors.request.use(
  (config) => {
    const accountStore = useAccountStore();
    config.headers["x-token"] = accountStore.token;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

service.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    if (error.status == 401) {
      notify({
        title: "安全",
        text: "未经授权请重新登录后尝试",
        type: "info",
        duration: 9000000,
        data: {
          icon: "mdi-alert-circle",
        },
      });
      const accountStore = useAccountStore();
      accountStore.logout();
    }
    return Promise.reject(error);
  }
);

export default service;