const mongo = require("mongoose");

(async () => {
  try {
      let db = await mongo.createConnection('mongodb://localhost/buy-a-luxury-vehicle', {useNewUrlParser: true, useUnifiedTopology: true});
      await db.dropDatabase();
      console.log('DB cleared');
  } catch (err) {
      console.log("Failed: " + err);
  }
})();