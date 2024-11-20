curl -X PUT http://localhost:8083/connector-plugins/MongoDbConnector/config/validate \
  -H "Accept: application/json" \
  -H "Content-Type: application/json" \
  -d '{
        "name": "my_mongo_cdc_01",
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
}'

echo
echo

# the result is in [../sample_json/result_of_mongo_config_verification_curl.json]
