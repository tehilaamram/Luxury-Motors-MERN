module.exports = {
    ensureAuthenticated: function(req, res, next) {
      if (req.isAuthenticated()) {
        console.log(req.user)
        return next();
      }
      res.sendStatus(401);
    },
    ensureWorkerAuthenticated: function(req, res, next) {
      if (req.isAuthenticated() && (req.user.role === "worker" || req.user.role === "admin")) {
        return next();
      }
      res.sendStatus(401);
    },
    ensureAdminAuthenticated: function(req, res, next) {
      if (req.isAuthenticated() && req.user.role === "admin") {
        return next();
      }
      res.sendStatus(401);
    },
};