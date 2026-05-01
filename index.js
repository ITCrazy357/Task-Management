const express = require("express");

const bodyParser = require("body-parser");

const database = require("./config/database");

require("dotenv").config();

// Import routes
const route = require("./api/v1/routers/index.route");

database.connect();

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

route(app); // Sử dụng các tuyến đường đã định nghĩa

app.listen(port, () => {
  console.log(`🚀🚀🚀 App listening on port ${port}`);
});
