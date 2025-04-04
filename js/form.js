// Product array as provided in the assignment
const products = [
    { id: 1, name: "Deluxe Water Filter" },
    { id: 2, name: "Premium Air Purifier" },
    { id: 3, name: "Smart Thermostat" },
    { id: 4, name: "Solar Panel Kit" },
    { id: 5, name: "Home Security System" },
    { id: 6, name: "Smart LED Lighting" },
    { id: 7, name: "Wireless Doorbell Camera" }
];

// Function to populate the product dropdown
function populateProductDropdown() {
    const productSelect = document.getElementById('product');

    if (productSelect) {
        // Loop through the products array and add options to the select element
        products.forEach(product => {
            const option = document.createElement('option');
            option.value = product.name;
            option.textContent = product.name;
            productSelect.appendChild(option);
        });
    }
}

// Function to set today as the max date for the installation date
function setInstallDateMax() {
    const installDateInput = document.getElementById('installDate');
    if (installDateInput) {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        const maxDate = `${year}-${month}-${day}`;

        installDateInput.setAttribute('max', maxDate);
    }
}

// Initialize the form when the DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    populateProductDropdown();
    setInstallDateMax();
});