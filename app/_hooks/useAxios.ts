"use client";

import axios from "axios";
import { useCookies } from "react-cookie";

let refreshingFunc: unknown = undefined;

export const useAxios = () => {
  const instance = axios.create();
  const [cookies] = useCookies([
    "accessToken",
    "refreshToken",
    "id",
  ]);

  instance.interceptors.request.use(async (config) => {
    config.headers["Authorization"] = cookies.accessToken || "";
    config.headers["Cache-Control"] = "no-store"; // 'Cache-Control' 헤더 추가
    return config;
  });

  instance.interceptors.response.use(
    (res) => res,
    async (error) => {
      if (error.response && error.response.status) {
        switch (error.response.status) {
          case 401: {
            try {
              //if (!refreshingFunc) refreshingFunc = tokenRefresh();

              const accessToken = await refreshingFunc;
              if (accessToken) {
                error.config.headers.Authorization = accessToken;
                return axios(error.config);
              }
            } catch (err) {
              return Promise.reject(err);
            } finally {
              refreshingFunc = null;
            }
          }
          case 403: {
          }

          default:
            return Promise.reject(error);
        }
      }
      return Promise.reject(error);
    }
  );

  return instance;
};