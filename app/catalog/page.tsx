"use client";

import Grid from "@mui/material/Grid2";
import { CatalogData, SearchParam } from "../_interfaces/catalog";
import { useCatalogLikeMutation, useCatalogListQuery } from "../_query/catalog";
import Image from "next/image";
import { LinearProgress, Pagination, Stack, Typography } from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import { useState } from "react";
import useAuth from "../_hooks/useAuth";

export default function CatalogList() {
  const defaultParam = new SearchParam();
  const [searchParam, setSearchParam] = useState(defaultParam);
  const { data } = useCatalogListQuery(searchParam);
  const { mutateAsync: likeMutateAsync } = useCatalogLikeMutation();
  const { isLogin } = useAuth();

  const handlePage = (event: unknown, value: number) => {
    setSearchParam((searchParam) => ({
      ...searchParam,
      page: value,
    }));
  };

  const handleLike = (appId: number, liked: boolean) => {
    if (isLogin) {
      likeMutateAsync({ appId: appId as unknown as string, liked });
    } else {
      alert("로그인 해야 가능합니다.");
    }
  };

  return (
    <>
      <Grid container spacing={2}>
        {data?.content.map((item: CatalogData) => (
          <Grid key={item.appId} size={3}>
            <div
              style={{
                position: "relative",
                width: "100%",
                aspectRatio: "16/9",
              }}
            >
              <Image src={item.thumbnail} alt={item.name} fill />
            </div>
            <LinearProgress
              variant="determinate"
              value={
                item.disliked + item.liked > 0
                  ? (item.liked / (item.disliked + item.liked)) * 100
                  : 0
              }
              sx={{
                marginTop: 0.5,
                backgroundColor:
                  item.disliked + item.liked > 0 ? "#ff5757" : "#ddd",
              }}
            />
            <Grid container>
              <Grid size={6}>
                <ThumbUpIcon
                  sx={{
                    fontSize: 14,
                    color: item.isLiked == true ? "#1976d2" : "#ddd",
                    cursor: "pointer",
                  }}
                  onClick={() => handleLike(item.appId, true)}
                />
              </Grid>
              <Grid size={6} sx={{ textAlign: "right" }}>
                <ThumbDownIcon
                  sx={{
                    fontSize: 14,
                    color: item.isLiked == false ? "#ff5757" : "#ddd",
                    cursor: "pointer",
                  }}
                  onClick={() => handleLike(item.appId, false)}
                />
              </Grid>
            </Grid>
            <Typography variant="body2">{item.name}</Typography>
          </Grid>
        ))}

        <Stack alignItems="center" sx={{ width: "100%", marginTop: 5 }}>
          <Pagination
            count={data?.totalPages}
            page={searchParam.page}
            siblingCount={3}
            onChange={handlePage}
            shape="rounded"
          />
        </Stack>
      </Grid>
    </>
  );
}
