import { ClientConfig, WebhookEvent, Client } from '@line/bot-sdk'

export type Key = {
    accessToken: string,
    channelSecret: string
}
export type Secrets = {
    service: string,
    reporter: string
}

export const createClient = (token: string): Client => {
    const config: ClientConfig = { channelAccessToken: token }
    const client = new Client(config)
    return client
}

export const isWebhookEvents = (events: unknown): events is WebhookEvent[] => {
    if (!Array.isArray(events)) return false

    for (const event of events) {
        if (!(event instanceof Object)) return false
        if (!("type" in event)) return false
    }

    return true
}
