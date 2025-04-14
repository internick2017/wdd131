/**
 * Projects JavaScript
 * Created by Nick Granados for WDD131 Project
 *
 * This file handles the projects page functionality, including filtering and loading projects
 */

// DOM Elements
const filterButtons = document.getElementById('filter-buttons');
const projectsContainer = document.getElementById('projects-container');

// Project data array - contains all projects
const projectsData = [
    {
        id: 'project1',
        title: 'E-commerce Website',
        description: 'A fully responsive e-commerce platform with shopping cart functionality, product filtering, and checkout.',
        image: 'images/project1.png',
        categories: ['frontend', 'ecommerce'],
        technologies: ['HTML', 'CSS', 'JavaScript']
    },
    {
        id: 'project2',
        title: 'Restaurant Website',
        description: 'A modern website for a local restaurant featuring online reservations and menu display.',
        image: 'images/project2.png',
        categories: ['frontend'],
        technologies: ['HTML', 'CSS', 'JavaScript']
    },
    {
        id: 'project3',
        title: 'Portfolio Template',
        description: 'A customizable portfolio template for creative professionals with project showcase.',
        image: 'images/project3.png',
        categories: ['frontend'],
        technologies: ['HTML', 'CSS', 'JavaScript']
    },
    {
        id: 'project4',
        title: 'Blog Platform',
        description: 'A full-stack blog platform with user authentication and content management system.',
        image: 'images/project4.png',
        categories: ['fullstack'],
        technologies: ['HTML', 'CSS', 'JavaScript', 'Node.js']
    },
    {
        id: 'project5',
        title: 'Task Management App',
        description: 'A drag-and-drop task management application with user accounts and project tracking.',
        image: 'images/project5.png',
        categories: ['fullstack'],
        technologies: ['HTML', 'CSS', 'JavaScript', 'React']
    },
    {
        id: 'project6',
        title: 'Clothing Store',
        description: 'An e-commerce platform for a clothing brand with shopping cart and payment integration.',
        image: 'images/project6.png',
        categories: ['ecommerce', 'fullstack'],
        technologies: ['HTML', 'CSS', 'JavaScript', 'React']
    }
];

// Function to render projects based on filter
const renderProjects = (filter = 'all') => {
    if (!projectsContainer) return;

    // Filter projects based on selected category
    const filteredProjects = filter === 'all'
        ? projectsData
        : projectsData.filter(project => project.categories.includes(filter));

    // Generate HTML for projects
    const projectsHTML = filteredProjects.map(project => {
        // Create technology tags HTML
        const tagsHTML = project.technologies.map(tech =>
            `<span>${tech}</span>`
        ).join('');

        // Return project card HTML using template literals
        return `
            <div class="project-card" data-id="${project.id}">
                <img src="${project.image}" alt="${project.title}" loading="lazy">
                <h3>${project.title}</h3>
                <p>${project.description}</p>
                <div class="project-tags">
                    ${tagsHTML}
                </div>
                <a href="#${project.id}" class="btn btn-sm">View Details</a>
            </div>
        `;
    }).join('');

    // Update the DOM with the filtered projects
    projectsContainer.innerHTML = projectsHTML;

    // Add event listeners to project cards
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('click', (event) => {
            // Only trigger if not clicking the button
            if (!event.target.classList.contains('btn')) {
                const projectId = card.getAttribute('data-id');
                window.location.hash = projectId;
            }
        });
    });

    // Display message if no projects found
    if (filteredProjects.length === 0) {
        projectsContainer.innerHTML = `
            <div class="no-projects">
                <h3>No projects found</h3>
                <p>No projects match the selected filter. Please try another category.</p>
            </div>
        `;
    }
};

// Initialize filter buttons functionality
if (filterButtons && projectsContainer) {
    // Add click event to filter buttons
    filterButtons.addEventListener('click', (event) => {
        // Only proceed if a filter button was clicked
        if (event.target.classList.contains('filter-btn')) {
            // Remove active class from all buttons
            document.querySelectorAll('.filter-btn').forEach(btn => {
                btn.classList.remove('active');
            });

            // Add active class to clicked button
            event.target.classList.add('active');

            // Get the filter value and render projects
            const filter = event.target.getAttribute('data-filter');
            renderProjects(filter);
        }
    });

    // Initial render
    renderProjects();
}

// Create object to store view counts
const projectViewCounts = {};

// Function to track project views
const trackProjectView = (projectId) => {
    // Get existing counts from localStorage or initialize empty object
    const storedCounts = localStorage.getItem('projectViewCounts');
    const counts = storedCounts ? JSON.parse(storedCounts) : {};

    // Increment view count for this project
    counts[projectId] = (counts[projectId] || 0) + 1;

    // Save updated counts back to localStorage
    localStorage.setItem('projectViewCounts', JSON.stringify(counts));

    // Return the current count
    return counts[projectId];
};

// Function to display project view counts
const displayProjectViewCounts = () => {
    // Get stored view counts
    const storedCounts = localStorage.getItem('projectViewCounts');
    if (!storedCounts) return;

    const counts = JSON.parse(storedCounts);

    // For each project detail section, add view count if available
    document.querySelectorAll('.project-detail').forEach(section => {
        const projectId = section.id;
        const viewCount = counts[projectId] || 0;

        // Find or create a view count element
        let viewCountElement = section.querySelector('.view-count');
        if (!viewCountElement) {
            viewCountElement = document.createElement('div');
            viewCountElement.className = 'view-count';
            section.querySelector('.project-info').appendChild(viewCountElement);
        }

        // Update the view count text
        viewCountElement.textContent = `Views: ${viewCount}`;
    });
};

// Check if we're viewing a specific project (hash in URL)
const checkProjectInView = () => {
    if (window.location.hash) {
        const projectId = window.location.hash.substring(1);
        const projectElement = document.getElementById(projectId);

        if (projectElement?.classList.contains('project-detail')) {
            // Track this view
            const viewCount = trackProjectView(projectId);
            console.log(`Viewing ${projectId} (View count: ${viewCount})`);

            // Update display
            displayProjectViewCounts();
        }
    }
};

// Run on page load and when hash changes
window.addEventListener('load', checkProjectInView);
window.addEventListener('hashchange', checkProjectInView);

// Display initial view counts
document.addEventListener('DOMContentLoaded', displayProjectViewCounts);