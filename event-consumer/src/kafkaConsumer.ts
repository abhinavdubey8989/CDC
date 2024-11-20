

import { Kafka, Consumer, Admin } from 'kafkajs';
import { LogService } from './utils/logService';
const randomId = require('random-id');

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
        const { topic, partition, message } = data;
        const msgString = message!.value!.toString();

        if (topic === process.env.KAFKA_MONGO_CDC_TPC!) {
            const msgObj = JSON.parse(msgString);
            const { before, after, op } = msgObj;
            this.handleBeforeAfterPayload(logId, op, before, JSON.parse(after));
            console.log("handled mongo cdc event");
        } else {
            const msgObj = JSON.parse(msgString);
            const { schema, payload } = msgObj;
            const { before, after, op } = payload;
            this.handleBeforeAfterPayload(logId, op, before, after);
            console.log("handled PG cdc event");
        }
    }


    handleBeforeAfterPayload(logId: string, operration: string, beforeObj: any, afterObj: any) {
        this.logService.info({ logId }, operration);
        this.logService.info({ logId }, JSON.stringify(beforeObj));
        this.logService.info({ logId }, JSON.stringify(afterObj));
    }

}