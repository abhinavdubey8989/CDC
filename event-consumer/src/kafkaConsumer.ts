

import { Kafka, Consumer, Admin } from 'kafkajs';
import { LogService } from './utils/logService';
const randomId = require('random-id');

interface MassagedCDCDetails {
    logId: string;
    topic: string;
    connector: string,
    operation: string,
    before: any,
    after: any
}

export class KafkaConsumer {

    private kafka: Kafka;
    private consumer: Consumer;
    private logService: LogService;
    private kafkaAdmin: Admin;

    constructor(consumerGroupId: string, topics: string[]) {
        this.logService = LogService.getInstance();
        try {
            const brokers = process.env.KAFKA_BROKER_STR!.split(',')
            this.kafka = new Kafka({
                clientId: process.env.APP_NAME,
                brokers
            });
            this.consumer = this.kafka.consumer({ groupId: consumerGroupId });
            this.kafkaAdmin = this.kafka.admin();
            this.kafkaAdmin.connect();
            this.startConsuming(topics);
        } catch (e) {
            console.log(JSON.stringify(e));
            this.kafka = {} as any;
            this.consumer = {} as any;
            this.kafkaAdmin = {} as any;
        }
    }

    public async disconnect(): Promise<void> {
        await this.consumer.disconnect();
    }

    private async startConsuming(topics: string[]) {
        try {
            await this.consumer.subscribe({ topics, fromBeginning: true });
            await this.consumer.run({
                eachMessage: async (data) => {
                    console.log("received event");
                    this.handleEvent(data)
                }
            });
        } catch (e) {
            console.log(JSON.stringify(e));
        }
    }

    // each CDC event is handled in this fn
    private handleEvent(data: any) {
        const logId = randomId(15, 'aA0');
        try {
            const { topic, message } = data;
            const msgString = message!.value!.toString();
            const msgObj = JSON.parse(msgString);
            console.log(`handling [${msgObj.payload.source.connector}] event`);
            this.handleMassagedEvent({
                logId,
                topic,
                before: msgObj.payload.before,
                after: msgObj.payload.after,
                connector: msgObj.payload.source.connector,
                operation: msgObj.payload.op
            });
        } catch (e) {
            this.logService.info({ logId }, `error while handling event: ${JSON.stringify(e)}`);
        }
    }


    handleMassagedEvent(details: MassagedCDCDetails) {
        const logId = details.logId;
        this.logService.info({ logId }, details.connector);
        this.logService.info({ logId }, `operation=[${JSON.stringify(details.operation)}]`);
        this.logService.info({ logId }, `before=[${JSON.stringify(details.before)}]`);
        this.logService.info({ logId }, `after=[${JSON.stringify(details.after)}]`);
        this.logService.info({ logId }, `==============`);
    }

}