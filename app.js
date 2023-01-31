// Calls the express function to start a new Express application
const express = require('express');
// const mongodb = require('mongodb');
const { MongoClient } = require("mongodb");

const app = express();
const port = 3000;

// Replace the uri string with your connection string.
const uri =
  "mongodb+srv://Jubayer:Jubayer@cluster0.jwtcn5h.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(uri);

async function run() {
  try {
    const database = client.db('webstore');
    const orders = database.collection('orders');

    const query = { name: 'John Doe' };
    const Orders = await orders.findOne(query);
    console.log(Orders);

    // when /lesson is acessed, the lesson array is sent as the response
    app.get('/lessons', (req, res) => {
      client.connect(err => {
        const database = client.db('webstore');
        const lessons = database.collection('lessons');
        lessons.find({}).toArray((error, lessonDocuments) => {
          if (error) {
            res.status(500).send(error);
          } else {
            res.send(lessonDocuments);
          }
          client.close();
        });
      });
    });

    // when /orders is acessed, the orders array is sent as the response
    app.get('/orders', (req, res) => {
      client.connect(err => {
        const database = client.db('webstore');
        const lessons = database.collection('orders');
        lessons.find({}).toArray((error, lessonDocuments) => {
          if (error) {
            res.status(500).send(error);
          } else {
            res.send(lessonDocuments);
          }
          client.close();
        });
      });
    });



//incase of any error
app.use(function(request, response){
  response.status(404).send("Page not found. Enter /lessons  or /orders");

});


//running the server
app.listen(3000, () => {
console.log('App listening on port 3000');
});


  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);





