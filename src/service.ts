import { Client, WebhookEvent } from '@line/bot-sdk'
import { hints } from "./hints"

const addFriendText = "追加した"
const gameStartText = "ゲームスタート"
const hintText = "ヒント"
const cueText = "手がかり"
const resetText = "リセット"
const answers = {
    q1: ["レスラー", "れすらー"],
    q2: ["ペケ", "ぺけ"]
}

export const replyMessage = async (client: Client, reporter: Client, event: WebhookEvent) => {
    const userId = event.source.userId

    // when followed 
    if (event.type === "follow" || (event.type === 'message' && event.message.type === 'text' && event.message.text === resetText)) {
        await client.replyMessage(event.replyToken, [
            {
                type: "template",
                altText: "アカウントを追加してください。",
                template: {
                    type: "buttons",
                    title: "友達追加",
                    text: "下のボタンからアカウントを追加してください。",
                    actions: [{
                        type: "uri",
                        label: "追加する",
                        uri: "https://line.me/R/ti/p/@152wmnqc"
                    }]
                },
                quickReply: {
                    items: [{
                        type: "action",
                        action: {
                            type: "message",
                            label: addFriendText,
                            text: addFriendText
                        }
                    }]
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
                text: "このLINE謎『誰X』は、問題1・2のいずれかに正解できれば「クリア」となります。想定プレイ時間は5~10分です。"
            },
            {
                type: "text",
                text: "「ゲームスタート」と送信すると、先程、友達追加をした相手から \"質問\" をされますので、それに答えてください。"
            },
            {
                type: "text",
                text: "ヒントが欲しい場合、「ヒント」と送信してください。ヒントの内容はランダムで送信されます。",
            },
            {
                type: "text",
                text: "「リセット」と送信すると、最初から遊ぶことが出来ます。",
                quickReply: {
                    items: [{
                        type: "action",
                        action: {
                            type: "message",
                            label: gameStartText,
                            text: gameStartText
                        }
                    }]
                }
            }
        ]);
    } else if (userText === gameStartText) {
        await client.replyMessage(event.replyToken, [
            {
                type: "text",
                text: "問題1: あなたは誰ですか?"
            },
            {
                type: "text",
                text: "問題2: x = ? (ただし、このLINE謎の存在なしに、x単体でも成立するものとします。)",
                quickReply: {
                    items: [{
                        type: "action",
                        action: {
                            type: "message",
                            label: cueText,
                            text: cueText
                        }
                    }]
                }
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
    } else if (userText === cueText) {
        await client.replyMessage(event.replyToken, [
            {
                type: "audio",
                originalContentUrl: "https://darex.s3.ap-northeast-1.amazonaws.com/cue.m4a",
                duration: 6012
            },
        ]);
        return
    } else if (userText === hintText) {
        await client.replyMessage(event.replyToken,
            hints[Math.floor(Math.random() * hints.length)]
        )
    } else if (answers.q1.includes(userText) || answers.q2.includes(userText)) {
        await client.replyMessage(event.replyToken, [
            {
                type: "text",
                text: "『誰X』クリア!!"
            }, {
                type: "text",
                text: "プレイしていただき、ありがとうございました!"
            }, {
                type: "text",
                text: "おまけコンテンツとして、 『誰X』のソースコードを以下のURLで公開しています。興味のある方はご覧下さい。https://github.com/kaiiy/darex"
            }
        ]);
    }
}
