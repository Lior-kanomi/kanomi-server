const mongoose = require("mongoose");

const BrandSchema = new mongoose.Schema({
  brand: {
    type: String,
    required: true,
  },
  version: {
    type: String,
    required: true,
  },
});

const UserAgentSchema = new mongoose.Schema({
  HTTP_User_Agent: {
    type: String,
    required: true,
  },
  brands: {
    type: [BrandSchema],
    required: true,
  },
  uaFullVersion: {
    type: String,
    required: true,
  },
  fullVersionList: {
    type: [BrandSchema],
    required: true,
  },
  Sec_CH_UA: {
    type: String,
    required: true,
  },
  Sec_CH_UA_Full_Version: {
    type: String,
    required: true,
  },
  Sec_CH_UA_Full_Version_List: {
    type: String,
    required: true,
  },
});

const UserAgent = mongoose.model("UserAgent", UserAgentSchema);

module.exports = UserAgent;
