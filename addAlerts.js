import { config } from "./config.js";
import { dbRtns } from "./dbroutines.js";

//load alerts to the mongoDb
const loadAlerts = async () => {
  try {
    let alertJson;
    //get alert json from web
    alertJson = await dbRtns.getJSONFromWWWPromise(config.alertJWeb);
    let db = await dbRtns.getDBInstance();

    //deletes all the document before adding any
    let results = await dbRtns.deleteAll(db, config.alertcollection);
    console.log(
      `deleted ${results.deletedCount} documents from Alert collection`
    );

    let alert;
    let resultArray = await Promise.allSettled(
      countryJson.map((country) => {
        alertJson.data[country["alpha-2"]] !== undefined
          ? (alert = {
              country: country["alpha-2"],
              name: country.name,
              text: alertJson.data[country["alpha-2"]].eng["advisory-text"],
              date: alertJson.data[country["alpha-2"]]["date-published"].date,
              region: country.region,
              subregion: country["sub-region"],
            })
          : (alert = {
              country: country["alpha-2"],
              name: country.name,
              text: "No travel alerts",
              date: "",
              region: country.region,
              subregion: country["sub-region"],
            });

        return dbRtns.addOne(db, collections, alert);
      })
    );
  } catch (ex) {
    console.log(err);
  } finally {
    process.exit();
  }
};

loadAlerts();
