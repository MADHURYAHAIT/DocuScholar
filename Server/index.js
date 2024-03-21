const express = require("express");
const connection = require('./mongoDB/connection.js'); // Assuming this is a CommonJS module
const Users = require('./models/user.js');
const messages = require("./models/messageModel.js");
const cors = require('cors');

const fs = require('fs');
const pdfParse = require('pdf-parse');
const multer = require('multer');
const hostname = '0.0.0.0';
const port = 3000;
const app = express();

const upload = multer();


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



app.post('/pdfToText', upload.single('file'), async (req, res) => {
    try {
        const pdfBuffer = req.file.buffer; // Get the buffer of the uploaded file
        pdfParse(pdfBuffer).then(data => {
            const pdfText = data.text;
            console.log(pdfText);
            res.send(pdfText);
        }).catch(err => {
            console.error(err);
            res.status(500).send("Error occurred during PDF parsing");
        });
    } catch (error) {
        console.error(error);
        res.status(500).send("Error occurred during PDF to text conversion");
    }
});



app.post('/pdfToText',upload.single('file'),async(req,res)=>{
    try{
        //let pdfPath = 'Children.pdf';
        console.log(req.file.path);
        let pdfPath = req.body['formData'];
        fs.readFile(pdfPath, (err, pdfBuffer) => {
            if (!err) {
                pdfParse(pdfBuffer).then(data => {
                    const pdfText = data.text;
                    console.log(pdfText);
                    res.send(pdfText);
                }).catch(err => {
                    console.error(err);
                });
            } else {
                console.error(err);
            }
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).send("Error occurred during signup");
    }
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
        //res.send(req.body);
        res.send(user);
        //console.log(user);
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
    if ((req.body['messagesDataServer'])[0]!=null){ 
      console.log((req.body['messagesDataServer'])[0]);
      let msg = new messages((req.body)['messagesDataServer'][0]);
      let result = await msg.save();
      res.send(result);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Error occurred during signup");
  }
});


app.post("/fetchmessages", async (req, res) => {
  try {
    const email  = req.body;
    console.log("getting email",email);
    if (!email) {
      return res.status(400).send({ error: "Email is required" });
    }
    let user = await Users.findOne(req.body);
  
    if (!user) {
      return res.status(404).send({ error: "User not found" });
    }

    const userMessages = await messages.find(req.body);
    res.json(userMessages);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error occurred during message fetching");
  }
});


app.listen(port, () => {
  console.log(`Server is running on http://${hostname}:${port}`);
});
