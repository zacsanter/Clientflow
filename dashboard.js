function updateDashboardTitle() {
    const titleElement = document.querySelector('#location-dashboard .hl-header-content .title');
    if (titleElement) {
        titleElement.textContent = 'Home';
        titleElement.style.opacity = 1;
    }
}

new MutationObserver(() => {
    if (window.location.href.indexOf("/dashboard") > -1) {
        // Directly update title without fading if element is present
        const titleElement = document.querySelector('#location-dashboard .hl-header-content .title');
        if (titleElement) {
            updateDashboardTitle();
        } else {
            // Retry after a short delay if element is not yet present
            setTimeout(updateDashboardTitle, 50);
        }
    }
}).observe(document.body, { attributes: true, subtree: true, childList: true });

// Initial call to handle the case when the page is loaded directly on the dashboard
if (window.location.href.indexOf("/dashboard") > -1) {
    // Directly update title without fading if element is present
    const titleElement = document.querySelector('#location-dashboard .hl-header-content .title');
    if (titleElement) {
        updateDashboardTitle();
    } else {
        // Retry after a short delay if element is not yet present
        setTimeout(updateDashboardTitle, 50);
    }
}
