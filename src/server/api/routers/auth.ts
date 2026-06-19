
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

import { registerUser } from "@/server/services/auth/registerUser";
import { loginUser } from "@/server/services/auth/loginUser";
import { getCurrentUser } from "@/server/services/auth/getCurrentUser";
import { changePassword } from "@/server/services/auth/changePassword";
import { deleteUser } from "@/server/services/auth/deleteUser";

export const authRouter = createTRPCRouter({
  signup: publicProcedure
    .input(
      z.object({
        username: z.string().min(3),
        email: z.email(),
        password: z.string().min(8),
      })
    )
    .mutation(async ({ input }) => {
      return registerUser(input);
    }),

  login: publicProcedure
    .input(
      z.object({
        email: z.email(),
        password: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      return loginUser(input);
    }),

  me: publicProcedure
    .input(
      z.object({
        accessToken: z.string(),
      })
    )
    .query(async ({ input }) => {
      return getCurrentUser(input);
    }),
  
changePassword: publicProcedure
  .input(
    z.object({
      userId: z.string(),
      currentPassword: z.string(),
      newPassword: z.string().min(8),
    })
  )
  .mutation(async ({ input }) => {
    return changePassword(input);
  }),

  deleteAccount: publicProcedure
    .input(
      z.object({
        userId: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      return deleteUser(input);
    }),

});
