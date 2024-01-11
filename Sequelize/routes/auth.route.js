const { Router } = require("express");
const router = Router();
const {
  getLoginPage,
  loginUser,
  logout,
  getRegisterPage,
  registerUser,
} = require("../controllers/auth.controller");
const { guest, protected } = require("../middlewares/auth");

router.get("/login", guest, getLoginPage);
router.get("/logout", protected, logout);
router.get("/registration", guest, getRegisterPage);

router.post("/login", guest, loginUser);
router.post("/registration", guest, registerUser);

module.exports = router;
