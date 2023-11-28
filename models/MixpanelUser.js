const mongoose = require('mongoose');

const mixpanelUserSchema = new mongoose.Schema({
    Id: { type: String, required: true },
    OSVersion: { type: String, required: true },
    DefaultBrowser: { type: String, required: true },
    ABTestingGroup: { type: String, required: true },
    InstallerResult: { type: String, required: true },
    ChromaxVersion: { type: String, required: true },
    ChromiumVersion: { type: String, required: true },
    IP: { type: String, required: true } // IP field
    // Add more fields as required
});

const UserModel = mongoose.model('MixpanelUser', mixpanelUserSchema);

module.exports = UserModel;
