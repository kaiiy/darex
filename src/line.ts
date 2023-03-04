import { ClientConfig, MiddlewareConfig } from '@line/bot-sdk'

export const createConfig = (
    token: string | undefined,
    secret: string | undefined): [ClientConfig, MiddlewareConfig] => {

    const clientConfig: ClientConfig = { channelAccessToken: "" }
    const middlewareConfig: MiddlewareConfig = { channelSecret: "" }

    if (!token || !secret) throw Error()

    clientConfig.channelAccessToken = token
    middlewareConfig.channelSecret = secret

    return [clientConfig, middlewareConfig]
}