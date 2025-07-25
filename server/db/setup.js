const fs = require('fs');
require("dotenv").config();

const db = require("./connect.js");

const sql = fs.readFileSync('./db/setup.sql').toString();

db.query(sql)
    .then(data => {
        db.end();
        console.log("Set-up complete.");
    })
    .catch(error => console.log(error));