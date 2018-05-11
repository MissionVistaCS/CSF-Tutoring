var striptags = require('striptags');

module.exports = {
    /**
     * Protects against a JSON vulnerability. Prepends ")]}',\n" to all JSON responses
     */
    jsonVuln: function (req, res, next) {
        res.json = function (data) {
            var strData = typeof data == 'object' ? JSON.stringify(data) : data;
            strData = ")]}',\n" + strData;
            res.set('Content-Type', 'text/json');
            res.send.call(res, strData);
        };
        next();
    },

    /**
     * Protects against injection attacks and XSS
     */
    stripRequest: function(req, res, next) {
        for (var key in req.body) {
            if (req.body.hasOwnProperty(key)) {
                req.body[key] = striptags(req.body[key]);
            }
        }
        for (var key in req.query) {
            if (req.query.hasOwnProperty(key)) {
                req.query[key] = striptags(req.query[key]);
            }
        }
        for (var key in req.params) {
            if (req.params.hasOwnProperty(key)) {
                req.params[key] = striptags(req.params[key]);
            }
        }
        next();
    }
}