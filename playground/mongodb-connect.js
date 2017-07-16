const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if (err) {
    return console.log('Unable to connect to mongodb server');
  }
  console.log('Connected to mongodb server');

/*  db.collection('Todos').insertOne({
    text: 'Something to do',
    completed: false
  }, (err, result) => {
    if (err) {
      return console.log('Unable to insert to do', err);
    }
    console.log(JSON.stringify(result.ops, undefined, 2));
  });*/

  db.collection('Users').insertOne({
    name: 'Moka',
    age: 25,
    location: 'Saint Maurice',
  }, (err, result) => {
    if (err) {
      return console.log('Unable to insert a user', err);
    }
    console.log(JSON.stringify(result.ops, undefined, 2));
  });

  db.close();
});
