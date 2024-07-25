const { route } = require("../shared/shared");
const { findUserWithToken } = require("../queries/authQuery");
const {
  register,
  login,
  displayAll,
  deleteUser,
  updateUser,
} = require("../controllers/authController");

const isLoggedIn = async (req, res, next) => {
  try {
    req.user = await findUserWithToken(req.headers.authorization);
    next();
  } catch (error) {
    next(error);
  }
};

route.post("/register", register);
route.post("/login", login);
route.get("/all_users", isLoggedIn, displayAll);
route.delete("/:id/delete", isLoggedIn, deleteUser);
route.put("/:id/change", isLoggedIn, updateUser);

module.exports = route;
module.exports.isLoggedIn = isLoggedIn;
