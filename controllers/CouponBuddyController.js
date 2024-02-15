exports.getAffiliateUrl = async (req, res) => {
  try {
    const { userUrl } = req.body;
    const regex =
      /https:\/\/www\.ebay\.com\/itm\/\d+(?:\/[^?]+)?(\?[^#]*)?(#.*)?$|https:\/\/www\.amazon\.com\/[^\s]+/g;
    const isMatch = regex.test(userUrl);
    if (isMatch) {
      const url = new URL(userUrl);
      const platform = url.hostname === "www.ebay.com" ? "ebay" : "amazon";
      const params = generateCouponParams(platform);
      url.search = params;
      return res.status(200).json({
        data: url,
        message: "ok"
      });
    } else {
      return res.status(200).json({
        data: "",
        message: "Website is not supported for coupon generation."
      });
    }
  } catch (error) {
    res.status(500).json({ message: "failure", data: [] });
  }
};

const generateCouponParams = (platform) => {
  let params = "";
  if (platform === "ebay") {
    let mkrid = "711-53200-19255-0";
    let siteid = "0";
    let campid = "5338986070";
    let customid = "couponBuddy2024-Server";
    let toolid = "10001";
    let mkevt = "1";
    params = `?mkrid=${mkrid}&siteid=${siteid}&campid=${campid}&customid=${customid}&toolid=${toolid}&mkevt=${mkevt}`;
  } else if (platform === "amazon") {
    params = `?tag=couponbuddy20-20`;
  }
  return params;
};
