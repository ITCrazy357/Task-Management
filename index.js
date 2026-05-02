// ===== 1. IMPORT THƯ VIỆN =====
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();

// ===== 2. IMPORT INTERNAL MODULE =====
const database = require("./config/database");
const route = require("./api/v1/routers/index.route");

// ===== 3. KHỞI TẠO APP =====
const app = express();
const port = process.env.PORT || 3000;

// ===== 4. CONNECT DATABASE =====
database.connect();

// ===== 5. MIDDLEWARE =====
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// ===== 6. ROUTES =====
route(app);

// ===== 7. START SERVER =====
app.listen(port, () => {
  console.log(`🚀 App listening on port ${port}`);
});
