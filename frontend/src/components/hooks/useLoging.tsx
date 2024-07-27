import { useMutation } from "@tanstack/react-query";

import { fetcher } from "../../helpers/fetcher";

export default function useLoging() {
    const { data, error, isPending, mutate } = useMutation({
        mutationFn: (body: string) =>
            fetcher({ url: "/auth/login", method: "POST", body }),
    })

    return {
        data,
        error,
        isPending, mutate
    }
}