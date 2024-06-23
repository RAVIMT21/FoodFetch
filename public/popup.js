// Function to increment the value in the input field
function increment() {
  var numberInput = document.getElementById('numberInput');
  var value = parseInt(numberInput.value, 10); // Parse input value as an integer

  // Check if the parsed value is not a number
  if (!isNaN(value)) {
    numberInput.value = value + 1; // Increment the value
  } else {
    numberInput.value = 1; // Set value to 1 if it's not a number
  }
}

// Function to decrement the value in the input field
function decrement() {
  var numberInput = document.getElementById('numberInput');
  var value = parseInt(numberInput.value, 10); // Parse input value as an integer

  // Check if the parsed value is not a number or less than 1
  if (!isNaN(value) && value > 1) {
    numberInput.value = value - 1; // Decrement the value if it's greater than 0
  } else {
    numberInput.value = 1; // Set value to 1 if it's not a number or already 1
  }
}

// Function to toggle popup and background blur
function toggle(button) {
  var blur = document.getElementById("blur");
  blur.classList.toggle("active"); // Toggle blur class for background

  var item_name = document.getElementById("item_name");
  item_name.value = button.value; // Set value of item_name input

  var popup = document.getElementById("popup");
  popup.classList.toggle("active"); // Toggle active class for popup
  

}

// Function to toggle order placed popup

function toggleOrderPlacedPopup(button) {

  var popup = document.getElementById("popup");
  popup.classList.toggle("active"); // Toggle active class for popup

  var popupf = document.getElementById("popupf");
  popupf.classList.toggle("active");
}

function gomenu(button) {
  var popupf = document.getElementById("popupf");
  popupf.classList.toggle("active");

  var blur = document.getElementById("blur");
  blur.classList.toggle("active"); // Toggle blur class for background
}