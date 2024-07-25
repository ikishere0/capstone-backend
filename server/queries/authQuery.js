const { bcrypt, prisma, jwt } = require("../shared/shared");
const JWT_SECRET = process.env.JWT_SECRET;

const registerQuery = async ({ firstName, lastName, email, password }) => {
  const hashPassword = await bcrypt.hash(password, 10);
  const registerUser = await prisma.user.create({
    data: {
      firstName,
      lastName,
      email,
      password: hashPassword,
    },
  });
  const token = jwt.sign(
    {
      id: registerUser.id,
    },
    JWT_SECRET,
    {
      expiresIn: "1h",
    }
  );
  return {
    token: token,
    firstName: registerUser.firstName,
    lastName: registerUser.lastName,
    email: registerUser.email,
  };
};

const loginQuery = async ({ email, password }) => {
  try {
    const userLogin = await prisma.user.findUnique({
      where: { email },
    });
    if (!userLogin || !bcrypt.compareSync(password, userLogin.password)) {
      return "Invalid login credentials.";
    }
    const token = jwt.sign(
      {
        id: userLogin.id,
      },
      JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );
    return {
      token: token,
      firstName: userLogin.firstName,
      lastName: userLogin.lastName,
      email: userLogin.email,
    };
  } catch (error) {
    console.log(error);
  }
};

const getAllUser = async () => {
  let allUsers;
  try {
    allUsers = await prisma.user.findMany();
  } catch (error) {
    console.log(error);
  }
  return allUsers;
};

const findUserWithToken = async (authorizationHeader) => {
  if (!authorizationHeader || !authorizationHeader.startsWith("Bearer ")) {
    throw new Error("Authorization header is missing or malformed");
  }
  const token = authorizationHeader.split(" ")[1];
  const decoded = jwt.verify(token, JWT_SECRET);
  const user = await prisma.user.findUnique({
    where: {
      id: decoded.id,
    },
  });
  if (!user) {
    throw new Error("User not found or token is invalid");
  }
  return user;
};

const destroyUser = async (userId) => {
  let byeUser;
  try {
    byeUser = await prisma.user.delete({
      where: {
        id: userId,
      },
    });
  } catch (error) {
    console.log(error);
  }
  return byeUser;
};

const alterUser = async ({ userId, firstName, lastName, password }) => {
  try {
    const saltRounds = 10;
    const hashPassword = await bcrypt.hash(password, saltRounds);

    const changedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        firstName: firstName,
        lastName: lastName,
        password: hashPassword,
      },
    });
    return changedUser;
  } catch (error) {
    console.error("Error updating user:", error);
    throw error;
  }
};

module.exports = {
  registerQuery,
  loginQuery,
  getAllUser,
  findUserWithToken,
  destroyUser,
  alterUser,
};
