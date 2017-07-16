const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if (err) {
    return console.log('Unable to connect to mongodb server');
  }
  console.log('Connected to mongodb server');

  /*db.collection('Todos').findOneAndUpdate({
    _id: new ObjectID('596b18ff3b39e4a442521007'),
  }, {
    $set: {
      completed: true,
    }
  }, {
    returnOriginal: false,
  }).then((result) => {
    console.log(result);
  }, (err) => {
    console.log('Unable to find and update todo', err);
  });*/

  db.collection('Users').findOneAndUpdate({
    _id: new ObjectID('596b1fa283e93d9fe8ee4231')
  },{
    $set: {
      name: 'Stephane'
    },
    $inc: {
      age: 1
    }
  }, {
    returnOriginal: false
  }).then((result) => {
    console.log(result);
  }, (err) => {
    console.log('Unable to find and update user', err);
  });

  db.close();
});
