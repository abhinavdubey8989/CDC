curl -X PUT http://localhost:8083/connector-plugins/PostgresConnector/config/validate \
  -H "Accept: application/json" \
  -H "Content-Type: application/json" \
  -d '{
        "name": "my_mongo_cdc_01",
        "connector.class": "io.debezium.connector.postgresql.PostgresConnector",
        "tasks.max": "1",
        "database.hostname": "my_pg_1",
        "database.port": "5432",
        "database.user": "root",
        "database.password": "root",
        "database.dbname": "my_pg_db",
        "database.server.name": "dbserver1",
        "slot.name": "debezium_slot",
        "plugin.name": "pgoutput",
        "publication.name": "dbz_publication",
        "database.history.kafka.bootstrap.servers": "my_kafka_1:9092",
        "database.history.kafka.topic": "pg_cdc_topic",
        "topic.prefix" : "pg_cdc_topic"
}'

echo
echo

# the result is in [../sample_json/result_of_pg_config_verification_curl.json]
