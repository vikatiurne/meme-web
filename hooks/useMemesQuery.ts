import { ErrorResponse, IMeme } from "@/types";
import { fetchMemes } from "@/utils/api";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

const useMemesQueryOptions = () => {
  return {
    queryKey: ["memes"],
    queryFn: fetchMemes,
  };
};

export const useMemesQuery = () =>
  useQuery<IMeme[], AxiosError<ErrorResponse>>(useMemesQueryOptions());
