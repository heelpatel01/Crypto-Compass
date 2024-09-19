const router = require("express").Router();
const {handleBuy, handleSell}=require("../controllers/transaction.controller")

router.post("/buy",handleBuy);
router.post("/sell",handleSell);

module.exports=router;