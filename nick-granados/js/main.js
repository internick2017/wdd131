/**
 * Main JavaScript File for DevPortfolio
 * Created by Nick Granados for WDD131 Project
 */

// DOM Elements
const hamburger = document.getElementById("hamburger");
const navMenu = document.getElementById("nav-menu");
const themeToggle = document.getElementById("theme-toggle");
const currentYearElement = document.getElementById("current-year");
const lastVisitElement = document.getElementById("last-visit");

// ===== Mobile Navigation Toggle =====
if (hamburger) {
  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
  });
}

// Close mobile menu when clicking on a nav link
document.querySelectorAll(".nav-menu a").forEach((link) => {
  link.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
  });
});

// ===== Dark/Light Theme Toggle =====
// Check if user has a theme preference stored in localStorage
const getUserThemePreference = () => {
  const savedTheme = localStorage.getItem("theme");
  return savedTheme ? savedTheme : "light";
};

// Apply theme to the body element
const applyTheme = (theme) => {
  if (theme === "dark") {
    document.body.classList.add("dark-theme");
  } else {
    document.body.classList.remove("dark-theme");
  }
  // Save user preference
  localStorage.setItem("theme", theme);
};

// Initialize theme based on user preference
applyTheme(getUserThemePreference());

// Toggle theme when the theme button is clicked
if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const currentTheme = document.body.classList.contains("dark-theme")
      ? "dark"
      : "light";
    const newTheme = currentTheme === "dark" ? "light" : "dark";
    applyTheme(newTheme);
  });
}

// ===== Current Year in Footer =====
// Set the current year in the footer copyright
if (currentYearElement) {
  const currentYear = new Date().getFullYear();
  currentYearElement.textContent = currentYear;
}

// ===== Last Visit Tracking =====
// Show when the user last visited the site
if (lastVisitElement) {
  const displayLastVisit = () => {
    const lastVisit = localStorage.getItem("lastVisit");

    if (!lastVisit) {
      lastVisitElement.textContent = "This is your first visit";
    } else {
      const lastVisitDate = new Date(parseInt(lastVisit));
      const now = new Date();
      const diffTime = Math.abs(now - lastVisitDate);
      const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

      if (diffDays === 0) {
        lastVisitElement.textContent = "Today";
      } else if (diffDays === 1) {
        lastVisitElement.textContent = "Yesterday";
      } else {
        lastVisitElement.textContent = `${diffDays} days ago`;
      }
    }

    // Update the last visit timestamp
    localStorage.setItem("lastVisit", Date.now().toString());
  };

  displayLastVisit();
}

// ===== Skills Section =====
// Populate the skills section dynamically
const skillsContainer = document.getElementById("skills-container");
if (skillsContainer) {
  const skills = [
    { name: "HTML5", icon: "🌐", level: "Advanced" },
    { name: "CSS3", icon: "🎨", level: "Advanced" },
    { name: "JavaScript", icon: "📜", level: "Intermediate" },
    { name: "Responsive Design", icon: "📱", level: "Advanced" },
    { name: "Web Accessibility", icon: "♿", level: "Intermediate" },
    { name: "UI/UX Design", icon: "🖌️", level: "Intermediate" },
    { name: "Git & GitHub", icon: "🔄", level: "Intermediate" },
    { name: "Performance Optimization", icon: "⚡", level: "Intermediate" },
  ];

  const skillsHTML = skills
    .map((skill) => {
      return `
            <div class="skill-card">
                <div class="skill-icon">${skill.icon}</div>
                <h3 class="skill-name">${skill.name}</h3>
                <p>${skill.level}</p>
            </div>
        `;
    })
    .join("");

  skillsContainer.innerHTML = skillsHTML;
}

// ===== Testimonials Slider =====
const testimonialSlider = document.getElementById("testimonial-slider");
const prevTestimonialBtn = document.getElementById("prev-testimonial");
const nextTestimonialBtn = document.getElementById("next-testimonial");

