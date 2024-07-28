const express = require("express");
const {
  register,
  login,
  displayAll,
  deleteUser,
  updateUser,
  getUserProfile,
  deleteAccount,
} = require("../controllers/authController");
const { findUserWithToken } = require("../queries/authQuery");

const router = express.Router();

const isLoggedIn = async (req, res, next) => {
  try {
    req.user = await findUserWithToken(req.headers.authorization);
    next();
  } catch (error) {
    next(error);
  }
};

router.post("/register", register);
router.post("/login", login);
router.get("/all_users", isLoggedIn, displayAll);
router.delete("/:id/delete", isLoggedIn, deleteUser);
router.put("/:id/change", isLoggedIn, updateUser);
router.get("/profile", isLoggedIn, getUserProfile);
router.delete("/deleteAccount", isLoggedIn, deleteAccount);

module.exports = router;
module.exports.isLoggedIn = isLoggedIn;
