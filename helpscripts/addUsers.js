var User = require('../models')("User");
const crypto = require('crypto');



(async () => {
    var mykey = crypto.createCipher('aes-128-cbc', 'luxury');
    var encryptedPassword = mykey.update('1234', 'utf8', 'hex')
    encryptedPassword += mykey.final('hex');
    User.register(new User({ username: 'tehilaamr@gmail.com', role: 'admin', fullName: 'Tehila Amram' }), encryptedPassword, function (err, user) {
        if (err) {
            console.log(err, ' error');
        }
        process.exit(0);
    });
    User.register(new User({ username: 'lital@gmail.com', role: 'admin', fullName: 'Lital Maudah' }), encryptedPassword, function (err, user) {
        if (err) {
            console.log(err, ' error');
        }
        process.exit(0);
    });
})();