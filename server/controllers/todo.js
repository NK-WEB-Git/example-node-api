const { Todo } =  require('./../models/todo');

class TodoController {

  constructor(param) {
    this.text = param.text || null;
  }

  addTodo() {
    const todo = new Todo({
      text: this.text,
    });

    todo.save().then((doc) => {
      this.response.send(doc);
    }, (err) => {
      this.response.status(400).send(err);
    });
  }

  getTodo() {
    Todo.find().then((todos) => {
      this.response.send({todos});
    }, (err) => {
      this.response.status(400).send(err);
    });
  }
}

module.exports = { TodoController };
