const express = require('express');
const winston = require('winston');
const bodyParser = require('body-parser');
const { ObjectID } = require('mongodb');

const { mongoose } =  require('./db/mongoose');
const { Todo } =  require('./models/todo');
const { User } =  require('./models/user');

const fs = require( 'fs' );
const path = require('path');
const logDir = `${__dirname}/../var/logs`; // directory path you want to set

if ( !fs.existsSync(logDir)) {
  // Create the directory if it does not exist
  fs.mkdirSync(logDir);
}

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static('public'));
app.use(bodyParser.json());

/**
 * @api {post} /todos Register a new Todo
 * @apiGroup Todos
 * @apiParam {String} text Todo text
 * @apiParamExample {json} Input
 *    {
 *      "text": "Study"
 *    }
 * @apiSuccess {Number} _id Todo unique _id
 * @apiSuccess {Number} __v Todo __v
 * @apiSuccess {String} text Todo text
 * @apiSuccess {Boolean} completed Todo is completed or not ?
 * @apiSuccess {Date} completedAt Todo's date completed
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *    {
 *      "__v": 0,
 *      "text": "Study",
 *      "_id": "597dc57a859fe900110d5f34",
 *      "completedAt": null,
 *      "completed": false
 *    }
 * @apiErrorExample {json} Error unknown
 *    HTTP/1.1 400 Bad Request
 */
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
 * @apiSuccess {Number} todos._id Todo id
 * @apiSuccess {Number} todos.__v Todo __v
 * @apiSuccess {String} todos.text Todo text
 * @apiSuccess {Boolean} todos.completed Todo is completed or not ?
 * @apiSuccess {Date} todos.completedAt Todo's date completed
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *    {
 *      todos:[
 *        {
 *          "_id": 1,
 *          "text": "Study",
 *          "completed": false
 *          "completedAt": null,
 *          "__v": 0
 *        },
 *        {
 *          "_id": 2,
 *          "text": "Sleep",
 *          "completed": true
 *          "completedAt": 2017-12-04,
 *          "__v": 0
 *        }
 *      ]
 *    }
 * @apiErrorExample {json} List error
 *    HTTP/1.1 400 Bad Request
 */
app.get('/todos', (req, res) => {
  Todo.find().then((todos) => {
    res.send({todos});
  }, (err) => {
    res.status(400).send(err);
  });
});

/**
 * @api {get} /todos/:id Find a todo
 * @apiGroup Todos
 * @apiParam {Number} _id Todo unique id
 * @apiSuccess {Number} _id Todo unique _id
 * @apiSuccess {Number} __v Todo __v
 * @apiSuccess {String} text Todo text
 * @apiSuccess {Boolean} completed Todo is completed or not ?
 * @apiSuccess {Date} completedAt Todo's date completed
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *    {
 *      "__v": 0,
 *      "text": "Buy Macbook",
 *      "_id": "597dc57a859fe900110d5f34",
 *      "completedAt": null,
 *      "completed": false
 *    }
 * @apiErrorExample {json} Error unknown
 *    HTTP/1.1 400 Bad Request
 * @apiErrorExample {json} Todo not found
 *    HTTP/1.1 404 Not Found
 *    {
 *      "message": "Todo not found"
 *    }
 */
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

app.delete('/todos/:id', (req, res) => {
  const id = req.params.id;
  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  Todo.findByIdAndRemove(id).then((todo) => {
    if (!todo) {
      return res.status(404).send();
    }

    res.status(204).send();
  }).catch(err => res.status(400).send());
});

app.listen(port, () => {
  console.log(`Started at the port ${port}`);
});

const logger = new (winston.Logger)({
  transports: [
    new (winston.transports.File)({
      name: 'info-file',
      filename: path.join(logDir, 'info.log'),
      level: 'info',
      prettyPrint: true,
    }),
    new (winston.transports.File)({
      name: 'error-file',
      filename: path.join(logDir, 'error.log'),
      handleExceptions: true,
      level: 'error',
      prettyPrint: true,
    }),
    new (winston.transports.Console)({
      level: 'debug',
      colorize: true
    }),
  ]
});

logger.debug('debug test');
logger.error('error test');

module.exports = { app };
