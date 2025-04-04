// Function to get URL parameters
function getUrlParams() {
    const params = {};
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

    for (const [key, value] of urlParams.entries()) {
        if (params[key]) {
            // If the parameter already exists (for checkboxes with same name)
            if (!Array.isArray(params[key])) {
                params[key] = [params[key]];
            }
            params[key].push(value);
        } else {
            params[key] = value;
        }
    }

    return params;
}

// Helper function to generate HTML for a review field
function getFieldHtml(label, value, transform = null) {
    if (!value) return '';
    const displayValue = transform ? transform(value) : value;
    return `<li><strong>${label}:</strong> ${displayValue}</li>`;
}

// Helper function to format features
function formatFeatures(features) {
    if (Array.isArray(features)) {
        return features.join(', ');
    }
    return features;
}

// Function to display review details
function displayReviewDetails() {
    const params = getUrlParams();
    const reviewDetailsElement = document.getElementById('reviewDetails');

    if (!reviewDetailsElement || Object.keys(params).length === 0) {
        return;
    }

    const fields = [
        { label: 'Product', value: params.product },
        { label: 'Rating', value: params.rating,
          transform: (val) => `${val} star${val !== '1' ? 's' : ''}` },
        { label: 'Installation Date', value: params.installDate,
          transform: (val) => new Date(val).toLocaleDateString() },
        { label: 'Useful Features', value: params.features,
          transform: formatFeatures },
        { label: 'Review', value: params.review?.trim(),
          transform: (val) => `"${val}"` },
        { label: 'Name', value: params.username?.trim() }
    ];

    let detailsHTML = '<h3>Review Details:</h3><ul>';

    fields.forEach(field => {
        if (field.value) {
            detailsHTML += getFieldHtml(field.label, field.value, field.transform);
        }
    });

    detailsHTML += '</ul>';
    reviewDetailsElement.innerHTML = detailsHTML;
}

// Function to update the review counter using localStorage
function updateReviewCounter() {
    // Get the current count from localStorage, default to 0 if not set
    let reviewCount = parseInt(localStorage.getItem('reviewCount') || '0');

    // Increment the counter
    reviewCount++;

    // Save the new count back to localStorage
    localStorage.setItem('reviewCount', reviewCount.toString());

    // Update the counter display
    const reviewCountElement = document.getElementById('reviewCount');
    if (reviewCountElement) {
        reviewCountElement.textContent = reviewCount;
    }
}

// Initialize the review page when the DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    displayReviewDetails();
    updateReviewCounter();
});