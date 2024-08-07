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
      url: "https://images.unsplash.com/photo-1586024651909-8bd7e356c8fe?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      description: "summerclothing",
      category: "women",
      minTemp: 82.4,
      maxTemp: 1000,
    },
  });

  const photo2 = await prisma.photo.create({
    data: {
      url: "https://images.unsplash.com/photo-1586024651909-8bd7e356c8fe?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      description: "summerclothing",
      category: "women",
      minTemp: 80,
      maxTemp: 82.3,
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
