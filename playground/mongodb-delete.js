const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if (err) {
    return console.log('Unable to connect to mongodb server');
  }
  console.log('Connected to mongodb server');

  // deleteMany
  /*db.collection('Todos').deleteMany({text: 'travel canada'}).then((result) => {
    console.log(result.result);
  }, (err) => {
    console.log('Unable to delete many todos', err);
  });*/

  //deleteOne
  /*db.collection('Todos').deleteOne({text: 'travel canada'}).then((resut) => {
    console.log(resut.result);
  }, (err) => {
    console.log('Unable to delete one todo', err);
  });

  //findOneAndDelete
  db.collection('Todos').findOneAndDelete({completed: false}).then((result) => {
    console.log(JSON.stringify(result, undefined, 2));
  }, (err) => {
    console.log('Unable to find and delete one todo', err);
  });*/

  /*db.collection('Users').deleteMany({name: 'Stephane'}).then((result) => {
    console.log(result.result);
  }, (err) => {
    console.log('Unable to delete many users', err);
  });*/

  db.collection('Users').findOneAndDelete({_id: new ObjectID('596b1fad6f7d709fee35b032')}).then((result) => {
    console.log(result.value);
  }, (err) => {
    console.log('Unable to find and delete one user', err);
  });

  db.close();
});
