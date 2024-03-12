import { dirname } from "path";
import express from "express";
import { fileURLToPath } from "url";
import bodyParser from "body-parser";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = 3000; 

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    // res.sendFile(__dirname + "/public/index.html");
    res.sendFile("app runnin");
});

app.post("/submit", (req, res) => {
    console.log(req.body);
    res.send("Data received");
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
