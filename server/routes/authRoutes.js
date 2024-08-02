const express = require("express");
const {
  register,
  login,
  getUserProfile,
} = require("../controllers/authController");
const verifyToken = require("../middleware/authMiddleware");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/profile", verifyToken, getUserProfile);

router.get("/likedPhotos", verifyToken, async (req, res) => {
  try {
    console.log("Fetching liked photos for user:", req.user.userId);
    const likedPhotos = await prisma.like.findMany({
      where: {
        userId: req.user.userId,
      },
      include: {
        Photo: true,
      },
    });
    console.log("Liked photos fetched successfully:", likedPhotos);
    res.json(likedPhotos.map((like) => like.Photo));
  } catch (error) {
    console.error("Failed to fetch liked photos:", error);
    res.status(500).json({ error: "Failed to fetch liked photos" });
  }
});

router.post("/likePhoto", verifyToken, async (req, res) => {
  try {
    const { photoId } = req.body;
    const userId = req.user.userId;
    const like = await prisma.like.create({
      data: {
        userId,
        photoId,
      },
    });

    res.json(like);
  } catch (error) {
    console.error("Failed to like photo:", error);
    res.status(500).json({ error: "Failed to like photo" });
  }
});

router.delete("/likePhoto", verifyToken, async (req, res) => {
  try {
    const { photoId } = req.body;
    const userId = req.user.userId;

    const like = await prisma.like.findUnique({
      where: {
        userId_photoId: {
          userId,
          photoId,
        },
      },
    });

    if (!like) {
      return res.status(404).json({ error: "Like not found" });
    }

    await prisma.like.delete({
      where: {
        id: like.id,
      },
    });

    res.status(200).json({ message: "Photo unliked successfully" });
  } catch (error) {
    console.error("Failed to unlike photo:", error);
    res.status(500).json({ error: "Failed to unlike photo" });
  }
});

module.exports = router;
