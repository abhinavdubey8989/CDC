
# Aim
- The aim of this project is to setup CDC for mongo db
- Tools used : zookeeper , kafaka , debezium , mongo-db

# Local setup

- Add the below in /etc/hosts : 

`127.0.0.1       my_mongodb_1`
`127.0.0.1       my_kafka_1`
`127.0.0.1       my_zk`

- Start the containers locally : `./start_or_stop.sh 1`

- SETUP MONGO : 
    - once the containers are up, run the below on the hostmachine's terminal to create a single node mongodb replica set
    - This is needed bcz it create `oplog.rs` collection in `local` db of mongo
    - dbzm uses `oplog.rs` to generate events
    - `docker compose exec my_mongodb_1 mongosh --port 27017 --quiet --eval "rs.initiate()" --json relaxed`

- SETUP debezium :
    - to setup source connector, we need to make a curl inside the dbzm container
    - go inside container : `docker exec  -it my_dbzm /bin/bash`
    - run the setup curl  : `bash /dbzm_curls/setup_connector.sh`


- topic-name to subscribe : `{prefix-in-setup-curl}.{mongo-database-name}.{collection-name}`
