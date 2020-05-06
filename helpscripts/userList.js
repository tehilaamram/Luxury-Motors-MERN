const User = require('../models')("User");
var users;
(async () => {
    try {
        users = await User.find({});
        console.log(users);
    } catch (err) { console.log(`Failed: ${err}`) }
    process.exit(0);
})();