import { Message } from "@line/bot-sdk"

export const hints: Readonly<Message[]> = [
    {
        type: "text",
        text: "xはそれ単体で成立するため、「xxx = ?」ではなく、「x = ?」としました。"
    },
    {
        type: "text",
        text: "「xxxですか?」は文として、既に成立しています。。"
    },
    {
        type: "text",
        text: "xに入る文字を答えるのではありません。"
    },
    {
        type: "text",
        text: "xの読み仮名、ルビを答えましょう。"
    },
    {
        type: "text",
        text: "あなたは「xxxですか?」と尋ねられています。「ですか?」と聞かれているので、肯定か否定を意味する言葉を返したいですね。"
    },
    {
        type: "text",
        text: "ええ。"
    },
    {
        type: "text",
        text: "〇にはカタカナが入ります。ーは伸ばし棒です。"
    },
    {
        type: "text",
        text: "もう少し粒度を上げると、「〇〇ﾟー〇ー」です。"
    },
    {
        type: "text",
        text: "「xxx=あなたは誰」ではありません。"
    },
    {
        type: "text",
        text: "「あなたは誰ですか?」=「あなたの職業は何ですか?」"
    },
    {
        type: "text",
        text: "これは1対1のコミュニケーションです。「xxxですか?」と聞いている人物とあなたが会話しています。"
    },
    {
        type: "text",
        text: "「〇〇ﾟー〇ー」のアイコン、マイクから連想しても良いかもしれません。"
    },
    {
        type: "text",
        text: "返答が思いついたら、送ってみましょう。"
    },
    {
        type: "text",
        text: "xは2文字のカタカナです。"
    },
    {
        type: "text",
        text: "x=「エックス」「かける」「バツ」......他には?"
    },
    {
        type: "text",
        text: "このLINE謎は音、リズムが大切です。"
    },
    {
        type: "text",
        text: "手がかりの最初4音はカウントでBGMを提示する以上の意味はありません。メインはそれに続く9音+1音です。"
    },
    {
        type: "text",
        text: "xが2文字だとすると、「xxxですか?」は音数には9音ですね。"
    },
    {
        type: "text",
        text: "手がかり最後の1音があなたの返答です。"
    }
] 