curl -i -X POST \
    -H "Accept:application/json" \
    -H "Content-Type:application/json" localhost:8083/connectors \
    -d '{
    "name": "my_pg_cdc_01",
    "config": {
        "connector.class": "io.debezium.connector.postgresql.PostgresConnector",
        "tasks.max": "1",
        "database.hostname": "my_pg_1",
        "database.port": "5432",
        "database.user": "root",
        "database.password": "root",
        "database.dbname": "my_pg_db",
        "plugin.name": "pgoutput",
        "topic.prefix" : "pg_cdc_topic"
    }
}'

echo
echo
