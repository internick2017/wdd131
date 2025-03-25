// Temple data array
const temples = [
  {
    name: "Salt Lake Temple",
    location: "Salt Lake City, Utah, USA",
    dedicated: "April 6, 1893",
    area: 253015,
    imageUrl:
      "https://cdn.creazilla.com/cliparts/1723223/lds-temple-clipart-md.png",
  },
  {
    name: "St. George Utah Temple",
    location: "St. George, Utah, USA",
    dedicated: "April 6, 1877",
    area: 110000,
    imageUrl:
      "https://cdn.creazilla.com/cliparts/1723223/lds-temple-clipart-md.png",
  },
  {
    name: "Provo City Center Temple",
    location: "Provo, Utah, USA",
    dedicated: "March 20, 2016",
    area: 85084,
    imageUrl:
      "https://cdn.creazilla.com/cliparts/1723223/lds-temple-clipart-md.png",
  },
  {
    name: "Rome Italy Temple",
    location: "Rome, Italy",
    dedicated: "March 10, 2019",
    area: 40903,
    imageUrl:
      "https://cdn.creazilla.com/cliparts/1723223/lds-temple-clipart-md.png",
  },
  {
    name: "Bern Switzerland Temple",
    location: "Bern, Switzerland",
    dedicated: "September 11, 1955",
    area: 7808,
    imageUrl:
      "https://cdn.creazilla.com/cliparts/1723223/lds-temple-clipart-md.png",
  },
  {
    name: "Curitiba Brazil Temple",
    location: "Curitiba, Paraná, Brazil",
    dedicated: "June 1, 2008",
    area: 30000,
    imageUrl:
      "https://cdn.creazilla.com/cliparts/1723223/lds-temple-clipart-md.png",
  },
  {
    name: "Manti Utah Temple",
    location: "Manti, Utah, USA",
    dedicated: "May 21, 1888",
    area: 100373,
    imageUrl:
      "https://cdn.creazilla.com/cliparts/1723223/lds-temple-clipart-md.png",
  },
  {
    name: "Colonia Juárez Chihuahua Mexico Temple",
    location: "Colonia Juárez, Chihuahua, Mexico",
    dedicated: "March 6, 1999",
    area: 6800,
    imageUrl:
      "https://cdn.creazilla.com/cliparts/1723223/lds-temple-clipart-md.png",
  },
  {
    name: "Laie Hawaii Temple",
    location: "Laie, Hawaii, USA",
    dedicated: "November 27, 1919",
    area: 42100,
    imageUrl:
      "https://cdn.creazilla.com/cliparts/1723223/lds-temple-clipart-md.png",
  },
  // Adding three more temple objects
  {
    name: "São Paulo Brazil Temple",
    location: "São Paulo, Brazil",
    dedicated: "October 30, 1978",
    area: 59246,
    imageUrl:
      "https://cdn.creazilla.com/cliparts/1723223/lds-temple-clipart-md.png",
  },
  {
    name: "Tokyo Japan Temple",
    location: "Tokyo, Japan",
    dedicated: "October 27, 1980",
    area: 52590,
    imageUrl:
      "https://cdn.creazilla.com/cliparts/1723223/lds-temple-clipart-md.png",
  },
  {
    name: "Córdoba Argentina Temple",
    location: "Córdoba, Argentina",
    dedicated: "May 17, 2015",
    area: 34369,
    imageUrl:
      "https://cdn.creazilla.com/cliparts/1723223/lds-temple-clipart-md.png",
  },
];

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

  // Function to display temple cards
  function displayTemples(templeList) {
    const templeGrid = document.querySelector(".temple-grid");
    templeGrid.innerHTML = ""; // Clear the current content

    templeList.forEach((temple) => {
      // Create temple card
      const figure = document.createElement("figure");

      // Create image element with lazy loading
      const img = document.createElement("img");
      img.src = temple.imageUrl;
      img.alt = temple.name;
      img.loading = "lazy"; // Add native lazy loading

      // Create figcaption with temple information
      const figcaption = document.createElement("figcaption");
      figcaption.innerHTML = `
                <h3>${temple.name}</h3>
                <p>${temple.location}</p>
                <p>Dedicated: ${temple.dedicated}</p>
                <p>Area: ${temple.area.toLocaleString()} sq ft</p>
            `;

      // Append elements to the figure
      figure.appendChild(img);
      figure.appendChild(figcaption);

      // Append the figure to the temple grid
      templeGrid.appendChild(figure);
    });
  }

  // Filter temples based on criteria
  function filterTemples(filter) {
    let filteredTemples = [];

    switch (filter) {
      case "old":
        // Temples built before 1900
        filteredTemples = temples.filter((temple) => {
          const dedicatedYear = parseInt(temple.dedicated.split(", ")[1]);
          return dedicatedYear < 1900;
        });
        break;
      case "new":
        // Temples built after 2000
        filteredTemples = temples.filter((temple) => {
          const dedicatedYear = parseInt(temple.dedicated.split(", ")[1]);
          return dedicatedYear > 2000;
        });
        break;
      case "large":
        // Temples larger than 90,000 square feet
        filteredTemples = temples.filter((temple) => temple.area > 90000);
        break;
      case "small":
        // Temples smaller than 10,000 square feet
        filteredTemples = temples.filter((temple) => temple.area < 10000);
        break;
      default:
        // Home - display all temples
        filteredTemples = temples;
        break;
    }

    return filteredTemples;
  }

  // Handle navigation clicks and update display
  const navLinks = document.querySelectorAll("nav a");
  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault(); // Prevent default anchor behavior

      // Get the filter type from the href attribute
      const filterType = this.getAttribute("href").substring(1); // Remove the # character

      // Update the h1 content
      document.querySelector("main h1").textContent = this.textContent;

      // Filter and display temples
      const filteredTemples = filterTemples(filterType);
      displayTemples(filteredTemples);

      // Only apply this behavior in mobile view (when hamburger is visible)
      if (window.getComputedStyle(menuToggle).display !== "none") {
        nav.classList.remove("show");
        hamburger.style.display = "block";
        close.style.display = "none";
      }
    });
  });

  // Initially display all temples
  displayTemples(temples);
});
