import { ClientConfig, MiddlewareConfig, WebhookEvent } from '@line/bot-sdk'

export const createConfig = (token: string, secret: string): [ClientConfig, MiddlewareConfig] => {
    const clientConfig: ClientConfig = { channelAccessToken: "" }
    const middlewareConfig: MiddlewareConfig = { channelSecret: "" }

    clientConfig.channelAccessToken = token
    middlewareConfig.channelSecret = secret

    return [clientConfig, middlewareConfig]
}

export const isWebhookEvents = (events: unknown): events is WebhookEvent[] => {
    if (!Array.isArray(events)) return false

    for (const event of events) {
        if (!(event instanceof Object)) return false
        if (!("type" in event)) return false
    }

    return true
}
