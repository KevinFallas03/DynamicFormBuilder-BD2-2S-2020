const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
require('dotenv/config');

const app = express();

app.set("port", process.env.PORT || 5000);

/* Middlewares */
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

// Print JSONS
app.use( express.urlencoded({ extended: true }) );

/* Routes */
app.use("/api/xyz", require("./routes/xyz"));
app.use("/api/form", require("./routes/form"));
app.use("/api/template", require("./routes/template"));
// Methods related to access (Register, Log In)
app.use("/", require("./routes/access"));

// Home page of the logged user
app.use("/home", require("./routes/home"));

// Approval service
app.use("/approval", require("./routes/approval"));



module.exports = app;