/*
@author: Sagar Thapa
Date: 2024-05-02
*/

import { config } from "./config.js";
import express from "express";
//this import name should be same as export name
import { alertRouter } from "./alertroutes.js";
import cors from "cors";

//initialize the express
const app = express();

app.use(cors());

//Body parser application/json
app.use(express.json()); //Used to parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

//uses the route middleware
app.use("/api/alerts", alertRouter.router);

//This uses builtin middleware
app.use(express.static("public"));

//opens the server on port 5000
app.listen(process.env.PORT || 5000, () => {
  console.log(`Listening on port ${process.env.PORT}`);
});
