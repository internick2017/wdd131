/**
 * Contact Form JavaScript
 * Created by Nick Granados for WDD131 Project
 *
 * This file handles the contact form validation and submission
 */

// DOM Elements
const contactForm = document.getElementById("contact-form");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const subjectInput = document.getElementById("subject");
const messageInput = document.getElementById("message");
const termsCheckbox = document.getElementById("terms");
const budgetRange = document.getElementById("budget");
const budgetValue = document.getElementById("budget-value");
const formSuccess = document.getElementById("form-success");
const sendAnother = document.getElementById("send-another");

// Error message elements
const nameError = document.getElementById("name-error");
const emailError = document.getElementById("email-error");
const subjectError = document.getElementById("subject-error");
const messageError = document.getElementById("message-error");
const termsError = document.getElementById("terms-error");

// Form data object
const formData = {
  name: "",
  email: "",
  subject: "",
  message: "",
  projectType: "",
  budget: 3000,
  contactMethod: "email",
  newsletter: false,
  terms: false,
};

// Update budget value display when range input changes
if (budgetRange && budgetValue) {
  budgetRange.addEventListener("input", () => {
    budgetValue.textContent = budgetRange.value;
    formData.budget = parseInt(budgetRange.value);
  });
}

// Validation functions
const validateName = () => {
  if (!nameInput.value.trim()) {
    nameError.textContent = "Please enter your name";
    nameInput.classList.add("error");
    return false;
  } else if (nameInput.value.trim().length < 2) {
    nameError.textContent = "Name must be at least 2 characters";
    nameInput.classList.add("error");
    return false;
  } else {
    nameError.textContent = "";
    nameInput.classList.remove("error");
    formData.name = nameInput.value.trim();
    return true;
  }
};

const validateEmail = () => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailInput.value.trim()) {
    emailError.textContent = "Please enter your email address";
    emailInput.classList.add("error");
    return false;
  } else if (!emailRegex.test(emailInput.value.trim())) {
    emailError.textContent = "Please enter a valid email address";
    emailInput.classList.add("error");
    return false;
  } else {
    emailError.textContent = "";
    emailInput.classList.remove("error");
    formData.email = emailInput.value.trim();
    return true;
  }
};

const validateSubject = () => {
  if (!subjectInput.value.trim()) {
    subjectError.textContent = "Please enter a subject";
    subjectInput.classList.add("error");
    return false;
  } else {
    subjectError.textContent = "";
    subjectInput.classList.remove("error");
    formData.subject = subjectInput.value.trim();
    return true;
  }
};

const validateMessage = () => {
  if (!messageInput.value.trim()) {
    messageError.textContent = "Please enter your message";
    messageInput.classList.add("error");
    return false;
  } else if (messageInput.value.trim().length < 10) {
    messageError.textContent = "Message must be at least 10 characters";
    messageInput.classList.add("error");
    return false;
  } else {
    messageError.textContent = "";
    messageInput.classList.remove("error");
    formData.message = messageInput.value.trim();
    return true;
  }
};

const validateTerms = () => {
  if (!termsCheckbox.checked) {
    termsError.textContent = "You must accept the terms and conditions";
    return false;
  } else {
    termsError.textContent = "";
    formData.terms = true;
    return true;
  }
};

// Attach input event listeners for real-time validation
if (nameInput) {
  nameInput.addEventListener("input", validateName);
}

if (emailInput) {
  emailInput.addEventListener("input", validateEmail);
}

if (subjectInput) {
  subjectInput.addEventListener("input", validateSubject);
}

if (messageInput) {
  messageInput.addEventListener("input", validateMessage);
}

if (termsCheckbox) {
  termsCheckbox.addEventListener("change", validateTerms);
}

// Update formData object with other form field values
const updateFormData = () => {
  // Project type
  const projectTypeSelect = document.getElementById("project-type");
  if (projectTypeSelect) {
    formData.projectType = projectTypeSelect.value;
  }

  // Contact method
  const contactMethodRadios = document.querySelectorAll(
    'input[name="contact-method"]'
  );
  contactMethodRadios.forEach((radio) => {
    if (radio.checked) {
      formData.contactMethod = radio.value;
    }
  });

  // Newsletter
  const newsletterCheckbox = document.getElementById("newsletter");
  if (newsletterCheckbox) {
    formData.newsletter = newsletterCheckbox.checked;
  }
};

// Submit form
if (contactForm) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    // Validate all fields
    const isNameValid = validateName();
    const isEmailValid = validateEmail();
    const isSubjectValid = validateSubject();
    const isMessageValid = validateMessage();
    const areTermsAccepted = validateTerms();

    // Update other form data
    updateFormData();

    // If all validations pass
    if (
      isNameValid &&
      isEmailValid &&
      isSubjectValid &&
      isMessageValid &&
      areTermsAccepted
    ) {
      // Save form data to localStorage (for demonstration purposes)
      localStorage.setItem("contactFormData", JSON.stringify(formData));

      // Show success message and hide form
      contactForm.classList.add("hidden");
      formSuccess.classList.remove("hidden");

      // Log form data to console (for testing)
      console.log("Form submitted successfully:", formData);
    }
  });
}

// Allow sending another message
if (sendAnother) {
  sendAnother.addEventListener("click", () => {
    contactForm.reset();
    contactForm.classList.remove("hidden");
    formSuccess.classList.add("hidden");
  });
}

// Prefill form if data exists in localStorage (for demonstration)
const savedData = localStorage.getItem("contactFormData");
if (savedData && nameInput) {
  const parsedData = JSON.parse(savedData);

  // Only prefill non-sensitive data like name
  nameInput.value = parsedData.name || "";

  // Validate prefilled fields
  validateName();
}