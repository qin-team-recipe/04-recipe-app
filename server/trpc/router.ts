import { publicProcedure, router } from "./init-trpc";

const healthCheck = publicProcedure.query(() => ({ status: "Running" }));

export const appRouter = router({
  health: healthCheck,
});

export type AppRouter = typeof appRouter;
