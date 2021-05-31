module.exports = function(req, res, next) {
    if (!req.session.isAuthenticated) {
        return res.send({ok: false})
    }
    next()
}