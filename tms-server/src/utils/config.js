/**
 * Title: config.js
 * Author: Sara King
 * Date: 11/24/25
 */

"use strict";

// Declare the database object
const db = {
  username: "gms_user", // This is the username for the database
  password: "HiJETfd7H7GdUbwF", // This is the password for the database
  name: "TMS-DATABASE", // This is the name of the database in MongoDB
};

// Declare the config object
const config = {
  port: 3000, // This is the default port for MongoDB
  dbUrl: `mongodb+srv://${db.username}:${db.password}@cluster0.lujih.mongodb.net/${db.name}?retryWrites=true&w=majority`,
  dbname: db.name, // This is the name of the database in MongoDB
};

module.exports = config; // Expose the config as a module
