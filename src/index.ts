import { APIGatewayEvent, Context } from 'aws-lambda';
import { validateSignature, Client, WebhookEvent } from '@line/bot-sdk'
import { createConfig } from './line';
import { StatusCodes } from 'http-status-codes';

const accessToken = process.env.CHANNEL_ACCESS_TOKEN;
const channelSecret = process.env.CHANNEL_SECRET;

const [clientConfig, middlewareConfig]
    = createConfig(accessToken, channelSecret)
const client = new Client(clientConfig);

export const handler = async (event: APIGatewayEvent, _: Context) => {
    console.log("headers", event.headers)
    console.log("body", event.body)

    // validate signature 
    if (!event.body) throw Error(StatusCodes.FORBIDDEN.toString())
    const verified = validateSignature(
        event.body,
        middlewareConfig.channelSecret,
        event.headers["x-line-signature"]!)
    console.log("verified", verified)
    if (!verified) throw Error(StatusCodes.FORBIDDEN.toString())

    // console.log("verified", verified)

    // TODO: body: string を lineEvents: WebhookEvent に変換する
    // console.log("headers", event.headers)
    // console.log("body", event.body)

    return;
};