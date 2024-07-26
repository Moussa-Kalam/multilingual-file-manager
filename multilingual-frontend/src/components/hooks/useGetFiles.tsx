import { useQuery } from "@tanstack/react-query";
import { fetcher } from "../../helpers/fetcher";
import { FileDto } from "../../api";
import { ErrorResponse } from "react-router-dom";

export default function useGetFiles() {
  const { data, error, isPending } = useQuery<any, ErrorResponse, FileDto[]>({
    queryKey: ["files"],
    queryFn: () => fetcher({ url: "/files" }),
  });

  return {
    data,
    error,
    isPending,
  };
}
