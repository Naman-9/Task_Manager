const express = require("express");
const cors = require('cors');
const dotenv =require("dotenv").config();
const connectDB = require("./config/connectDB");
const mongoose = require("mongoose");
const Task = require("./models/taskModel");
const taskroutes = require("./routes/taskRoutes");

const app = express();


// MIDDLEWARES :: functions that have access to req obj, res obj, in thae app response cycle

app.use(express.json());    // custom middleware> to access body of request
app.use(express.urlencoded({ extended: false })); // can have access to form data
app.use(cors());

app.use("/api/tasks", taskroutes);  // calling task routes



// ROUTES

app.get("/", (req, res) => {
    res.send("Home Page");
});


const PORT = process.env.PORT || 5000;

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(PORT, () => {
            console.log(`server is running on ${PORT}`);
        });
    })
    .catch((err) => console.log(err));