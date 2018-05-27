const AWS = require('aws-sdk');
const async = require("async");

const User = require(_base + 'models/User');

let sns = new AWS.SNS();

function sendMessage (message, phoneNumber, fn) {
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

function sendToAdmins (message, fn) {
    User.find({ userGroup: { $all: ['ADMIN'] }, verified: true }, function (err, users) {
        if (err) {
            return fn(err);
        }

        async.each(users, function (user, fn) {
            sendMessage(message, user.cellPhoneNum.replaceAll('-', ''), function (err) {
                if (err) {
                    return fn(err);
                }

                fn();
            });
        }, function (err) {
            if (err) {
                fn(err);
            }
        });
    });
}

module.exports = {
    sendSMS: sendMessage,
    sendToAdmins: sendToAdmins
};