const debug = require('debug')('car-rental:models');
const mongo = require('mongoose');

let db = mongo.createConnection();
(async () => {
    try {
        await db.openUri('mongodb://localhost/buy-a-luxury-vehicle', {useNewUrlParser: true, useUnifiedTopology: true});
    } catch (err) {
        debug('Error connecting to DB: ' + err);
    }
})();
debug('Pending DB connection');

require('./user')(db);
require('./vehicle')(db);
require('./order')(db);

module.exports = model => db.model(model);
