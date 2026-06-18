import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "../trpc";

import { listThreads } from "../../services/gmail/listThreads";
import { getThread, getThreadStats } from "../../services/gmail/getThread";
import { getUnreadCount, searchEmails } from "../../services/gmail/searchEmails";
import { sendEmail } from "../../services/gmail/sendEmail";
import { replyEmail } from "../../services/gmail/replyEmail";
import { archiveManyThreads, archiveThread } from "../../services/gmail/archiveThread";
import { deleteEmail, deleteManyEmails } from "../../services/gmail/deleteEmail";
import { markAsRead, markManyAsRead } from "../../services/gmail/markAsRead";
import { createDraft } from "~/server/services/gmail/createDraft";
import { listDrafts } from "../../services/gmail/listDrafts";
import { getDraft } from "../../services/gmail/getDraft";
import { updateDraft } from "../../services/gmail/updateDraft";
import { sendDraft } from "../../services/gmail/sendDraft";
import { deleteDraft } from "../../services/gmail/deleteDraft";
import { listLabels } from "../../services/gmail/listLabels";
import { getLabel } from "../../services/gmail/getLabel";
import { createLabel } from "../../services/gmail/createLabel";
import { updateLabel } from "../../services/gmail/updateLabel";
import { deleteLabel } from "../../services/gmail/deleteLabel";
import { starThread, unstarThread } from "~/server/services/gmail/starThread";
import { trashThread, untrashThread } from "~/server/services/gmail/trashThread";
import { markAsSpam, removeFromSpam } from "~/server/services/gmail/spamThread";


