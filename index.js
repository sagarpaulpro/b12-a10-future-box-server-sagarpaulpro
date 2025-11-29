require('dotenv').config();
const { MongoClient, ServerApiVersion } = require('mongodb');
const express = require('express');
const cors = require('cors')
const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());
app.use(cors())
const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@plateshare.fj8ri9v.mongodb.net/?appName=PlateShare`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

app.get('/', (req, res) => {
  res.send('Server is running.');
})

async function run() {
  try {
    await client.connect();
    const database = client.db('PlateShare');
    const foods = database.collection('foods');

    app.post('/addfood', async (req, res) => {
      const query = req.body;
      const result = await foods.insertOne(query);
      console.log(result);
      res.send();
    } )
    app.get('/food', async (req, res)=>{
      const result = await foods.find().toArray();
      res.send(result)
    })
}
  finally {

  }
}
run().catch(console.dir);

app.listen(port, () => {
  console.log(`Server running on ${port}`)
})