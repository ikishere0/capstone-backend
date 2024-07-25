const {
  loginQuery,
  getAllUser,
  destroyUser,
  alterUser,
  registerQuery,
} = require("../queries/authQuery");

const register = async (req, res) => {
  const token = await registerQuery(req.body);
  res.send(token);
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const loginResponse = await loginQuery({ email, password });
    res.json(loginResponse);
  } catch (error) {
    console.error(error);
    res.status(401).send("Invalid login credentials.");
  }
};

const displayAll = async (req, res, next) => {
  const users = await getAllUser();
  res.send(users);
};

const deleteUser = async (req, res, next) => {
  const userId = req.params.id;
  const delUser = await destroyUser(userId);
  res.send(delUser);
};

const updateUser = async (req, res, next) => {
  const userId = req.params.id;
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const password = req.body.password;
  try {
    const changedUser = await alterUser({
      userId,
      firstName,
      lastName,
      password,
    });
    res.json(changedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update user" });
  }
};

module.exports = {
  register,
  login,
  displayAll,
  deleteUser,
  updateUser,
};
