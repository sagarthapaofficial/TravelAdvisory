/*
@author: Sagar Thapa
Date: 2024-05-02
*/

import { MongoClient, ServerApiVersion } from "mongodb";
import got from "got";
//atlas is link and appdb is databaseName comming from config.js
import { config } from "./config.js";
let db;
//gets dbInstance
const getDBInstance = async () => {
  if (db) {
    console.log("using established connection");
    return db;
  }
  try {
    console.log("establishing new connection to Atlas");
    //sets up connection with mongodb
    const conn = await new MongoClient(config.atlas, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      },
    });

    db = conn.db(config.appdb);
  } catch (err) {
    console.log(err);
  }
  return db;
};

//GetJson file from web
const getJSONFromWWWPromise = (url) => {
  let srcAddr = url;

  return new Promise((resolve, reject) => {
    got(srcAddr, { responseType: "json" })
      .then((response) => {
        let countries = response.body;
        resolve(countries);
      })
      .catch((err) => {
        console.log(`Error==>${err}`);
        reject(err);
      });
  });
};

const findAll = (db, coll, criteria, projection) =>
  db.collection(coll).find(criteria).project(projection).toArray();

const addOne = (db, coll, doc) => db.collection(coll).insertOne(doc);

//deletes all the coll for the db
const deleteAll = (db, coll) => db.collection(coll).deleteMany({});

const findOne = (db, coll, criteria) => db.collection(coll).findOne(criteria);
//update one
function updateOne(db, coll, criteria, projection) {
  return db.collection(coll).findOneAndUpdate(criteria, { $set: projection });
}
const findUniqueValues = (db, coll, field) =>
  db.collection(coll).distinct(field);

const deleteOne = (db, coll, criteria) =>
  db.collection(coll).deleteOne(criteria);

export const dbRtns = {
  getJSONFromWWWPromise,
  getDBInstance,
  addOne,
  findAll,
  deleteAll,
  findOne,
  updateOne,
  findUniqueValues,
  deleteOne,
};
