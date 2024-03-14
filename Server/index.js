import express from "express";
import './mongoDB/connection.js'; 
import Users from './models/user.js';
import cors from 'cors';

const hostname = '0.0.0.0'; 
const port = 3000; 
const app = express();

app.use(express.json());

// Enable CORS for all origins
app.use(cors());

// Endpoint to submit data
app.post("/submit", (req, res) => {
    console.log(req.body);
    res.send("Data received ...");
});

// Endpoint to serve homepage
app.get("/", (req, res) => {
    res.send("App running");
});

// Endpoint to handle user signup
app.post("/signup", async (req, res) => {
    try {
        let user = new Users(req.body);
        let result = await user.save();
        console.log(req.body);
        res.send(result);
    } catch (error) {
        console.error(error);
        res.status(500).send("Error occurred during signup");
    }
});

// Endpoint to handle user login
app.post("/login", async (req, res) => {

    try {
        
        if (req.body.email && req.body.password) {
            let user = await Users.findOne(req.body);
            if (user) {
                res.send(user);
                console.log("Login Data received");
            } else {
                res.status(401).send({ result: "Invalid Email or Password" });
            }
        } else {
            res.status(400).send({ result: "Invalid Email or Password" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Error occurred during login");
    }
});

app.post("/message", async (req, res) => {
    try {

        // let user = new Users(req.body);
        // let result = await user.save();
        req.body['messagesDataServer'].forEach(async (element) => {
            let chamt= element;
            console.log(chamt);
        });
        //res.send(result);
    } catch (error) {
        console.error(error);
        res.status(500).send("Error occurred during signup");
    }
});



app.listen(port, hostname, () => {
    console.log(`Server is running on http://${hostname}:${port}`);
});
