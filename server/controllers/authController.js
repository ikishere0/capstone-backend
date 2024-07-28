const bcrypt = require("bcrypt");
const { PrismaClient } = require("@prisma/client");
const jwt = require("jsonwebtoken");

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET;

const register = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
        password: hashedPassword,
      },
    });

    const token = jwt.sign(
      {
        id: newUser.id,
      },
      JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      token: token,
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      email: newUser.email,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Registration failed",
      error: error.message,
    });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await prisma.user.findUnique({ where: { email: email } });
    if (!user) {
      return res.status(401).json({ message: "Invalid login credentials." });
    }

    console.log("User Password from DB:", user.password);
    console.log("Provided Password:", password);

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ message: "Invalid login credentials." });
    }

    const token = jwt.sign(
      {
        id: user.id,
      },
      JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    res.json({
      token: token,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error.");
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
  const userDetails = req.body;
  const updatedUser = await alterUser(userId, userDetails);
  res.send(updatedUser);
};

module.exports = {
  register,
  login,
  displayAll,
  deleteUser,
  updateUser,
};
