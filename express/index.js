var express = require("express");
const cors = require('cors')

var app = express();app.listen(8080, () => {
 console.log("Server running on port 8080");
});

app.get("/", cors(), (req, res, next) => {
    res.json({Distance: Math.random()});
});
