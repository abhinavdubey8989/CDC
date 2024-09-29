
# Aim
- The aim of this project is to setup CDC for mongo db
- Tools used : zookeeper , kafaka , debezium , mongo-db

# Local setup
- Add the below in /etc/hosts : 

`127.0.0.1       my_mongodb_1`
`127.0.0.1       my_kafka_1`
`127.0.0.1       my_zk`

- start the containers locally : `./start_or_stop.sh 1`

- once the containers are up, run the below to create a single node mongodb replica set
    - This is needed bcz it create `oplog.rs` collection in `local` db of mongo
    - dbzm uses `oplog.rs` to generate events
    - `docker compose exec my_mongodb_1 mongosh --port 27017 --quiet --eval "rs.initiate()" --json relaxed`

- topic-name : `{prefix-in-setup-curl}.{mongo-database-name}.{collection-name}`
