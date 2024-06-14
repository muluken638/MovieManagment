// module required
const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");
const jwt = require("jsonwebtoken");

// setting connection to sql serve
app.use(cors());
app.use(express.json());

var db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "moviemanagementsystem",
});
// creating end point for user registsration
const bcrypt = require("bcrypt");
app.post("/create", async (req, res) => {
  const firstname = req.body.firstname;
  const lastname = req.body.lastname;
  const username = req.body.username;
  const password = req.body.password;

  try {
    // Hash the password using bcrypt
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    db.query(
      "INSERT INTO userregistration(firstname,lastname,username,password) VALUES(?,?,?,?)",
      [firstname, lastname, username, hashedPassword],
      function (err, result) {
        if (err) throw err;
        res.send("user added");
      }
    );
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
});

const upload = multer({ storage });

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

  db.query("DELETE FROM movies WHERE id	=?", [id], function (err, result) {
    if (err) {
      console.log(err);
      res.status(500).send("Error deleting record");
    } else {
      res.send("User Data deleted");
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
});

app.get("/check_username/:username", (req, res) => {
  const username = req.params.username;

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

// end point for login

app.post("/login", (req, res) => {
  const sql = "SELECT * FROM userregistration WHERE username = ?";

  db.query(sql, [req.body.username], (err, data) => {
    if (err) {
      return res.json("error");
    }

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
    } else {
      return res.status(500).json("Internal  server error");
    }
  });
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
