/*
@author: Sagar Thapa
Date: 2024-05-02
*/

import { config } from "./config.js";
import { dbRtns } from "./dbroutines.js";
import express from "express";

//initializing router.
const router = express.Router();

//create a route to return all alerts.
router.get("/", async (req, res) => {
  try {
    let db = await dbRtns.getDBInstance();
    let alerts = await dbRtns.findAll(db, config.alertcollection);
    res.status(200).send({ alerts: alerts });
  } catch (err) {
    console.log(err.stack);
    res.status(500).send("getting all alerts failed - internal server error");
  }
});

//alert for a region
//list of countries who are in same region
router.get("/region/:getName", async (req, res) => {
  let value = req.params.getName;

  try {
    let db = await dbRtns.getDBInstance();
    let alertforregion = await dbRtns.findAll(db, config.alertcollection, {
      region: value,
    });

    if (!alertforregion) {
      res.status(404).send({ msg: "Region does not exists." });
    } else {
      res.status(200).send({ alertforregion: alertforregion });
    }
  } catch (err) {
    console.log(err.stack);
    res.status(500).send("getting alert failed - internal server error");
  }
});

//list of countries who are in same sub-region
router.get("/subregion/:getName", async (req, res) => {
  let value = req.params.getName;
  try {
    let db = await dbRtns.getDBInstance();
    let alertsforsubregion = await dbRtns.findAll(db, config.alertcollection, {
      subregion: value,
    });

    if (!alertsforsubregion) {
      res.status(404).send({ msg: "Sub-Region does not exists." });
    } else {
      res.status(200).send({ alertsforsubregion: alertsforsubregion });
    }
  } catch (err) {
    console.log(err.stack);
    res
      .status(500)
      .send("getting alert failed for subregion - internal server error");
  }
});

//add advisory to the backend database.
router.post("/addadvisory", async (req, res) => {
  try {
    let db = await dbRtns.getDBInstance();
    let parseJson = JSON.parse(JSON.stringify(req.body));
    if (!parseJson || Object.keys(parseJson).length === 0) {
      res
        .status(405)
        .send({ msg: "Server received empty or invalid user data" });
    } else {
      let advisory = await dbRtns.addOne(db, "advisory", req.body);
      res.status(200).send({ msg: "document added to advisory collection" });
    }
  } catch (err) {
    console.log(err.stack);
    res.status(500).send("Unable to post the request");
  }
});

//get advisory based on the person info.
router.get("/travellerAdvisory/:getName", async (req, res) => {
  let traveller = req.params.getName;

  try {
    let db = await dbRtns.getDBInstance();
    let alertsforTravellers = await dbRtns.findAll(db, "advisory", {
      name: traveller,
    });

    if (!alertsforTravellers) {
      res.status(404).send({ msg: "Traveller does not exists." });
    } else {
      res.status(200).send({ alertsforTravellers: alertsforTravellers });
    }
  } catch (err) {
    console.log(err.stack);
    res
      .status(500)
      .send("getting alert failed for traveller - internal server error");
  }
});

//return the list of traveller with advisory
//get advisory based on the person info.
router.get("/travellerAdvisory", async (req, res) => {
  try {
    let db = await dbRtns.getDBInstance();
    let travellerAdvisory = await dbRtns.findAll(db, "advisory");

    if (!travellerAdvisory) {
      res.status(404).send({ msg: "Traveller does not exists." });
    } else {
      res.status(200).send({ travellerAdvisory: travellerAdvisory });
    }
  } catch (err) {
    console.log(err.stack);
    res
      .status(500)
      .send("getting alert failed for traveller - internal server error");
  }
});

export const alertRouter = { router };
