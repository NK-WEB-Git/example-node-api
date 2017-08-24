const express = require('express');
const { ObjectID } = require('mongodb');
const _ = require('lodash');

const router = express.Router();
const { mongoose } =  require('./../db/mongoose');
const { User } =  require('./../models/user');

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
router
  .post('', (req, res) => {

    const body =_.pick(req.body, ['email', 'password']);

    const user = new User(body);

    user.save().then((doc) => {
      res.send(doc);
    }, (err) => {
      res.status(400).send(err);
    });
});

module.exports = router;
