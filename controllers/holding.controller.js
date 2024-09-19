const Holding = require("../models/holding.model");

async function handlePortfolio(req, res) {
  const userId = req.cookies.userId;

  if (!userId) {
    return res.status(500).json({
      successful: false,
      message: "User ID not received for handlePortfolio...",
    });
  }

  try {
    const holdings = await Holding.find({ userId });

    if (holdings.length === 0) {
      return res.status(200).json({
        successful: true,
        message: "User has no holdings.",
        holdings: [],
      });
    }
    
    return res.status(200).json({
      successful: true,
      holdings,
    });
  } catch (error) {
    console.error("Error fetching portfolio:", error);
    return res.status(500).json({
      successful: false,
      message: "Error fetching portfolio.",
    });
  }
}

module.exports = {
  handlePortfolio,
};
