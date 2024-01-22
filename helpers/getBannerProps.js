const bannerWebsites = require("../constants/Banner");

exports.getBannerProps = (hostname) => {
  const style = `
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-image: linear-gradient(45deg, white, transparent);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
    border-radius: 10px;
    padding: 20px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
    z-index: 10001;
    width: 450px;
    min-height: 500px;
  `;

  const present_box = "present_box.png";
  const present_box2 = "present_box2.png";

  switch (hostname) {
    case bannerWebsites.AMAZON_WEBSITE:
      return {
        message:
          "Looking for better prices than Amazon? Click here for amazing deals!",
        style: style,
        image: present_box
      };
    case bannerWebsites.EBAY_WEBSITE:
      return {
        message:
          "eBay's good, but we've found even better deals! Click to see more.",
        style: style,
        image: present_box2
      };
    case bannerWebsites.WAYFAIR_WEBSITE:
      return {
        message:
          "Find more for your home for less. Better deals than Wayfair await!",
        style: style,
        image: present_box2
      };
    case bannerWebsites.WALMART_WEBSITE:
      return {
        message:
          "Save more than ever with deals better than Walmart! Click now!",
        style: style,
        image: present_box
      };
    case bannerWebsites.ETSY_WEBSITE:
      return {
        message: "Explore unique finds at prices lower than Etsy! Click here!",
        style: style,
        image: present_box
      };
    case bannerWebsites.HOMEDEPOT_WEBSITE:
      return {
        message:
          "Building a project? Get supplies cheaper than Home Depot here!",
        style: style,
        image: present_box2
      };
    case bannerWebsites.BEST_BUY_WEBSITE:
      return {
        message:
          "Before buying at Best Buy, click here for potentially better tech deals!",
        style: style,
        image: present_box2
      };
    default:
      return {
        message: "Why settle for less? Click for better deals and savings!",
        style: style,
        image: present_box
      };
  }
};
