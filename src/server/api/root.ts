import { gmailRouter } from "~/server/api/routers/gmail";
import { calendarRouter } from "~/server/api/routers/calendar";
import { createCallerFactory, createTRPCRouter } from "~/server/api/trpc";
import { agentRouter } from "./routers/agent";
import { authRouter } from "@/server/api/routers/auth";

export const appRouter = createTRPCRouter({
  gmail: gmailRouter,
  calendar: calendarRouter,
  agent: agentRouter,
  auth: authRouter
});

export type AppRouter = typeof appRouter;

export const createCaller = createCallerFactory(appRouter);