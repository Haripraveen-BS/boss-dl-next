import {
    BaseQueryFn,
    FetchArgs,
    fetchBaseQuery,
    FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";
import { Mutex } from "async-mutex";

interface IUserWithTokens {
    accessToken: string;
    refreshToken: string;
}

const mutex = new Mutex();

const baseQuery = fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BASE_URL || "",
    prepareHeaders: (headers) => {
        const token = ""
        if (token) {
            headers.set("authorization", `Bearer ${token}`);
        }
        return headers;
    },
});

export const baseQueryWithReauth: BaseQueryFn<
    string | FetchArgs,
    unknown,
    FetchBaseQueryError
> = async (args, api, extraOptions) => {
    await mutex.waitForUnlock();
    let result = await baseQuery(args, api, extraOptions);

    if (result.error && result.error.status === 401) {
        if (!mutex.isLocked()) {
            const release = await mutex.acquire();
            try {
                const refreshToken = "";

                if (refreshToken) {
                    // try to get a new token
                    const refreshResult: any  = await baseQuery(
                        {
                            url: "/auth/refreshToken",
                            method: "POST",
                            body: { refreshToken },
                        },
                        api,
                        extraOptions
                    )
                }
            } catch (error) {
                console.log(error);

            } finally {
                release();
            }
        }
        console.log(args, api, extraOptions, "base");

        // retry the initial query
        result = await baseQuery(args, api, extraOptions);
    }
    return result;
};