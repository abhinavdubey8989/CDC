
import express from 'express';
import { LogService } from './utils/logService';

// load configs
import { config } from 'dotenv';
import ENV_DIR from './config/envDir';
import { KafkaConsumer } from './kafkaConsumer';
const path = require('path')
config({ path: path.resolve(__dirname, ENV_DIR) });

const port: string = process.env.APP_PORT || `3034`;

const app = express();

new KafkaConsumer(
    process.env.KAFKA_CONSUMER_GROUP_NAME!,
    process.env.KAFKA_TOPICS!.split(',')
);

const logService = LogService.getInstance();

app.listen(port, async () => {
    logService.info({}, `server started on port=[${port}] , server-id=[${process.env.SERVER_ID}]`);
});



