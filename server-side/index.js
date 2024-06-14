
// module required

const express = require("express");
const app = express();
const cors = require("cors");

const jwt = require("jsonwebtoken");

// setting connection to sql serve

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const dotenv = require("dotenv");
const { PrismaClient } = require("@prisma/client");
const cloudinary = require('cloudinary').v2;
const fs = require('fs').promises;


cloudinary.config({ 
  cloud_name: 'azii', 
  api_key: '821493881388656', 
  api_secret: 'kf4HQKhl8eLoi4rWWRggYiM2HnE' 
});


dotenv.config();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}${path.extname(file.originalname)}`);
  }
});

// creating end point for user registsration
const bcrypt = require("bcrypt");


const upload = multer({ dest: 'uploads/' });


app.post("/create", async (req, res) => {
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


//Movie Regstration
const multer = require("multer");
const path = require("path");

// Set up Multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Set the upload directory
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}${path.extname(file.originalname)}`); // Generate a unique filename
  },

app.get("/genres", async (req, res) => {
  try {
    const movies = await prisma.movie.findMany();
    res.send(movies);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error retrieving movies");
  }

});



app.post("/moviecreate", upload.single("image"), async (req, res) => {
  const title = req.body.title;
  const director = req.body.director;
  const genre = req.body.genre;
  const image = req.file ? req.file.filename : null; // Get the uploaded file name or set to null if no file was uploaded
  // const plot_summary = req.plot_summary;
  const cast= req.cast;
  const runtime=req.runtime;
  // const rating=req.rating;
  const release_year=req.release_year;
  try {
    db.query(
      "INSERT INTO movies(title, director,release_year,runtime, genre, image,cast) VALUES( ?, ?, ?, ?, ?, ?, ?)",
      [title, director,release_year,runtime, genre, image,cast],
      function (err, result) {
        if (err) throw err;
        res.send({
          message: "Movie added",
          userData: { title, director,release_year,runtime, genre, image,cast },
        });
      }
    );

app.post("/moviecreate", upload.single('image'), async (req, res) => {
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


app.get("/movielist", (req, res) => {
  db.query("SELECT * FROM movies ", function (err, result) {
    if (err) throw err;
    res.send(result);
  });
});

// Update profile endpoint
app.put("/api/profile/:userId", (req, res) => {
  const userId = req.params.userId;
  const { firstname, lastname, username } = req.body;

  // Update the user's profile in the database
  const query =
    "UPDATE userregistration SET firstname = ?, lastname = ?, username = ? WHERE id = 13";
  db.query(query, [firstname, lastname, username], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to update profile" });
    } else {
      res.json({ message: "Profile updated successfully" });
    }
  });
});

app.get("/api/profileview/:userId", (req, res) => {
  const userId = req.params.userId;

  // Fetch the user's profile from the database
  const query =
    "SELECT firstname, lastname, username FROM userregistration WHERE id = 13";
  db.query(query, [userId], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to fetch profile" });
    } else {
      if (result.length > 0) {
        const user = result[0];
        res.json({
          firstname: user.firstname,
          lastname: user.lastname,
          username: user.username,
          // other: user.other,
          // profileImage: user.profileImage
        });
      } else {
        res.status(404).json({ error: "User not found" });
      }
    }
  });
});

///
// end point for delete user
app.delete("/moviedelete/:id", (req, res) => {
  const id = req.params.id;
=======
app.get("/movielist", async (req, res) => {
  try {
    const movies = await prisma.movie.findMany();
    res.send(movies);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching movies");
  }
});

app.put('/api/profile/:userId', async (req, res) => {
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

app.get('/api/profileview/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await prisma.user.findUnique({
      where: { id: parseInt(userId) },
      select: { firstname: true, lastname: true, username: true }
    });


    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ error: 'User not found' });
    }

  });
});

//get Total movies

app.get("/totalmovies", (req, res) => {
  db.query(
    "SELECT COUNT(*) AS total_movies FROM movies",
    function (err, result) {
      if (err) throw err;
      res.send(result[0]);
    }
  );
});
// end point to get total number of action movires
app.get("/totaactionmovies", (req, res) => {
  db.query(
    "SELECT COUNT(*) AS total_action_movies FROM movies WHERE genre ='action'",
    function (err, result) {
      if (err) throw err;
      res.send(result[0]);
    }
  );
});

//end point  to get  romance

app.get("/totalromancemovies", (req, res) => {
  db.query(
    "SELECT COUNT(*) AS total_romance_movies FROM movies WHERE genre ='romance'",
    function (err, result) {
      if (err) throw err;
      res.send(result[0]);
    }
  );
});
// end point point for total drama movies

