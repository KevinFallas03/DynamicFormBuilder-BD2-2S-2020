const app = require("./app"); // app with routers and middlewares binded
require("./database"); // to connect with database

// starting the server
app.listen(
    app.get("port"), 
    () => {
        console.log(`Server running on port ${app.get("port")}`);
    }
);