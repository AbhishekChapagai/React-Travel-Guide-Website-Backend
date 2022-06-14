const express = require('express');
const cors = require('cors');
const app = express()
const db = require('./database/database.js')
require("dotenv").config();


// Use
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());


// Routes
const userRoutes = require("./routes/userRoutes");
app.use("/user", userRoutes)

const guideRoutes = require("./routes/guideRoutes");
app.use("/guide", guideRoutes)

// Listen
app.listen(3000);

