# 誰X

制作: kaiiy


## AWS Lambda Requirements

- Node.js 22

## セットアップ

1. LINE BOTを２つ作成し、AWS LambdaにMessaging APIのチャネルアクセストークンとチャネルシークレットを設定。

```txt
# LINE BOT1
SERVICE_ACCESS_TOKEN=""
SERVICE_SECRET=""

# LINE BOT2
REPORTER_ACCESS_TOKEN=""
REPORTER_SECRET=""
```

2. `task deploy`でLambdaにデプロイ。
3. AWS API Gatewayを非プロキシ統合で、Lambdaと連携。
4. LINE BOTにAPI Gatewayのエントリーポイントを設定。
