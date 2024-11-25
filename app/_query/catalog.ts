import { AxiosError } from "axios";
import { useAxios } from "../_hooks/useAxios";
import { CatalogData, SearchParam } from "../_interfaces/catalog";
import { ListData } from "../_interfaces/common";
import { ApiError } from "next/dist/server/api-utils";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { apiHost } from "../_constants/host";
import  qs from "qs";

export const useCatalogListQuery = ({
    page,
    size
}: SearchParam) => {
    const axios = useAxios();

    return useQuery<ListData<CatalogData>, AxiosError<ApiError>>(
        ["catalog/list", page, size],
        async () => {
          const query = qs.stringify({
            page: page,
            size: size
          });
    
          const res = await axios.request<ListData<CatalogData>>({
            url: `${apiHost}/steam-app/list?${query}`,
            method: "GET",
          });
          return res.data;
        }
      );
}

export const useCatalogLikeMutation = () => {
  const axios = useAxios();
  const queryClient = useQueryClient();
  return useMutation<unknown, AxiosError<ApiError>, { appId: string; liked: boolean }>(async (params) => {
    const res = await axios.request<ListData<CatalogData>>({
      url: `${apiHost}/vote/like`,
      method: "PUT",
      data: params
    });
    return res;
  },
  {
    onSuccess: () => {
      setTimeout(()=> {            
        queryClient.invalidateQueries("catalog/list");
      }, 100);
    },
    onError: (e) => {
      alert(e.response?.data.message);
      queryClient.invalidateQueries("catalog/list");
    },
  }
);
}