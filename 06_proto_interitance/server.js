const express = require("express");

const app = express();

let port = process.env.PORT || 3000;

app.use(express.static("static"));

app.listen(port);

console.log("server started in: " + port);