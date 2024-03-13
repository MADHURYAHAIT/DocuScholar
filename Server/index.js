
import express from "express";
import  './mongoDB/connection.js'; 
//import messageModel from "./models/messageModel.js";
import bodyParser from "body-parser";

const port = 3000; 
const app = express();
app.use(express.json());
app.post("/submit", (req, res) => {
    res.log(req.body);
    res.send("Data received ...");
});

// app.use(bodyParser.urlencoded({ extended: true }));

// app.get("/", (req, res) => {
//     // res.sendFile(__dirname + "/public/index.html");
//     res.sendFile("app runnin");
// });

// app.post("/submit", (req, res) => {
//     console.log(req.body);
//     res.send("Data received");
// });

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
