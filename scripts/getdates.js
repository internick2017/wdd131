// Get the current year for the copyright
document.addEventListener("DOMContentLoaded", function () {
  // Set the current year
  const currentYear = new Date().getFullYear();
  document.getElementById("currentyear").textContent = currentYear;

  // Set the last modified date
  document.getElementById("lastModified").textContent =
    "Last modification: " + document.lastModified;
});
