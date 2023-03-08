import { ClientConfig, MiddlewareConfig, Client, WebhookEvent } from '@line/bot-sdk'

export const createConfig = (token: string, secret: string): [ClientConfig, MiddlewareConfig] => {
    const clientConfig: ClientConfig = { channelAccessToken: "" }
    const middlewareConfig: MiddlewareConfig = { channelSecret: "" }

    clientConfig.channelAccessToken = token
    middlewareConfig.channelSecret = secret

    return [clientConfig, middlewareConfig]
}

export const replyMessage = async (client: Client, ev: WebhookEvent) => {
    // accept: text
    if (ev.type !== 'message' || ev.message.type !== 'text') return;

    const userText = ev.message.text;
    await client.replyMessage(ev.replyToken, {
        type: "text",
        text: userText
    });
}
