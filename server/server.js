const express = require('express');
const bodyParser = require('body-parser');
const { mongoose } =  require('./db/mongoose');
const { ObjectID } = require('mongodb');
const { Todo } =  require('./models/todo');
const { User } =  require('./models/user');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static('public'));
app.use(bodyParser.json());

app.post('/todos', (req, res) => {
  const todo = new Todo({
    text: req.body.text
  });

  todo.save().then((doc) => {
    res.send(doc);
  }, (err) => {
    res.status(400).send(err);
  });
});

/**
 * @api {get} /todos List all todos
 * @apiGroup Todos
 * @apiSuccess {Object[]} todos Todo's list
 * @apiSuccess {Number} todos.id Todo id
 * @apiSuccess {Number} todos.__V Todo __v
 * @apiSuccess {String} todos.text Todo text
 * @apiSuccess {Boolean} todos.completed Todo is completed ?
 * @apiSuccess {Date} todos.completedAt Todo's date completed
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *    {
 *      todos:[
 *        {
 *          "id": 1,
 *          "text": "Study",
 *          "completed": false
 *          "completedAt": null,
 *          "__v": 0
 *        },
 *        {
 *          "id": 2,
 *          "text": "Sleep",
 *          "completed": true
 *          "completedAt": 2017-12-04,
 *          "__v": 0
 *        }
 *      ]
 *    }
 * @apiErrorExample {json} List error
 *    HTTP/1.1 400 Internal Server Error
 */
app.get('/todos', (req, res) => {
  Todo.find().then((todos) => {
    res.send({todos});
  }, (err) => {
    res.status(400).send(err);
  });
});

app.get('/todos/:id', (req, res) => {
  const id = req.params.id;

  if(!ObjectID.isValid(id)) {
    res.status(404).send();
  }

  Todo.findById(id).then((todo) => {
    if (!todo) {
      return res.status(404).send({message: 'Todo not found'});
    }
    res.send({ todo });
  }).catch(err => res.status(400).send());
});

app.listen(port, () => {
  console.log(`Started at the port ${port}`);
});

module.exports = { app };
