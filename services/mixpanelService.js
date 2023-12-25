// mixpanelService.js
const isDev = process.env.NODE_ENV !== "production";
const mixpanelToken = isDev
  ? process.env.MIXPANEL_TOKEN_TEST
  : process.env.MIXPANEL_TOKEN;
const mixpanel = require("mixpanel").init(mixpanelToken);

module.exports = mixpanel;
