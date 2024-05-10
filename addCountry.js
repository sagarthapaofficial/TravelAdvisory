import { config } from "./config.js";
import { dbRtns } from "./dbroutines.js";

//load countries to the mongoDb
const loadCountries = async () => {
  try {
    let countryJson;
    countryJson = await dbRtns.getJSONFromWWWPromise(config.countryJWeb);
    let db = await dbRtns.getDBInstance();

    //deletes all the document before adding any
    let results = await dbRtns.deleteAll(db, config.ccollection);
    console.log(
      `deleted ${results.deletedCount} documents from Countries collection`
    );

    let resultArray = await Promise.allSettled(
      //maps out from the list of country object
      countryJson.map((country) => {
        //adds the document to the database
        return dbRtns.addOne(db, config.countryJWeb, {
          name: country.name,
          code: country["alpha-2"],
        });
      })
    );
  } catch (ex) {
    console.log(err);
  } finally {
    process.exit();
  }
};

loadCountries();
