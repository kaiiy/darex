import { Client, WebhookEvent } from '@line/bot-sdk'

const addFriendText = "追加した"
const gameStartText = "ゲームスタート"
const hintText = "ヒント"
const answers = {
    q1: ["レスラー", "れすらー"],
    q2: ["ペケ", "ぺけ"]
}

export const replyMessage = async (client: Client, reporter: Client, event: WebhookEvent) => {
    const userId = event.source.userId

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

        if (userId === undefined) {
            await client.replyMessage(event.replyToken, [
                {
                    type: "text",
                    text: "ユーザIDが取得できませんでした。iOS版LINEまたはAndroid版LINEを使用してください。"
                },
            ]);
            return
        }
        await reporter.pushMessage(userId, [
            {
                type: "text",
                text: "xxxですか?"
            },
        ])
    } else if (userText === hintText) {
        // todo 
    } else if (answers.q1.includes(userText) || answers.q2.includes(userText)) {
        await client.replyMessage(event.replyToken, [
            {
                type: "text",
                text: "『誰X』クリア!!"
            },
        ]);
    }
}
