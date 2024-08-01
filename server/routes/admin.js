const express = require('express');
const fs = require('fs');
const path = require('path');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const router = express.Router();

const uploadDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

router.post('/upload', async (req, res) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('No files were uploaded.');
  }

  const photoFile = req.files.photo;
  const uploadPath = path.join(uploadDir, photoFile.name);

  photoFile.mv(uploadPath, async (err) => {
    if (err) {
      return res.status(500).send(err);
    }

    const { description, category, minTemp, maxTemp } = req.body;
    const photo = await prisma.photo.create({
      data: {
        url: `/uploads/${photoFile.name}`,
        description,
        category,
        minTemp: parseFloat(minTemp),
        maxTemp: parseFloat(maxTemp),
      },
    });

    res.status(201).json(photo);
  });
});

module.exports = router;
