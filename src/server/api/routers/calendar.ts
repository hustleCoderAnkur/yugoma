import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "../trpc";

import { listEvents } from "../../services/calendar/listEvents";
import { getEvent } from "../../services/calendar/getEvent";
import { createEvent } from "../../services/calendar/createEvent";
import { updateEvent } from "../../services/calendar/updateEvent";
import { deleteEvent, deleteManyEvents } from "../../services/calendar/deleteEvent";
import { getAvailability } from "../../services/calendar/getAvailability";
import { searchEvents } from "../../services/calendar/searchEvents";
import { getEventStats } from "../../services/calendar/getEventStats";
import { getUpcomingEvents } from "../../services/calendar/getUpcomingEvents";

export const calendarRouter = createTRPCRouter({
    listEvents: publicProcedure
        .input(
            z.object({
                tenantId: z.string(),
            }),
        )
        .query(async ({ input }) => {
            return listEvents(input.tenantId);
        }),

    getEvent: publicProcedure
        .input(
            z.object({
                tenantId: z.string(),
                eventId: z.string(),
            }),
        )
        .query(async ({ input }) => {
            return getEvent(
                input.tenantId,
                input.eventId,
            );
        }),

    createEvent: publicProcedure
        .input(
            z.object({
                tenantId: z.string(),
                summary: z.string(),
                description: z.string().optional(),
                location: z.string().optional(),

                start: z.object({
                    dateTime: z.string(),
                    timeZone: z.string().optional(),
                }),

                end: z.object({
                    dateTime: z.string(),
                    timeZone: z.string().optional(),
                }),
            }),
        )
        .mutation(async ({ input }) => {
            return createEvent(input.tenantId, input);
        }),

    updateEvent: publicProcedure
        .input(
            z.object({
                tenantId: z.string(),
                eventId: z.string(),

                summary: z.string().optional(),
                description: z.string().optional(),
                location: z.string().optional(),

                start: z
                    .object({
                        dateTime: z.string(),
                        timeZone: z.string().optional(),
                    })
                    .optional(),

                end: z
                    .object({
                        dateTime: z.string(),
                        timeZone: z.string().optional(),
                    })
                    .optional(),
            }),
        )
        .mutation(async ({ input }) => {
            return updateEvent(input.tenantId, input);
        }),

    deleteEvent: publicProcedure
        .input(
            z.object({
                tenantId: z.string(),
                eventId: z.string(),
            }),
        )
        .mutation(async ({ input }) => {
            return deleteEvent(
                input.tenantId,
                input.eventId,
            );
        }),
    
    getAvailability: publicProcedure
        .input(
            z.object({
                tenantId: z.string(),
                timeMin: z.string(),
                timeMax: z.string(),
                timeZone: z.string().optional(),
                items: z.array(
                    z.object({
                        id: z.string(),
                    }),
                ).optional(),
            }),
        )
        .query(async ({ input }) => {
            return getAvailability(input.tenantId, {
                timeMin: input.timeMin,
                timeMax: input.timeMax,
                timeZone: input.timeZone,
                items: input.items,
            });
        }),

    deleteManyEvents: publicProcedure
        .input(
            z.object({
                tenantId: z.string(),
                eventIds: z.array(z.string()),
            }),
        )
        .mutation(async ({ input }) => {
            return await deleteManyEvents(
                input.tenantId,
                input.eventIds,
            );
        }),
    
    searchEvents: publicProcedure
        .input(
            z.object({
                tenantId: z.string(),
                query: z.string(),
            }),
        )
        .query(async ({ input }) => {
            return await searchEvents(
                input.tenantId,
                input.query,
            );
        }),
    
    getEventStats: publicProcedure
        .input(
            z.object({
                tenantId: z.string(),
            }),
        )
        .query(async ({ input }) => {
            return await getEventStats(
                input.tenantId,
            );
        }),
    
    getUpcomingEvents: publicProcedure
        .input(
            z.object({
                tenantId: z.string(),
                limit: z.number().optional(),
            }),
        )
        .query(async ({ input }) => {
            return await getUpcomingEvents(
                input.tenantId,
                input.limit,
            );
        }),
});