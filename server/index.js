const express = require('express');
const app = express();
const port= 3001;
const proxy = require('http-proxy-middleware');
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('../database/index');
app.use(cors());
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

app.listen(port, ()=> {
  console.log('listening on port', port);
})

//npm module cors
app.post('/save', async (req, res) => {
let data = req.body;
//now with this data we want to save it to our database
  await db.save(data);
  res.status(200).send(req.body)
});
app.get('/clothing', async (req, res) => {
  //when we get a request to get clothing,get the clothing from database and return
  let allClothing = await db.findAll();
  res.send(allClothing);
});
app.post('/brands', async (req, res) => {
  //now we want to search our database for all the brands matching this one
  let findBrands = await db.findRecords(req.body);
  res.send(findBrands);

});
app.post('/remove', async (req, res) => {
  //print our remove data
  let removeItem = req.body;
  await db.deleteRecord(removeItem);
  res.sendStatus(200);
})