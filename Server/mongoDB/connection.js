
import mongoose from "mongoose";
import { MongoClient, ServerApiVersion } from "mongodb";
mongoose.connect("mongodb+srv://mady:abc12345@cluster0.i5niiwg.mongodb.net/DocuScholar?retryWrites=true&w=majority");
console.log("Connection file running");

// const client = new MongoClient('mongodb+srv://mady:abc12345@cluster0.i5niiwg.mongodb.net/DocuScholar?retryWrites=true&w=majority', {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   }
// });

// async function run() {
//   try {
//     // Connect the client to the server	(optional starting in v4.7)
//     await client.connect();
//     // Send a ping to confirm a successful connection
//     await client.db("admin").command({ ping: 1 });
//     console.log("Pinged your deployment. You successfully connected to MongoDB!");
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
// }
// run().catch(console.dir);
