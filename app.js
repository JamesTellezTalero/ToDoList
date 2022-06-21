require('dotenv').config({ path: "./process.env" });

const mongodbHelpers = require('./helpers/mongodb');

//EXPRESS
const express = require('express');
const app = express();

const port = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(require('./src/routes/index'));

const server = app.listen(port, async() => {
    console.log(`Listen on : http://localhost:${port}`)
    await mongodbHelpers.connect();
});

process.on("unhandleRejection", err => {
    console.log(`An error ocurred: ${err.message}`)
    server.close(() => process.exit(1))
});