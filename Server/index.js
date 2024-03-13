
import express from "express";
import  './mongoDB/connection.js'; 
import Users from './models/user.js';

import cors from 'cors';

import bodyParser from "body-parser";

const port = 3000; 
const app = express();
app.use(express.json());
app.use(cors());

app.post("/submit", (req, res) => {
    res.log(req.body);
    res.send("Data received ...");
});

// app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    // res.sendFile(__dirname + "/public/index.html");
    res.send("app runnin");
});

app.post("/signup", async (req, res) => {
    let user = new Users(req.body);
    let result = await user.save();
    console.log(req.body);
    res.send("Signp Data received");
});

app.post("/login", async (req, res) => {
    
    console.log(req.body);
    res.send(" Login Data received");
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
