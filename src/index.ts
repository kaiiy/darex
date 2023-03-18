import { APIGatewayEvent, Context, ProxyResult } from 'aws-lambda';
import { validateSignature, WebhookEvent } from '@line/bot-sdk'
import { createClient, isWebhookEvents, Key, Secrets } from './line';
import { Targets, forbiddenResponse, OkResponse } from "./http"
import { replyMessage as replyServiceMessage } from "./service"
import { replyMessage as replyReporterMessage } from "./reporter"

const validateSignatureWithPath =
    (body: string, secrets: Secrets, signature: string, path: string, targets: Targets): boolean => {
        let secret: string;
        if (path === targets.service) secret = secrets.service
        else if (path === targets.reporter) secret = secrets.reporter
        else return false

        const verified = validateSignature(body, secret, signature)
        return verified
    }


export const handler = async (event: APIGatewayEvent, _: Context): Promise<ProxyResult> => {
    // keys 
    const serviceKey: Key = {
        accessToken: process.env.SERVICE_ACCESS_TOKEN!,
        channelSecret: process.env.SERVICE_SECRET!
    }
    const reporterKey: Key = {
        accessToken: process.env.REPORTER_ACCESS_TOKEN!,
        channelSecret: process.env.REPORTER_SECRET!
    }

    const targets: Readonly<Targets> = {
        service: "/service",
        reporter: "/reporter"
    }

    // create client 
    const serviceClient = createClient(serviceKey.accessToken)
    const reporterClient = createClient(reporterKey.accessToken)
    const secrets = {
        service: serviceKey.channelSecret,
        reporter: reporterKey.channelSecret
    }

    // validate signature 
    if (!event.body) return forbiddenResponse
    const verified = validateSignatureWithPath(
        event.body, secrets, event.headers["x-line-signature"]!, event.path, targets
    )
    if (!verified) return forbiddenResponse

    // load request 
    const lineEvents = JSON.parse(event.body).events
    if (!isWebhookEvents(lineEvents)) return forbiddenResponse

    // reply to all messages
    await Promise.all(
        lineEvents.map(async (webhookEvent: WebhookEvent) => {
            if (event.path === targets.service) {
                await replyServiceMessage(serviceClient, reporterClient, webhookEvent)
            } else if (event.path === targets.reporter) {
                await replyReporterMessage(reporterClient, webhookEvent)
            }
        })
    );

    return OkResponse
};