if (testimonialSlider) {
  const testimonials = [
    {
      content:
        "Nick created an exceptional website for our business that perfectly captured our brand's essence. His attention to detail and technical expertise resulted in a site that not only looks great but performs excellently too.",
      author: "Sarah Johnson",
      position: "Marketing Director, TechCorp",
      image: "images/testimonial1.png",
    },
    {
      content:
        "Working with Nick was a pleasure from start to finish. He took the time to understand our needs and delivered a website that exceeded our expectations. His responsive design work ensures our site looks fantastic on all devices.",
      author: "Michael Chen",
      position: "Founder, Culinary Creations",
      image: "images/testimonial2.png",
    },
    {
      content:
        "Nick's expertise in web development saved our e-commerce project. He optimized our site for speed and conversions, resulting in a 40% increase in sales within the first month after launch.",
      author: "Emma Rodriguez",
      position: "CEO, StyleShop",
      image: "images/testimonial3.png",
    },
  ];

  let currentTestimonialIndex = 0;

  // Function to display the current testimonial
  const showTestimonial = (index) => {
    const testimonial = testimonials[index];
    testimonialSlider.innerHTML = `
            <div class="testimonial fade-in">
                <div class="testimonial-content">
                    <p>${testimonial.content}</p>
                </div>
                <div class="testimonial-author">
                    <img src="${testimonial.image}" alt="${testimonial.author}" loading="lazy">
                    <div class="testimonial-info">
                        <h4>${testimonial.author}</h4>
                        <p>${testimonial.position}</p>
                    </div>
                </div>
            </div>
        `;
  };

  // Initialize with first testimonial
  showTestimonial(currentTestimonialIndex);

  // Event listener for next testimonial button
  if (nextTestimonialBtn) {
    nextTestimonialBtn.addEventListener("click", () => {
      currentTestimonialIndex =
        (currentTestimonialIndex + 1) % testimonials.length;
      showTestimonial(currentTestimonialIndex);
    });
  }

  // Event listener for previous testimonial button
  if (prevTestimonialBtn) {
    prevTestimonialBtn.addEventListener("click", () => {
      currentTestimonialIndex =
        (currentTestimonialIndex - 1 + testimonials.length) %
        testimonials.length;
      showTestimonial(currentTestimonialIndex);
    });
  }

  // Auto rotate testimonials every 5 seconds
  setInterval(() => {
    currentTestimonialIndex =
      (currentTestimonialIndex + 1) % testimonials.length;
    showTestimonial(currentTestimonialIndex);
  }, 5000);
}

// ===== Skills Tabs (About Page) =====
const skillsTabs = document.getElementById("skills-tabs");
if (skillsTabs) {
  const tabButtons = skillsTabs.querySelectorAll(".tab-btn");

  tabButtons.forEach((button) => {
    button.addEventListener("click", () => {
      // Remove active class from all buttons and panels
      tabButtons.forEach((btn) => btn.classList.remove("active"));
      document
        .querySelectorAll(".tab-panel")
        .forEach((panel) => panel.classList.remove("active"));

      // Add active class to clicked button
      button.classList.add("active");

      // Show the corresponding panel
      const tabId = button.getAttribute("data-tab");
      document.getElementById(`${tabId}-panel`).classList.add("active");
    });
  });
}

// ===== FAQ Accordion =====
const faqAccordion = document.getElementById("faq-accordion");
if (faqAccordion) {
  const accordionHeaders = faqAccordion.querySelectorAll(".accordion-header");

  accordionHeaders.forEach((header) => {
    header.addEventListener("click", () => {
      const isExpanded = header.getAttribute("aria-expanded") === "true";

      // Close all accordion items
      accordionHeaders.forEach((item) => {
        item.setAttribute("aria-expanded", "false");
      });

      // If the clicked item wasn't expanded, expand it
      if (!isExpanded) {
        header.setAttribute("aria-expanded", "true");
      }
    });
  });
}