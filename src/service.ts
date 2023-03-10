import { APIGatewayEvent, Context, ProxyResult } from 'aws-lambda';
import { validateSignature, Client, WebhookEvent } from '@line/bot-sdk'
import { createConfig, replyMessage, isWebhookEvents } from './line';
import { StatusCodes } from 'http-status-codes';

const forbiddenResponse: ProxyResult = {
    statusCode: StatusCodes.FORBIDDEN, body: ""
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