const mongoose = require("mongoose");

const URI = process.env.DB_CONNECTION || "mongodb://localhost/dynamic_forms"; // cluster or local database for testing


mongoose.connect(
    URI, 
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
).then(
    (db) => {
        console.log(`Connected to DB with '${URI}'`);
    }
).catch(
    (err) => {
        console.error(err);
    }
);

module.exports = mongoose;