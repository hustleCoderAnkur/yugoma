export async function snoozeThread(
    tenantId: string,
    threadId: string,
    wakeUpAt: string,
) {
    // implementation later
}

export async function snoozeManyThreads(
    tenantId: string,
    threadIds: string[],
    wakeUpAt: string,
) {
    return await Promise.all(
        threadIds.map((threadId) =>
            snoozeThread(
                tenantId,
                threadId,
                wakeUpAt,
            ),
        ),
    );
}