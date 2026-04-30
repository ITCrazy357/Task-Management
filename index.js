const express = require("express");
require("dotenv").config();
const database = require("./config/database");

// Import routes
const route = require("./api/v1/routers/index.route");

database.connect();

const app = express();
const port = process.env.PORT || 3000;

route(app); // Sử dụng các tuyến đường đã định nghĩa

app.listen(port, () => {
  console.log(`🚀🚀🚀 App listening on port ${port}`);
});
