
# Aim
- The aim of this project is to setup CDC for mongo db
- Tools used : zookeeper , kafaka , debezium , mongo-db

# [MONGO CDC] Local setup

# Step-1 : Add the below in /etc/hosts :

`127.0.0.1       my_mongodb_1`
`127.0.0.1       my_kafka_1`
`127.0.0.1       my_zk`


# Step-2 : Start the containers locally :
  - goto the directory : `cd mongo-cdc-dependencies`
  - run : `./start_or_stop.sh 1`


# Step-3 : Setup mongo REPLICA-SET :
  - once the containers are up, run the below on the hostmachine's terminal
  - This creates a single node mongodb replica set
  - This is needed bcz it create `oplog.rs` collection in `local` db of mongo
  - dbzm uses `oplog.rs` to generate events
  - `docker compose exec my_mongodb_1 mongosh --port 27017 --quiet --eval "rs.initiate()" --json relaxed`
  - This command should give an output like :

<!-- {
  "info2": "no configuration specified. Using a default configuration for the set",
  "me": "my_mongodb_1:27017",
  "ok": 1,
  "$clusterTime": {
    "clusterTime": {
      "$timestamp": {
        "t": 1729006136,
        "i": 1
      }
    },
    "signature": {
      "hash": {
        "$binary": {
          "base64": "AAAAAAAAAAAAAAAAAAAAAAAAAAA=",
          "subType": "00"
        }
      },
      "keyId": 0
    }
  },
  "operationTime": {
    "$timestamp": {
      "t": 1729006136,
      "i": 1
    }
  }
} -->

# Step-4 : Setup a database & collection in mongoDB :
  - go inside container : `docker exec  -it my_mongodb_1 /bin/bash`
  - connect to mongo-shell : `mongosh --port 27017`
  - create a db : `use test_db_01`
  - insert a document in a collecion in above db : `db.test_coll_01.insertOne({name: 'example'})`
  - If we dont insert the DB & collection will NOT get create (create on use)
  - the insert command result : `{ acknowledged: true, insertedId: ObjectId('670e91483a1f310d50964033') }`
  - show dbs : `show dbs`


# Step-5 : Check/verify topic name in kafka after dbzm setup :
  - run the below from the host machine's terminal
  - `docker exec -it my_kafka_1 /bin/bash -c "/bin/kafka-topics --list --bootstrap-server localhost:9092"`


# Step-6 : SETUP debezium connector :
  - to setup source connector, we need to make a curl inside the dbzm container
  - run the below from the host machine's terminal
  - `docker exec -it my_dbzm /bin/bash -c "bash /dbzm_curls/setup_connector.sh"`


# Step-7 : Check/verify topic name in kafka after dbzm setup :
  - run the below from the host machine's terminal
  - `docker exec -it my_kafka_1 /bin/bash -c "/bin/kafka-topics --list --bootstrap-server localhost:9092"`


# Step-8 : Subscribe to topic & start consuming in JS app :
  - Topic name follow the pattern :
  - `{topic.prefix in setup-curl}.{mongo-database-name}.{collection-name}`
  - start the consumer app (a JS app/consumer here)


# Step-9 : Do write operation in mongodb :
  - go inside container : `docker exec  -it my_mongodb_1 /bin/bash`
  - connect to mongo-shell : `mongosh --port 27017`
  - switch to target db : `use test_db_01`
  - insert a document : `db.test_coll_01.insertOne({name: 'example'})`