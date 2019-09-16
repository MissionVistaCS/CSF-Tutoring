let https = require('https');

module.exports = {
    verify: function (key, callback) {
        https.get(_strings.get('recaptcha.url').format(_keys.get('recaptcha.private'), key), function (res) {
            let data = "";
            res.on('data', function (chunk) {
                data += chunk.toString();
            });
            res.on('end', function () {
                try {
                    let parsedData = JSON.parse(data);
                    console.log(parsedData);
                    callback(parsedData.success);
                } catch (e) {
                    callback(false);
                }
            });
        });
    }
};