app.get("/totaldramaamovies", (req, res) => {
  db.query(
    "SELECT COUNT(*) AS total_drama_movies FROM movies WHERE genre ='drama'",
    function (err, result) {
      if (err) throw err;
      res.send(result[0]);
    }
  );
});

app.get("/totalusers", (req, res) => {
  db.query(
    "SELECT COUNT(*) AS total_users FROM userregistration",
    function (err, result) {
      if (err) throw err;
      res.send(result[0]);
    }
  );
});

app.get("/genres", (req, res) => {
  db.query("SELECT  * FROM movies", function (err, result) {
    if (err) throw err;
    res.send(result);
  });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch profile' });
  }
});

app.delete("/moviedelete/:id", async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.movie.delete({ where: { id: parseInt(id) } });
    res.send("Movie deleted");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error deleting movie");
  }
});

app.get("/totalmovies", async (req, res) => {
  try {
    const totalMovies = await prisma.movie.count();
    res.send({ total_movies: totalMovies });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching total movies");
  }
});

app.get("/totalusers", async (req, res) => {
  try {
    const totalUsers = await prisma.user.count();
    res.send({ total_users: totalUsers });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching total users");
  }

});

app.get("/check_username/:username", async (req, res) => {
  const { username } = req.params;


  db.query(
    "SELECT COUNT(*) as count FROM userregistration WHERE username = ?",
    [username],
    function (err, result) {
      if (err) throw err;

      const exists = result[0].count > 0;
      res.send({ exists: exists });
    }
  );
});

// end point for getting all list of user
app.get("/userlist", (req, res) => {
  db.query(
    "SELECT * FROM userregistration  WHERE role='0'",
    function (err, result) {
      if (err) throw err;
      res.send(result);
    }
  );
});
// end of it

// end point for delete user
app.delete("/delete/:id", (req, res) => {
  const id = req.params.id;

  db.query(
    "DELETE FROM userregistration WHERE id=?",
    [id],
    function (err, result) {
      if (err) {
        console.log(err);
        res.status(500).send("Error deleting record");
      } else {
        res.send("User Data deleted");
      }
    }
  );
});


//end of delete

  try {
    const count = await prisma.user.count({ where: { username } });
    res.send({ exists: count > 0 });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error checking username");
  }
});

app.get("/userlist", async (req, res) => {
  try {
    const users = await prisma.user.findMany({ where: { role: 0 } });
    res.send(users);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching users");
  }
});

app.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.user.delete({ where: { id: parseInt(id) } });
    res.send("User deleted");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error deleting user");
  }
});


app.post('/login', async (req, res) => {
  const { username, password } = req.body;


app.post("/login", (req, res) => {
  const sql = "SELECT * FROM userregistration WHERE username = ?";

  try {
    const user = await prisma.user.findUnique({ where: { username } });


    if (user) {
      const isMatch = await bcrypt.compare(password, user.password);


    if (data.length > 0) {
      const hashedPassword = data[0].password;
      // to generate token
      const token = jwt.sign({ id: data[0].id }, "Tewo Tecnology Solution");
      //encript password
      bcrypt.compare(req.body.password, hashedPassword, (err, result) => {
        if (err) {
          return res.status(500).json("Internal  server error");
        }

        if (result) {
          // return res.json("success");

          return res.status(200).send({
            role: data[0].role,
            data: "success",
            token: token,
          });
        } else {
          return res.status(401).send({
            token: null,
          });
        }
      });

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



// Endpoint API
app.get('/movie-genres', (req, res) => {
  // Query the movies table to get the unique genre types
  db.query('SELECT DISTINCT genre FROM movies', (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Error querying the database' });
    }

    const genreTypes = results.map(row => row.genre.trim());
    const genreCounts = {};

    // Count the occurrences of each genre type
    db.query('SELECT genre FROM movies', (err, results) => {
      if (err) {
        return res.status(500).json({ error: 'Error querying the database' });
      }

      results.forEach(row => {
        const genres = row.genre.split(',');
        genres.forEach(genre => {
          const trimmedGenre = genre.trim();
          if (genreTypes.includes(trimmedGenre)) {
            genreCounts[trimmedGenre] = (genreCounts[trimmedGenre] || 0) + 1;
          }
        });
      });

      // Prepare the response data
      const genreData = genreTypes.map(genre => ({
        genre,
        count: genreCounts[genre] || 0
      })).filter(({ count }) => count > 0);

      // If the filtered genreData is empty, return a single empty card
      if (genreData.length === 0) {
        genreData.push({ genre: '', count: 0 });
      }
      // Pad the response data with empty cards if needed
      while (genreData.length < 3) {
        genreData.push({ genre: '', count: 0 });
      }

      res.json(genreData);
    });
  });
});

app.listen(3001, () => {
  console.log("Server started at http://localhost:3001");
});
