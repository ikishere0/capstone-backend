const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");
const prisma = new PrismaClient();

async function main() {
  const hashedPassword1 = await bcrypt.hash("examplepw1", 10);
  const hashedPassword2 = await bcrypt.hash("examplepw2", 10);

  const user1 = await prisma.user.create({
    data: {
      firstName: "Ik",
      lastName: "Jang",
      email: "ik@testing.com",
      password: hashedPassword1,
    },
  });

  const user2 = await prisma.user.create({
    data: {
      firstName: "Inkyeong",
      lastName: "Jang",
      email: "ikj@testing.com",
      password: hashedPassword2,
    },
  });

  const photo1 = await prisma.photo.create({
    data: {
      url: "https://testphoto.com/summer1.jpg",
      description: "summerclothing",
      category: "women",
      minTemp: 82.4,
      maxTemp: 1000,
    },
  });

  const photo2 = await prisma.photo.create({
    data: {
      url: "https://testphoto.com/winter2.jpg",
      description: "winterclothing",
      category: "men",
      minTemp: 40,
      maxTemp: 48.1,
    },
  });

  await prisma.like.create({
    data: {
      userId: user1.id,
      photoId: photo1.id,
    },
  });

  await prisma.like.create({
    data: {
      userId: user2.id,
      photoId: photo2.id,
    },
  });

  console.log("Seeding successd.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
