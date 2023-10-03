// mixpanelService.js
const mixpanel = require('mixpanel').init(process.env.MIXPANEL_TOKEN);

module.exports = mixpanel;
