const User = require("../models/user.models");

async function handleSignup(req, res) {
  const { userName, email, password } = req.body;

  if (!userName || !email || !password) {
    return res.json({
      success: false,
      message: "Fill all the fields to signup!",
    });
  }

  try {
    const isUserExist = await User.findOne({ email });

    if (isUserExist) {
      return res.json({
        success: false,
        message: "User with this email already exists!",
      });
    }

    const user = await User.create({
      userName,
      email,
      password,
    });

    user.save();

    if (user) {
      res.cookie("userId", user._id, { httpOnly: true });
      return res.status(200).json({
        success: true,
        message: "User Created Successfully",
        user,
      });
    }
  } catch (error) {
    console.log("Error while signup!");
    return res.status(500).json({
      success: false,
      message: "Server Side Error While Signup " + error,
    });
  }
}

async function handleLogin(req, res) {
  const { userNameOrEmail, password } = req.body;

  if (!userNameOrEmail || !password) {
    return res.status(400).json({
      success: false,
      message: "Please fill all fields!",
    });
  }

  try {
    const user = await User.findOne({
      $or: [{ userName: userNameOrEmail }, { email: userNameOrEmail }],
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found!",
      });
    }

    if (password != user.password) {
      return res.status(400).json({
        success: false,
        message: "Please enter correct password!",
      });
    }

    res.cookie("userId", user._id, { httpOnly: true });

    return res.status(200).json({
      success: true,
      message: "User loggedin successfully.",
      user,
    });
  } catch (error) {
    console.log("LN-85 Error while login");
    return res.status(500).json({
      success: false,
      message: "Error while login",
    });
  }
}

async function handleLogout(req, res) {
  if (req.cookies.userId) {
    return res.clearCookie("userId").json({
      success: true,
      message: "User loggedout successfully!",
    });
  }
}

async function handleBalanceFetching(req, res) {
  const userId = req.cookies.userId;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(500).json({
        success: false,
        message: "User Not Found For Balance!",
      });
    }

    const totalBalance = user.investableBalance + user.investedBalance;

    return res.status(200).json({
      success: true,
      investableBalance: user.investableBalance,
      investedBalance: user.investedBalance,
      totalBalance: totalBalance,
    });
  } catch (error) {
    console.log("Error fetching balance:", error);
    return res.status(500).json({
      success: false,
      message: "Server Side Error While Fetching Balance",
    });
  }
}
module.exports = {
  handleSignup,
  handleLogin,
  handleLogout,
  handleBalanceFetching,
};
