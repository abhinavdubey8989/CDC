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
        "errors.tolerance": "all",
        "tombstones.on.delete" : "true",
        "topic.prefix" : "mongo_cdc_topic"
    }
}'

echo
echo
