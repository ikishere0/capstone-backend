const express = require("express");
const fs = require("fs");
const path = require("path");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const router = express.Router();

const uploadDir = path.join(__dirname, "../uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

router.post("/upload", async (req, res) => {
  try {
    if (!req.files || Object.keys(req.files).length === 0) {
      console.log("No files were uploaded.");
      return res.status(400).send("No files were uploaded.");
    }

    const photoFile = req.files.photo;
    const uploadPath = path.join(uploadDir, photoFile.name);

    photoFile.mv(uploadPath, async (err) => {
      if (err) {
        console.error("File move error:", err);
        return res.status(500).send(err);
      }

      const { description, category, minTemp, maxTemp } = req.body;
      const minTempValue = parseFloat(minTemp);
      const maxTempValue = maxTemp ? parseFloat(maxTemp) : 1000;

      try {
        const photo = await prisma.photo.create({
          data: {
            url: `/uploads/${photoFile.name}`,
            description,
            category,
            minTemp: minTempValue,
            maxTemp: maxTempValue,
          },
        });
        console.log("Photo uploaded successfully:", photo);
        console.log(
          "Photo URL:",
          `http://localhost:3000/uploads/${photoFile.name}`
        );
        res.status(201).json(photo);
      } catch (dbError) {
        console.error("Database error:", dbError);
        res.status(500).json({ error: "Failed to save photo data" });
      }
    });
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).send("Internal Server Error");
  }
});

router.delete("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const photo = await prisma.photo.findUnique({
      where: { id: parseInt(id) },
    });

    if (!photo) {
      return res.status(404).send("Photo not found");
    }

    const filePath = path.join(uploadDir, path.basename(photo.url));

    fs.unlink(filePath, async (err) => {
      if (err) {
        console.error("File deletion error:", err);
        return res.status(500).send("Failed to delete file");
      }

      try {
        await prisma.photo.delete({
          where: { id: parseInt(id) },
        });
        res.status(200).send("Photo deleted successfully");
      } catch (dbError) {
        console.error("Database error:", dbError);
        res.status(500).json({ error: "Failed to delete photo data" });
      }
    });
  } catch (error) {
    console.error("Delete error:", error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
