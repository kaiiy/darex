import * as lambda from 'aws-lambda';
import { validateSignature, Client } from '@line/bot-sdk'
import { createConfig } from './line';

const accessToken = process.env.CHANNEL_ACCESS_TOKEN!;
const channelSecret = process.env.CHANNEL_SECRET!;

const [clientConfig, middlewareConfig] = createConfig(accessToken, channelSecret)
const client = new Client(clientConfig);

export const handler: lambda.APIGatewayProxyHandlerV2 =  (event, _) => {
    const verified = validateSignature(
        event.body!,
        middlewareConfig.channelSecret,
        event.headers["x-line-signature"]!)
    if (!verified) throw Error("403")

    console.log("v", verified)
    console.log("h", event.headers)

    return
};