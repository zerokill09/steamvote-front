"use client";

import {
  AppBar,
  Box,
  Button,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import { FormEvent, useState } from "react";
import jwt from "jsonwebtoken";
import useAuth from "../_hooks/useAuth";
import { useCookies } from "react-cookie";

export default function LoginForm() {
  const [userId, setUserId] = useState("");
  const [pwd, setPwd] = useState("");
  const { login, logOut } = useAuth();
  const [cookies] = useCookies(["accessToken"]);

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const res = await login(userId, pwd);
      console.log(res);
      location.reload();
    } catch (error: unknown) {
      console.log(error);
      alert("로그인에 실패하였습니다.");
    }
  };

  const handleLogout = () => {
    logOut();
    location.reload();
  };

  if (cookies.accessToken) {
    const accessToken = cookies.accessToken;
    const decodedToken: jwt.JwtPayload =
      accessToken != null && accessToken != ""
        ? (jwt.decode(accessToken.replace("bearer ", "")) as jwt.JwtPayload)
        : {};

    return (
      <AppBar position="static" sx={{ marginBottom: 3 }}>
        <Toolbar>
          <Typography variant="body1" component="div" sx={{ flexGrow: 1 }}>
            {decodedToken.login_id} 님, 환영합니다.
          </Typography>
          <Button
            size="small"
            color="inherit"
            onClick={handleLogout}
            sx={{ fontSize: 16, fontWeight: 700 }}
          >
            로그아웃
          </Button>
        </Toolbar>
      </AppBar>
    );
  }

  return (
    <AppBar position="static" sx={{ marginBottom: 3 }}>
      <form
        onSubmit={(e) => {
          handleLogin(e);
        }}
      >
        <Toolbar>
          <Box sx={{ flexGrow: 11 }}></Box>
          <Box sx={{ flexGrow: 0 }}>
            <TextField
              variant="outlined"
              placeholder="아이디"
              onChange={(e) => setUserId(e.target.value)}
              sx={{
                marginRight: 2,
                background: "#fff",
                borderRadius: 2,
                "& .MuiInputBase-input": {
                  padding: 1,
                },
              }}
            />
            <TextField
              variant="outlined"
              placeholder="비밀번호"
              type="password"
              onChange={(e) => setPwd(e.target.value)}
              sx={{
                marginRight: 1,
                background: "#fff",
                borderRadius: 2,
                "& .MuiInputBase-input": {
                  padding: 1,
                },
              }}
            />
          </Box>
          <Button
            type="submit"
            size="small"
            color="inherit"
            sx={{ fontSize: 16, fontWeight: 700 }}
          >
            로그인
          </Button>
        </Toolbar>
      </form>
    </AppBar>
  );
}
