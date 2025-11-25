/**
 * Author: Professor Krasso
 * Date: 7 August 2024
 * File: index.js
 * Description: Routing for the index page.
 */

// require statements
const express = require("express");
const router = express.Router();
const { mongo } = require("../../src/utils/mongo");
/**
 * @description
 * Route handler for the root path ('/').
 *
 * This route responds with a JSON message when accessed.
 *
 * Usage:
 *
 * router.get('/', function(req, res, next) {
 *   res.send({
 *     message: 'Hello from the ETS server!'
 *   });
 * });
 *
 * Example:
 *
 * // Accessing the root path
 * // GET http://<server-address>/
 *
 * // Response:
 * // {
 * //   "message": "Hello from the ETS server!"
 * // }
 */
router.get("/", function (req, res, next) {
  try {
    mongo(async (db) => {
      const users = await db.collection("users").find().toArray();
      console.log("List of all users in the database:", users);
      res.send(users);
    }, next);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

module.exports = router;
