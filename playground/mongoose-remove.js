const { mongoose } = require('./../server/db/mongoose');
const { Todo } = require('./../server/models/todo');
const { User } = require('./../server/models/user');
const { ObjectID } = require('mongodb');

/*Todo.remove({}).then((result) => {
  console.log(result);
});*/

odo.findOneAndRemove({
  _id: '597e511242d160d3b820e19a'
}).then((todo) => {
  console.log(todo);
});
// Todo.findByIdAndRemove

Todo.findByIdAndRemove('597e511242d160d3b820e19a').then((todo) => {
  console.log(todo);
});