/*
@author: Sagar Thapa
Date: 2024-05-02
*/

//const dotenv = require("dotenv");
import dotenv from "dotenv";
// It just gives us a way to do a bit more abstraction from the data in the .env file

dotenv.config();

let atlas = process.env.DBURL;
let appdb = process.env.DB;
let countryJWeb = process.env.ISOCOUNTRIES;
let alertcollection = process.env.ACOLLECTION;
let ccollection = process.env.CCOLLECTION;
let alertJWeb = process.env.TRAVELALERTS;
let port = process.env.PORT;
let advCollection = process.env.ADVCOLLECTION;

//exported using esModule
export const config = {
  atlas,
  appdb,
  countryJWeb,
  alertcollection,
  ccollection,
  alertJWeb,
  port,
  advCollection,
};
