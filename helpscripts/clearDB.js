const mongo = require("mongoose");

(async () => {
  try {
      let db = await mongo.createConnection('mongodb://localhost/luxury-motors', {useNewUrlParser: true, useUnifiedTopology: true});
      await db.dropDatabase();
      console.log('DB cleared');
  } catch (err) {
      console.log("Failed: " + err);
  }
  process.exit(0);
})();