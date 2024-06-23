// Import necessary modules
const express = require("express");
const bcrypt = require('bcrypt');
const app = express();
const { Customer, Order } = require("./config");

// Middleware setup
app.use(express.json());
app.use(express.static("public"));
app.use(express.static("img"));
app.use(express.urlencoded({ extended: false }));
app.set("view engine", "ejs");

// Variable to store currently logged-in user
let present_user;

// Routes
// Home route
app.get("/", (req, res) => {
  res.render("login"); // Render login page
});

// Signup route
app.get("/signup", (req, res) => {
  res.render("signup"); // Render signup page
});

// Menu route
app.get("/menu", (req, res) => {
  res.render("menu"); // Render menu page
});

// Home route
app.get("/home", (req, res) => {
  res.render("home"); // Render home page
});

// Route to place orders
app.post('/ordered', async (req, res) => {
  try {
    // Retrieve currently logged-in user
    const existingUser = await Customer.findOne({ name: present_user });
    if (!existingUser) {
      res.status(401).send('Unauthorized. Please log in to place an order.');
      return;
    }

    // Check if an order already exists for the user
    let order = await Order.findOne({ user_id: existingUser._id });
    if (!order) {
      // Create a new order if it doesn't exist
      order = new Order({ user_id: existingUser._id, name: present_user, items: [] });
    }

    // Add the new order item to the existing order
    order.items.push({ item: req.body.order_item, quantity: req.body.quantity });

    // Save the updated order
    await order.save();
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred while placing your order. Please try again later.');
  }
});

// Route to register new users
app.post("/signup", async (req, res) => {
  const data = {
    name: req.body.username,
    password: req.body.password
  }

  try {
    // Check if the username already exists in the database
    const existingUser = await Customer.findOne({ name: data.name });
    if (existingUser) {
      res.render("signup", { errorMessage: 'User already exists. Please choose a different username.' });
    } else {
      // Hash the password using bcrypt
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(data.password, saltRounds);
      data.password = hashedPassword;

      // Save new user
      await new Customer(data).save();
      res.render("login");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

// Route to login existing users
app.post("/login", async (req, res) => {
  try {
    // Check if username exists
    const check = await Customer.findOne({ name: req.body.username });
    if (!check) {
      // If user not found, render login page with error message
      res.render("login", { errorMessage: "User name cannot be found" });
      return; // Add this line to prevent further execution
    }

    present_user = req.body.username;

    // Compare hashed password from database with plaintext password
    const isPasswordMatch = await bcrypt.compare(req.body.password, check.password);
    if (!isPasswordMatch) {
      // If password doesn't match, render login page with error message
      res.render("login", { errorMessage: "Wrong Password" });
    } else {
      // If login successful, render home page
      res.render("home");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

// Start server
const port = 7070;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});