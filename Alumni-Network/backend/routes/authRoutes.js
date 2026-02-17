const express = require("express");
const router = express.Router();

const {
  register,
  login,
  registerInstitute,
} = require("../controllers/authController");

router.post("/register", register);
router.post("/login", login);
router.post("/register-institute", registerInstitute);

module.exports = router;
