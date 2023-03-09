import { APIGatewayEvent, Context, ProxyResult } from 'aws-lambda';
import { validateSignature, Client, WebhookEvent } from '@line/bot-sdk'
import { createConfig, replyMessage } from './line';
import { StatusCodes } from 'http-status-codes';

const forbiddenResponse: ProxyResult = { statusCode: StatusCodes.FORBIDDEN, body: "" }

// TODO 
const isWebhookEvents = (events: unknown): events is WebhookEvent[] => {
    if (!Array.isArray(events)) return false

    for (const event of events) {
        if (!(event instanceof Object)) return false
        if (!("type" in event)) return false
    }

    return true
}

export const handler = async (event: APIGatewayEvent, _: Context): Promise<ProxyResult> => {
    const accessToken = process.env.CHANNEL_ACCESS_TOKEN;
    const channelSecret = process.env.CHANNEL_SECRET;
    if (!accessToken || !channelSecret) return forbiddenResponse

    const [clientConfig, middlewareConfig]
        = createConfig(accessToken, channelSecret)
    const client = new Client(clientConfig);

    // validate signature 
    if (!event.body) return forbiddenResponse
    const verified = validateSignature(
        event.body,
        middlewareConfig.channelSecret,
        event.headers["x-line-signature"]!)
    if (!verified) return forbiddenResponse

    const lineEvents = JSON.parse(event.body).events
    if (!isWebhookEvents(lineEvents)) return forbiddenResponse

    // reply all messages
    await Promise.all(
        lineEvents.map(async (event: WebhookEvent) => {
            // TODO: error handling
            await replyMessage(client, event);
        })
    );

    return { statusCode: StatusCodes.OK, body: "" }
};