const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/TodoApp');

const Todo = mongoose.model('Todo', {
   text: {
       type: String,
       required: true,
       minlength: 3,
       trim: true
   },
   completed: {
       type: Boolean,
       default: false
   },
   completedAt: {
       type: Number,
       default: null
   }
});

/*const newTodo = new Todo({
   text: 'Cook dinner'
});

newTodo.save().then((doc) => {
    console.log('Todo save', doc);
}, (err) => {
   console.log('Unable to save', err);
});*/

/*const Todo2 = new Todo({
   text: '   Thor     ',
});

Todo2.save().then((doc) => {
    console.log('Todo2 save', doc);
}, (err) => {
    console.log('Unable to save Todo2', err);
});*/

const User = mongoose.model('User', {
   email: {
       type: String,
       minlength: 3,
       trim: true,
       required: true
   }
});

const newUser = new User({
    email: 'lo'
});

newUser.save().then((doc) => {
    console.log(JSON.stringify(doc, undefined, 2));
}, (err) => {
    console.log('Unable to save user', err);
});