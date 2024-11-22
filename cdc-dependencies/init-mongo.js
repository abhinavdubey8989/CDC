
// init replica set on container startup
rs.initiate({});

// create db
// use test_coll_01

// insert a doc
// db.test_coll_01.insertOne({ name: 'n-1', val: 10 });

// ref : https://stackoverflow.com/questions/77287900/debezium-connect-doesnt-provide-before-field-after-updating-an-item
// update db config to populate `before object`
// db.runCommand({ collMod: "test_coll_01", changeStreamPreAndPostImages: { enabled: true } });
// db.runCommand({ collMod: "test_coll_01", recordPreImages: true })