export const gmailRouter = createTRPCRouter({
    listThreads: publicProcedure
        .input(
            z.object({
                tenantId: z.string(),
            }),
        )
        .query(async ({ input }) => {
            return listThreads(input.tenantId);
        }),

    getThread: publicProcedure
        .input(
            z.object({
                tenantId: z.string(),
                threadId: z.string(),
            }),
        )
        .query(async ({ input }) => {
            return getThread(input.tenantId, input.threadId);
        }),

    searchEmails: publicProcedure
        .input(
            z.object({
                tenantId: z.string(),
                query: z.string().optional(),
                from: z.string().optional(),
                to: z.string().optional(),
                label: z.string().optional(),
                unread: z.boolean().optional(),
                hasAttachment: z.boolean().optional(),
                newerThan: z.string().optional(),
                olderThan: z.string().optional(),
            }),
        )
        .query(async ({ input }) => {
            return await searchEmails(input.tenantId, {
                query: input.query,
                from: input.from,
                to: input.to,
                label: input.label,
                unread: input.unread,
                hasAttachment: input.hasAttachment,
                newerThan: input.newerThan,
                olderThan: input.olderThan,
            });
        }),
    
    getUnreadCount: publicProcedure
        .input(
            z.object({
                tenantId: z.string(),
            }),
        )
        .query(async ({ input }) => {
            return await getUnreadCount(input.tenantId);
        }),

    sendEmail: publicProcedure
        .input(
            z.object({
                tenantId: z.string(),
                to: z.string(),
                subject: z.string(),
                body: z.string(),
                threadId: z.string().optional(),
            }),
        )
        .mutation(async ({ input }) => {
            return sendEmail(input.tenantId, {
                to: input.to,
                subject: input.subject,
                body: input.body,
                threadId: input.threadId,
            });
        }),

    replyEmail: publicProcedure
        .input(
            z.object({
                tenantId: z.string(),
                to: z.string(),
                subject: z.string(),
                body: z.string(),
                threadId: z.string(),
            }),
        )
        .mutation(async ({ input }) => {
            return replyEmail(
                input.tenantId,
                input.to,
                input.subject,
                input.body,
                input.threadId,
            );
        }),

    archiveEmail: publicProcedure
        .input(
            z.object({
                tenantId: z.string(),
                threadId: z.string(),
            }),
        )
        .mutation(async ({ input }) => {
            return archiveThread(
                input.tenantId,
                input.threadId,
            );
        }),

    deleteEmail: publicProcedure
        .input(
            z.object({
                tenantId: z.string(),
                messageId: z.string(),
            }),
        )
        .mutation(async ({ input }) => {
            return deleteEmail(
                input.tenantId,
                input.messageId,
            );
        }),

    markAsRead: publicProcedure
        .input(
            z.object({
                tenantId: z.string(),
                messageId: z.string(),
            }),
        )
        .mutation(async ({ input }) => {
            return markAsRead(
                input.tenantId,
                input.messageId,
            );
        }),
    
    
    createDraft: publicProcedure
        .input(
            z.object({
                tenantId: z.string(),
                raw: z.string(),
            }),
        )
        .mutation(async ({ input }) => {
            return createDraft(input.tenantId, {
                raw: input.raw,
            });
        }),
    
    listDrafts: publicProcedure
        .input(
            z.object({
                tenantId: z.string(),
            }),
        )
        .query(async ({ input }) => {
            return await listDrafts(input.tenantId);
        }),
    
    getDraft: publicProcedure
        .input(
            z.object({
                tenantId: z.string(),
                draftId: z.string(),
            }),
        )
        .query(async ({ input }) => {
            return await getDraft(
                input.tenantId,
                input.draftId,
            );
        }),
    
    updateDraft: publicProcedure
        .input(
            z.object({
                tenantId: z.string(),
                draftId: z.string(),
                raw: z.string(),
                threadId: z.string().optional(),
            }),
        )
        .mutation(async ({ input }) => {
            return await updateDraft(input.tenantId, {
                draftId: input.draftId,
                raw: input.raw,
                threadId: input.threadId,
            });
        }),
    
    sendDraft: publicProcedure
        .input(
            z.object({
                tenantId: z.string(),
                draftId: z.string(),
            }),
        )
        .mutation(async ({ input }) => {
            return await sendDraft(
                input.tenantId,
                input.draftId,
            );
        }),
    
    deleteDraft: publicProcedure
        .input(
            z.object({
                tenantId: z.string(),
                draftId: z.string(),
            }),
        )
        .mutation(async ({ input }) => {
            return await deleteDraft(
                input.tenantId,
                input.draftId,
            );
        }),
    
    listLabels: publicProcedure
        .input(
            z.object({
                tenantId: z.string(),
            }),
        )
        .query(async ({ input }) => {
            return await listLabels(input.tenantId);
        }),
    
    getLabel: publicProcedure
        .input(
            z.object({
                tenantId: z.string(),
                labelId: z.string(),
            }),
        )
        .query(async ({ input }) => {
            return await getLabel(
                input.tenantId,
                input.labelId,
            );
        }),
    
    createLabel: publicProcedure
        .input(
            z.object({
                tenantId: z.string(),
                name: z.string(),
                messageListVisibility: z
                    .enum(["show", "hide"])
                    .optional(),
                labelListVisibility: z
                    .enum([
                        "labelShow",
                        "labelShowIfUnread",
                        "labelHide",
                    ])
                    .optional(),
            }),
        )
        .mutation(async ({ input }) => {
            return await createLabel(input.tenantId, {
                name: input.name,
                messageListVisibility:
                    input.messageListVisibility,
                labelListVisibility:
                    input.labelListVisibility,
            });
        }),
    
    updateLabel: publicProcedure
        .input(
            z.object({
                tenantId: z.string(),
                labelId: z.string(),
                name: z.string().optional(),
                messageListVisibility: z
                    .enum(["show", "hide"])
                    .optional(),
                labelListVisibility: z
                    .enum([
                        "labelShow",
                        "labelShowIfUnread",
                        "labelHide",
                    ])
                    .optional(),
            }),
        )
        .mutation(async ({ input }) => {
            return await updateLabel(input.tenantId, input);
        }),
    
    deleteLabel: publicProcedure
        .input(
            z.object({
                tenantId: z.string(),
                labelId: z.string(),
            }),
        )
        .mutation(async ({ input }) => {
            return await deleteLabel(
                input.tenantId,
                input.labelId,
            );
        }),
    
    archiveManyThreads: publicProcedure
        .input(
            z.object({
                tenantId: z.string(),
                threadIds: z.array(z.string()),
            }),
        )
        .mutation(async ({ input }) => {
            return await archiveManyThreads(
                input.tenantId,
                input.threadIds,
            );
        }),
    
    markManyAsRead: publicProcedure
        .input(
            z.object({
                tenantId: z.string(),
                messageIds: z.array(z.string()),
            }),
        )
        .mutation(async ({ input }) => {
            return await markManyAsRead(
                input.tenantId,
                input.messageIds,
            );
        }),
    
    deleteManyEmails: publicProcedure
        .input(
            z.object({
                tenantId: z.string(),
                messageIds: z.array(z.string()),
            }),
        )
        .mutation(async ({ input }) => {
            return await deleteManyEmails(
                input.tenantId,
                input.messageIds,
            );
        }),
    
    starThread: publicProcedure
        .input(
            z.object({
                tenantId: z.string(),
                threadId: z.string(),
            }),
        )
        .mutation(async ({ input }) => {
            return await starThread(
                input.tenantId,
                input.threadId,
            );
        }),

    unstarThread: publicProcedure
        .input(
            z.object({
                tenantId: z.string(),
                threadId: z.string(),
            }),
        )
        .mutation(async ({ input }) => {
            return await unstarThread(
                input.tenantId,
                input.threadId,
            );
        }),
    
    trashThread: publicProcedure
        .input(
            z.object({
                tenantId: z.string(),
                threadId: z.string(),
            }),
        )
        .mutation(async ({ input }) => {
            return await trashThread(
                input.tenantId,
                input.threadId,
            );
        }),

    untrashThread: publicProcedure
        .input(
            z.object({
                tenantId: z.string(),
                threadId: z.string(),
            }),
        )
        .mutation(async ({ input }) => {
            return await untrashThread(
                input.tenantId,
                input.threadId,
            );
        }),
    
    markAsSpam: publicProcedure
        .input(
            z.object({
                tenantId: z.string(),
                threadId: z.string(),
            }),
        )
        .mutation(async ({ input }) => {
            return await markAsSpam(
                input.tenantId,
                input.threadId,
            );
        }),

    removeFromSpam: publicProcedure
        .input(
            z.object({
                tenantId: z.string(),
                threadId: z.string(),
            }),
        )
        .mutation(async ({ input }) => {
            return await removeFromSpam(
                input.tenantId,
                input.threadId,
            );
        }),
    
    getThreadStats: publicProcedure
        .input(
            z.object({
                tenantId: z.string(),
                threadId: z.string(),
            }),
        )
        .query(async ({ input }) => {
            return await getThreadStats(
                input.tenantId,
                input.threadId,
            );
        }),
    
    
});