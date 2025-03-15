// Wait for DOM to fully load
document.addEventListener("DOMContentLoaded", function () {
  // Set copyright year
  document.getElementById("year").textContent = new Date().getFullYear();

  // Set last modified date
  const lastModified = new Date(document.lastModified);
  const formattedDate = `${
    lastModified.getMonth() + 1
  }/${lastModified.getDate()}/${lastModified.getFullYear()} ${String(
    lastModified.getHours()
  ).padStart(2, "0")}:${String(lastModified.getMinutes()).padStart(
    2,
    "0"
  )}:${String(lastModified.getSeconds()).padStart(2, "0")}`;
  document.getElementById("lastModified").textContent = formattedDate;

  // Toggle navigation menu (hamburger menu functionality)
  const menuToggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector("nav");
  const hamburger = document.querySelector(".hamburger");
  const close = document.querySelector(".close");

  menuToggle.addEventListener("click", function () {
    nav.classList.toggle("show");

    // Toggle between hamburger and X icons
    if (nav.classList.contains("show")) {
      hamburger.style.display = "none";
      close.style.display = "block";
    } else {
      hamburger.style.display = "block";
      close.style.display = "none";
    }
  });

  // Close menu when a navigation item is clicked
  const navLinks = document.querySelectorAll("nav a");
  navLinks.forEach((link) => {
    link.addEventListener("click", function () {
      // Only apply this behavior in mobile view (when hamburger is visible)
      if (window.getComputedStyle(menuToggle).display !== "none") {
        nav.classList.remove("show");
        hamburger.style.display = "block";
        close.style.display = "none";
      }
    });
  });

  // Update h1 content based on navigation selection
  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      // Get the text content of the clicked link
      const pageName = this.textContent;

      // Update the h1 content
      document.querySelector("main h1").textContent = pageName;

    });
  });
});
