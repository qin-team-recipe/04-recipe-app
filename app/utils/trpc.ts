import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";
import type { AppRouter } from "@/server/trpc/router";
import { headers } from "next/headers";

const API_URL = process.env.API_URL ?? "http://localhost:3000";

export const trpcClient = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: `${API_URL}/api/trpc`,
      headers() {
        // 参考: https://github.com/trpc/trpc/blob/fe3dcf1d9f6512724c292311f5006607b09e8056/examples/.experimental/next-app-dir/src/trpc/server.ts
        const newHeaders = new Map(headers());

        // If you're using Node 18 before 18.15.0, omit the "connection" header
        newHeaders.delete("connection");

        // `x-trpc-source` is not required, but can be useful for debugging
        newHeaders.set("x-trpc-source", "rsc");

        // Forward headers from the browser to the API
        return Object.fromEntries(newHeaders);
      },
      fetch(url, options) {
        return fetch(url, {
          ...options,
          credentials: "include",
        });
      },
    }),
  ],
});
