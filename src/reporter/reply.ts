import { Client, WebhookEvent } from '@line/bot-sdk'

const addFriendText = "追加した"
const gameStartText = "ゲームスタート"

export const replyMessage = async (client: Client, service: Client, event: WebhookEvent) => {
    const userId = event.source.userId

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
                text: "問題2: x = ?"
            },
        ]);

        if (userId === undefined) {
            await client.replyMessage(event.replyToken, [
                {
                    type: "text",
                    text: "ユーザIDが取得できませんでした。iOS版LINEまたはAndroid版LINEを使用してください。"
                },
            ]);
            return
        }
    }
}
