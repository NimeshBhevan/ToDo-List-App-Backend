const express = require("express");
const app = express();
const mongoose = require("mongoose");
const morgan = require("morgan");
require("dotenv").config();
const authJWT = require("./helpers/jwt")

const cors = require("cors");
app.use(cors());
app.options("*", cors());

app.use(express.json());
app.use(morgan("tiny"));
app.use(authJWT);

// declaring the routes
const UserRoutes = require("./routes/users");
const ToDoRoutes = require("./routes/todo");

app.use(`/api/users`, UserRoutes);
app.use(`/api/todo`, ToDoRoutes);


// used mongoose to connect to MongoDB database. 
mongoose
	.connect(process.env.CONNECTION_STRING, { dbName: "todo-list-app" })
	.then(() => {
		console.log("Connected to the database");
	})
	.catch((error) => {
		console.log("Error connecting to database", error);
	});


// running the server at port 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running at ${PORT}`);
});
