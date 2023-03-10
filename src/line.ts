import { ClientConfig, MiddlewareConfig, Client, WebhookEvent } from '@line/bot-sdk'

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

const addFriendText = "追加した"
const gameStartText = "ゲームスタート"

export const replyMessage = async (client: Client, event: WebhookEvent) => {
    event.source.userId
    // when followed 
    if (event.type === "follow") {
        await client.replyMessage(event.replyToken, [
            {
                type: "template",
                altText: "アカウントを追加してください。",
                template: {
                    type: "buttons",
                    title: "友達追加",
                    text: "下のボタンからアカウントを追加してください。",
                    actions: [
                        {
                            type: "uri",
                            label: "追加する",
                            uri: "https://line.me/R/ti/p/@152wmnqc"
                        }
                    ]
                },
                quickReply: {
                    items: [
                        {
                            type: "action",
                            action: {
                                type: "message",
                                label: addFriendText,
                                text: addFriendText
                            }
                        }
                    ]
                }
            }
        ]);
    }
    // accept only text
    if (event.type !== 'message' || event.message.type !== 'text') return;

    const userText = event.message.text;
    if (userText === addFriendText) {
        await client.replyMessage(event.replyToken, [
            {
                type: "text",
                text: "このLINE謎『誰X』は、問題1・2のいずれかに正解できれば「クリア」となります。"
            },
            {
                type: "text",
                text: "ヒントが欲しい場合、「ヒント」と送信してください。10秒考えて何も思いつかなければ、ヒントを見てください。ヒントもこのLINE謎の一部です。",
                quickReply: {
                    items: [
                        {
                            type: "action",
                            action: {
                                type: "message",
                                label: gameStartText,
                                text: gameStartText
                            }
                        }
                    ]
                }

            },
        ]);
    } else if (userText === gameStartText) {
        await client.replyMessage(event.replyToken, [
            {
                type: "text",
                text: "問題1: あなたは誰ですか?"
            },
            {
                type: "text",
                text: "問題2: x = ? (ただし、このLINE謎の存在なしに、x単体でも成立するものとします。)"
            },
        ]);
        // TODO: push message to ooo-o-
        // await client.pushMessage()
    }
}
