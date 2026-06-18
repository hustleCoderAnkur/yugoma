import { corsair } from "../corsair";

export function getGmailClient(_tenantId: string) {
    return corsair.withTenant(_tenantId).gmail;
}