// Declare three variables that hold references to the input, button, and list elements
const input = document.querySelector("#favchap");
const button = document.querySelector("button");
const list = document.querySelector("#list");

// This function will be used in a future activity to handle button clicks
button.addEventListener("click", () => {
  // Check if the input is not empty
  if (input.value != "") {
    // Create a li element
    const li = document.createElement("li");

    // Create a delete button
    const deleteButton = document.createElement("button");

    // Populate the li element's textContent with the input value
    li.textContent = input.value;

    // Populate the button textContent with a ❌
    deleteButton.textContent = "❌";

    // Add an aria-label for accessibility
    deleteButton.setAttribute("aria-label", `Remove ${input.value}`);

    // Append the delete button to the li element
    li.appendChild(deleteButton);

    // Append the li element to the unordered list
    list.appendChild(li);

    // Add event listener to the delete button (for future activity)
    deleteButton.addEventListener("click", () => {
      list.removeChild(li);
    });

    // Clear the input field
    input.value = "";

    // Set focus back to the input
    input.focus();
  }
});
