import { Client, WebhookEvent } from '@line/bot-sdk'

const reactionTexts = ["ええ。", "ええ"]

export const replyMessage = async (client: Client, service: Client, event: WebhookEvent) => {
    // accept only text
    if (event.type !== 'message' || event.message.type !== 'text') return;

    const userText = event.message.text;
    if (reactionTexts.includes(userText)) {
        await client.replyMessage(event.replyToken, [
            {
                type: "text",
                text: "へえ～すごいですネ！"
            },
        ]);
    }
}
