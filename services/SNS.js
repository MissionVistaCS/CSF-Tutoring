const AWS = require('aws-sdk');

let sns = new AWS.SNS();

module.exports = {
    sendSMS: function(message, phoneNumber, fn) {
        let messageParams = {
            Message: message,
            MessageStructure: 'string',
            PhoneNumber: '+1' + phoneNumber,
        };
        sns.publish(messageParams, function(err, data) {
            if(err) {
                fn(err);
            } else {
                console.info('Sent message ' + message + ' to ' + messageParams.PhoneNumber);
                fn(null, data);
            }
        });
    }
}