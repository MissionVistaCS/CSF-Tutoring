const boiler = require(_base + 'middleware/Boiler'),
    auth = require(_base + 'middleware/Authentication'),
    TutorRequestEntry = require(_base + 'models/TutorRequestEntry'),
    sprintf = require('sprintf-js').sprintf,
    SNS = require(_base + 'services/SNS');

const NAME = 'Notify User';

/**
 * Notifies a tutor associated with the given tutoring request entry
 */
module.exports = {
    '/api/notify-user': {
        methods: ['post'],
        middleware: [auth.ensureAdmin, boiler.requireFields(['request']), boiler.makeAlphaSpecials(['request']), boiler.handleErrors],
        fn: function (req, res, next) {
            const id = req.body.request;

            TutorRequestEntry.findOne({_id: id}).populate('tutor').exec(function (err, entry) {
                if (err) {
                    return res.sendBaseResponse(NAME, new UserError('Mongoose error w/ querying user: duplicate key, invalid field types, etc.'));
                }

                if (!entry) {
                    return res.sendBaseResponse(NAME, new UserError('No entry found with that id'));
                }

                let message = sprintf("Here is the information for the student that you will be tutoring.\n\nStudent Information:\n%s\n%s\nNeeds help with:\n%s\n\nParent Information:\n%s\n%s\n\n" +
                    "To accept this pairing, open %s\n\n**If this match doesn't work out, please let me know so that I can assign you and the student someone else!**\n\nRemember to:\n1. Call the parent first, ASAP!\n" +
                    "2. Tell them what form of payment you are asking for (hours/money). Make sure it matches what they've requested.\n3. Set up meeting times.\n4. Log your meetings.\n5. Let me know when the student no longer needs your services!!",
                    entry.fullName, entry.cellPhoneNum, entry.courses.join(', '), entry.parentFullName, entry.parentCellPhoneNum, ''); //TODO: Add link to accept pairing
                SNS.sendSMS(message, entry.tutor.cellPhoneNum.replaceAll('-', ''), function (err, data) {
                    if (err) {
                        return res.sendBaseResponse(NAME, new UserError('Error in sending text message (AWS)'));
                    }

                    entry.notifications.push(Date.now());
                    entry.save(function (err) {
                        if (err) {
                            return res.sendBaseResponse(NAME, new UserError('Mongoose error w/ querying user: duplicate key, invalid field types, etc.'));
                        }

                        res.sendBaseResponse(NAME, null, 'Sent notification to user and updated entry.');
                    });
                });
            });
        }
    }
};
