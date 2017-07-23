const { mongoose } = require('./../server/db/mongoose');
const { Todo } = require('./../server/models/todo');
const { User } = require('./../server/models/user');
const { ObjectID } = require('mongodb');

/*const id = '59734b8799ec15b1323f5f3a11';

if (!ObjectID.isValid(id)) {
  console.log('ID not valid');
}*/

/*Todo.find({
  _id: id
}).then((todos) => {
  console.log(todos);
});

Todo.findOne({
  _id: id
}).then((todo) => {
  console.log(todo);
});*/

/*
Todo.findById(id).then((todo) => {
  if (!todo) {
    return console.log('Id not found');
  }
  console.log('Todo by id', todo);
}).catch((err) => console.log(err));*/
const id = '597324121b05b6a89200f786';

User.findById(id).then((user) => {
  if (!user) {
    return console.log('User not found');
  }

  console.log('User find by id', user);
}).catch((err) => console.log(err));