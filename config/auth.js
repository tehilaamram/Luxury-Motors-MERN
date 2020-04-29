module.exports = {
    loginRequired(req, res, next) {
        if (req.user) {
            return next();
        }
        // req.flash('error', 'Please Login first');
        return res.redirect('/login');
    }
}