const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const cloudinary = require('cloudinary').v2;
const fs = require('fs').promises;
const multer = require('multer');


cloudinary.config({ 
  cloud_name: 'azii', 
  api_key: '821493881388656', 
  api_secret: 'kf4HQKhl8eLoi4rWWRggYiM2HnE' 
});

const upload = multer({ dest: 'uploads/' });


// update movie

router.put("/update/:movieId", upload.single('image'), async (req, res) => {
  const { movieId } = req.params;
  const { title, director, genre } = req.body;
  const imageUrl = req.file ? req.file.path : null;

  try {
    let cloudinaryImageUrl = null;

    if (imageUrl) {
      // Upload the image to Cloudinary
      const result = await cloudinary.uploader.upload(imageUrl);
      cloudinaryImageUrl = result.secure_url;

      // Optionally, delete the local file after uploading to Cloudinary
      await fs.unlink(imageUrl);
    }

    await prisma.movie.update({
      where: { id: Number(movieId) },
      data: { title, director, genre, image: cloudinaryImageUrl }
    });

    res.send({ message: "Movie updated", movieData: { title, director, genre, image: cloudinaryImageUrl } });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error updating movie");
  }
});

router.put('/api/profile/:userId', async (req, res) => {
    const { userId } = req.params;
    const { firstname, lastname, username } = req.body;
  
    try {
      await prisma.user.update({
        where: { id: parseInt(userId) },
        data: { firstname, lastname, username }
      });
  
      res.json({ message: 'Profile updated successfully' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to update profile' });
    }
  });




  module.exports=router;