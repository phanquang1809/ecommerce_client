import { useQuery } from "@tanstack/react-query";
import {api} from "./apiServices";

export async function getHomeData() {
  const response = await api.get("/home-settings");
  return response.data;
}

export function useHome() {
  return useQuery({
    queryKey: ["homeData"],
    queryFn: getHomeData,
    staleTime: 1000 * 60 * 10, 
  });
}