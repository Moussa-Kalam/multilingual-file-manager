import { useMutation } from "@tanstack/react-query";

import { fetcher } from "../../helpers/fetcher";
import { User } from "../../api";

export default function useLoging() {
    const { data, error, isPending, mutate } = useMutation<{ user: User, token: string }, { errorMessage: string }, string>({
        mutationFn: (body: string) =>
            fetcher({ url: "/auth/login", method: "POST", body }),
    })

    return {
        data,
        error,
        isPending, mutate
    }
}