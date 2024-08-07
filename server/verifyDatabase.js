const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function verifyDatabase() {
  try {
    // 사진 데이터 확인
    const photos = await prisma.photo.findMany();
    console.log("Photos:", photos);

    // 사용자 데이터 확인
    const users = await prisma.user.findMany();
    console.log("Users:", users);
  } catch (error) {
    console.error("Error verifying database:", error);
  } finally {
    await prisma.$disconnect();
  }
}

verifyDatabase();
