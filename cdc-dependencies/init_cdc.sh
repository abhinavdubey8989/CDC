

docker exec -it my_dbzm /bin/bash -c "bash /dbzm_curls/setup_mongo_connector.sh"
sleep 1

docker exec -it my_dbzm /bin/bash -c "bash /dbzm_curls/setup_pg_connector.sh"
sleep 1


# list connectors
docker exec -it my_dbzm /bin/bash -c "bash /dbzm_curls/get_connectors.sh"


# list topics
docker exec -it my_kafka_1 /bin/bash -c "/bin/kafka-topics --list --bootstrap-server localhost:9092"