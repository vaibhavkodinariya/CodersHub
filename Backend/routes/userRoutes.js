const express = require("express");
const {
  login,
  logout,
  refreshAccessToken,
} = require("../controllers/userController");
const { verifyJWT } = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/login", login);
router.post("/logout", verifyJWT, logout);
router.post("/refresh", refreshAccessToken);

module.exports = router;
