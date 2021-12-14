//this will handle our mongoose operations
const mongoose = require('mongoose');


const mongoDB = 'mongodb://localhost/database';
const {Schema} = mongoose;
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'mongodb connection error'));

//define schema

let clothingSchema = mongoose.Schema({
  _id: String,
  name: String,
  description: String,
  brand: String,
  type: String
})
let Clothing= mongoose.model("Clothing", clothingSchema, "myCollection")

//saveorupdate a new record based on the id being name + brand
let save = async (record) => {

  //create a new document to insert into the collection
  let newDoc = new Clothing({_id: `${record.name}-${record.brand}`, name: record.name, brand: record.brand, description: record.description, type: record.type});
  await newDoc.save((err, doc) => {
    if (err) return console.error(err);
    console.log('document inserted!')
  })


}
//grabs all records
let findAll = async () => {
  let findDb = await Clothing.find({});
  return findDb;
}
//searches records
let findRecords = async (record) => {
  //first make an object to search for with the brands out of this record
  let searchArr = [];
  record.forEach(x=> {
    searchArr.push({brand: x});
  });
 //use $or operator to search independantly each condition in the searchArr array of objects
  let results = await Clothing.find({$or: searchArr});
  return results;
}
//deletes a record by _id
let deleteRecord = async (record) => {
  let id = record._id;
  await Clothing.deleteOne({_id: id}, err => {
    if (err) console.log(err);
  })
  return true;
}
module.exports.save = save;
module.exports.findAll = findAll;
module.exports.findRecords = findRecords;
module.exports.deleteRecord = deleteRecord;