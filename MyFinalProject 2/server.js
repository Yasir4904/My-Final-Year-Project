const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const cors = require("cors");
const Amadeus = require("amadeus");


const app = express();
app.use(cors());

// connect to MongoDB database
mongoose.connect("mongodb://localhost:27017/myapp", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// checks to see the connection status for the database
mongoose.connection.on("connected", () => {
  console.log("Connected to MongoDB database");
});

mongoose.connection.on("error", (err) => {
  console.log(`MongoDB connection error: ${err}`);
});


//creating my  Amadeus API client
const amadeus = new Amadeus({
  clientId: "YK6ldWaMQPRav4uKFdxoACRaiB6qMwOg",
  clientSecret: "FKQOBZgv5juClwM0",
});

// define a user schema
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
});

const User = mongoose.model("User", userSchema);

// middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// handles my register form
app.post("/register", async (req, res) => {
  const { name, email, password, cpassword } = req.body;

  // here i check to see if the same email already exists
  const user = await User.findOne({ email });
  if (user) {
    return res.status(409).json({ message: "Email already exists" });
  }

  // validate password
  if (password !== cpassword) {
    return res.status(400).json({ message: "Passwords do not match" });
  }

  // hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // create new user
  const newUser = new User({
    name,
    email,
    password: hashedPassword,
  });

  try {
    await newUser.save(); // save the new user to the database
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

//
app.get("/hotels", async (req, res) => {
  console.log(amadeus.booking.hotelBookings);
  const response = await amadeus.referenceData.locations.hotels.byCity.get({
    cityCode: "LON",
  });
  res.status(201).json({
    message: response,
  });
});




// handles my login page
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  // check if user exists
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(401).json({ message: "user already exists" });
  }

  // check if password matches
  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) {
    return res.status(401).json({ message: "password does not match" });
  }

  res.status(200).json({ message: "Login is complete and a success" });
});

app.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.log(err);
    } else {
      res.clearCookie("sid");
      res.status(200).json({ message: "Logout successful" });
    }
  });
});

  
// start server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
