"use client"; 
import { apiHost, domainHost } from "../_constants/host";
import axios from "axios";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { redirect } from "next/navigation";


const useAuth = () => {
  const [cookies, setCookie, removeCookie] = useCookies([
    "accessToken",
    "refreshToken"
  ]);
  const [isLogin, setIsLogin] = useState(true);

  useEffect(() => {
    //cookies.accessToken && setIsLogin(true);
  }, []);

  const logOut = ({
    callBack
  }: {
    callBack?: () => void;
    url?: string;
  } = {}) => {
    removeCookie("accessToken", { path: "/" });
    removeCookie("refreshToken", { path: "/" });

    setIsLogin(false);

    if(callBack != null) callBack();
    redirect("/catalog");
  };

  const tokenRefresh = async () => {
    try {
      const res = await axios.post(`${apiHost}/auth/refresh`, {
        refreshToken: cookies.refreshToken,
        accessToken: cookies.accessToken,
      });
      if (res.data.accessToken) {
        return res.data.accessToken;
      }
    } catch (e) {
      console.log(e);
      logOut();
    }
  };

  const login = async (login: string, password: string) => {
    const res = await axios.post(`${apiHost}/user/login`, {
      userId: login,
      pwd: password,
    });
    if (res.data) {
      setCookie("accessToken", res.data, {
        path: "/",
        domain: "." + domainHost,
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
      });
      setIsLogin(true);
    }
    return res;
  };

  return {
    logOut,
    isLogin,
    login,
    tokenRefresh,
  };
};

export default useAuth;
