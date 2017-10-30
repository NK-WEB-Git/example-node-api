const express = require('express');
const _ = require('lodash');

const router = express.Router();
const { User } =  require('./../models/user');
const { authenticate } = require('./../middleware/authenticate');

/**
 * @api {post} /users Register a new User
 * @apiGroup Users
 * @apiParam {String} email User email
 * @apiParam {String} password User password
 * @apiParamExample {json} Input
 *    {
 *      "email": "pierre.dupont@example.com",
 *      "password": "abc123",
 *    }
 * @apiSuccess {Number} _id User unique _id
 * @apiSuccess {Number} email User email
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *    {
 *      "_id": "597dc57a859fe900110d5f34",
 *      "email": "pierre.dupont@example.com"
 *    }
 * @apiErrorExample {json} Error unknown
 *    HTTP/1.1 400 Bad Request
 */
router
  .post('', (req, res) => {
    const body =_.pick(req.body, ['email', 'password']);
    const user = new User(body);

    user.save().then(() => {
      return user.generateAuthToken();
    }).then((token) => {
      res.header('x~auth', token).send(user);
    }).catch((err) => {
      res.status(400).send(err);
    });
});

/**
 * @api {get} /users/me my user profile
 * @apiGroup Users
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
router
  .get('/me', authenticate, (req, res) => {
    res.send(res.locals.user);
  });

module.exports = router;
