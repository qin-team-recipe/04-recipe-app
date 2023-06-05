import { createContext } from "@/server/trpc/init-trpc";
import { appRouter } from "@/server/trpc/router";
import { fetchRequestHandler } from "@trpc/server/adapters/fetch";

// 参考:
// - https://trpc.io/docs/server/adapters/fetch#nextjs-edge-runtime
// - https://nextjs.org/docs/app/building-your-application/routing/router-handlers
function handler(request: Request) {
  return fetchRequestHandler({
    endpoint: "/api/trpc",
    req: request,
    router: appRouter,
    createContext,
  });
}

export const GET = handler;
export const POST = handler;
