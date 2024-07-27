import { useMutation } from "@tanstack/react-query";
import { fetcher } from "../../helpers/fetcher";

export default function useUploadFile() {
  const { error, data, isPending, mutate } = useMutation({
    mutationFn: (body: FormData) =>
      fetcher({ url: "/files/upload", method: "POST", body }),
  });

  return {
    error,
    data,
    isPending, mutate
  };
}
