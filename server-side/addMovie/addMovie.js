const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const fs = require('fs').promises;

cloudinary.config({ 
  cloud_name: 'azii', 
  api_key: '821493881388656', 
  api_secret: 'kf4HQKhl8eLoi4rWWRggYiM2HnE' 
});


const upload = multer({ dest: 'uploads/' });

router.post("/create", async (req, res) => {
  const { firstname, lastname, username, password } = req.body;

  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    await prisma.user.create({
      data: { firstname, lastname, username, password: hashedPassword }
    });

    res.send("User added");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error creating user");
   
  }
});
// adding to wish list 
router.post("/add-to-wishlist/:movieId", async (req, res) => {
  try {
    const { movieId } = req.params;
    const parsedMovieId = parseInt(movieId, 10); // Ensure the movieId is an integer

    if (isNaN(parsedMovieId)) {
      return res.status(400).json({ success: false, error: "Invalid movie ID" });
    }

    console.log("movieId is", parsedMovieId);

    // Fetch the selected movie from the Movie model
    const movie = await prisma.movie.findUnique({
      where: { id: parsedMovieId },
    });

    console.log("Fetched movie", movie);

    if (!movie) {
      return res.status(404).json({ success: false, error: "Movie not found" });
    }

    // Check if the movie ID already exists in the Wishlist
    const existingWishlistItem = await prisma.wishlist.findUnique({
      where: { id: parsedMovieId },
    });

    if (existingWishlistItem) {
      return res.status(400).json({ success: false, error: "Movie already in wishlist" });
    }

    // Create a new wishlist item
    const wishlistItem = await prisma.wishlist.create({
      data: {
        id: movie.id,
        title: movie.title,
        director: movie.director,
        genre: movie.genre,
        image: movie.image,
      },
    });

    res.status(201).json({ success: true, wishlistItem });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
});

router.post("/moviecreate", upload.single('image'), async (req, res) => {
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
  
      await prisma.movie.create({
        data: { title, director, genre, image: cloudinaryImageUrl }
      });
  
      res.send({ message: "Movie added", userData: { title, director, genre, image: cloudinaryImageUrl } });
    } catch (err) {
      console.error(err);
      res.status(500).send("Error creating movie");
    }
  });

  router.post('/login', async (req, res) => {
    const { username, password } = req.body;
  
    try {
      const user = await prisma.user.findUnique({ where: { username } });
  
      if (user) {
        const isMatch = await bcrypt.compare(password, user.password);
  
        if (isMatch) {
          const token = jwt.sign({ id: user.id }, "Tewo Tecnology Solution");
          res.status(200).send({ role: user.role, data: "success", token });
        } else {
          res.status(401).send({ token: null });
          
        }
      } else {
        res.status(401).send({ token: null });
      
      }
    } catch (err) {
      console.error(err);
      res.status(500).json("Internal server error");
    }
  });
  module.exports = router;