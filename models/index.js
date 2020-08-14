const debug = require('debug')('car-rental:models');
const mongo = require('mongoose');

let db = mongo.createConnection();
(async () => {
    try {
        await db.openUri('mongodb://localhost/luxury-motors', {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false});
    } catch (err) {
        debug('Error connecting to DB: ' + err);
    }
})();
debug('Pending DB connection');

require('./user')(db);
require('./vehicle')(db);
require('./order')(db);
require('./chatRoom')(db);
require('./chatMessage')(db);
require('./request')(db);
require('./comment')(db);
require('./vehicleOrder')(db);

module.exports = model => db.model(model);
