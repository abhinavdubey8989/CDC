curl -i -X POST \
    -H "Accept:application/json" \
    -H "Content-Type:application/json" localhost:8083/connectors \
    -d '{
    "name": "my_mongo_cdc_01",
    "config": {
        "connector.class": "io.debezium.connector.mongodb.MongoDbConnector",
        "mongodb.hosts": "my_mongodb_1:27017",
        "mongodb.name": "my_mongo_cdc_01",
        "database.whitelist": "test_db_01",
        "collection.whitelist": "test_db_01.test_coll_01",
        "key.converter.schemas.enable": false,
        "value.converter.schemas.enable": false,
        "key.converter": "org.apache.kafka.connect.json.JsonConverter",
        "value.converter": "org.apache.kafka.connect.json.JsonConverter",
        "transforms.unwrap.type": "io.debezium.connector.mongodb.transforms.UnwrapFromMongoDbEnvelope",
        "transforms.unwrap.drop.tombstones": "false",
        "transforms.unwrap.delete.handling.mode": "drop",
        "transforms.unwrap.operation.header": "true",
        "errors.tolerance": "all",
        "tombstones.on.delete" : "false",
        "topic.prefix" : "mongo_cdc_topic"
    }
}'

echo
echo
