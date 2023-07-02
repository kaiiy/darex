# 誰X

制作: kaiiy

## セットアップ

1. `Taskfile.yml`にAWS Lambdaの関数名を設定。

```yml
# Taskfile.yml
vars:
  SERVICE_FUNCTION_NAME: ""
```

2. LINE BOTを２つ作成し、AWS LambdaにMessaging APIのチャネルアクセストークンとチャネルシークレットを設定。

```txt
# LINE BOT1
SERVICE_ACCESS_TOKEN=""
SERVICE_SECRET=""

# LINE BOT2
REPORTER_ACCESS_TOKEN=""
REPORTER_SECRET=""
```

3. `task deploy`でLambdaにデプロイ。
4. AWS API Gatewayを非プロキシ統合で、Lambdaと連携。
5. LINE BOTにAPI Gatewayのエントリーポイントを設定。