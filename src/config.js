// Import mongoose library
const mongoose = require('mongoose');

// Connect to the MongoDB database
const connect = mongoose.connect("mongodb://localhost:27017/hotel", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Handle connection success and failure
connect.then(() => {
  console.log("Database Connected Successfully");
}).catch(() => {
  console.log("Database cannot be Connected");
});

// Define schema for the user collection
const userSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true }, // Ensure unique usernames
  password: { type: String, required: true }
});

// Define schema for the order collection
const orderSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId, // Reference to user ID
    ref: 'Customer', // Reference to the Customer model
    required: true,
    unique: true // Ensure unique user_id
  },
  name: { type: String, required: true },
  items: [{
    item: { type: String, required: true },
    quantity: { type: Number, required: true, min: 1 }, // Ensure quantity is positive
    _id: false // Disable automatic _id generation for items array
  }]
}, { versionKey: false }); // This option removes the __v field

// Define Customer model using user schema
const Customer = mongoose.model("Customer", userSchema);

// Define Order model using order schema
const Order = mongoose.model("Order", orderSchema);

// Export both models for use in other files
module.exports = { Customer, Order };