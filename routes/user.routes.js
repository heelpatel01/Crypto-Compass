const router = require("express").Router();
const {
  handleSignup,
  handleLogin,
  handleBalanceFetching,
} = require("../controllers/user.controller.js");

router.post("/signup", handleSignup);
router.post("/login", handleLogin);
router.get("/balance", handleBalanceFetching);

module.exports = router;
