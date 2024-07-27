import { useMutation } from "@tanstack/react-query";

import { fetcher } from "../../helpers/fetcher";

export default function useCreateUser() {
    const { data, error, isPending, mutate } = useMutation({
        mutationFn: (body: string) =>
            fetcher({ url: "/users", method: "POST", body }),
    })

    return {
        data,
        error,
        isPending, mutate
    }
}