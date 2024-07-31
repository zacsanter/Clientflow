(function() {
    // Subaccount IDs for which the script will be applied
    const specificIDs = ['jj31lxOQa7oHZol5G4GE'];

    // IDs of sidebar elements to hide
    const hideIDs = ['sb_reporting', 'sb_app-media', 'sb_automation', 'sb_memberships'];

    // IDs of top menu elements to hide based on sections
    const hideSectionIDs = {
        'payments': ['tb_payment-orders-new', 'tb_payment-subscriptions', 'tb_payment-links'],
        'marketing': ['tb_affiliate-manager'],
        'funnels-websites': ['tb_stores', 'tb_websites', 'tb_analytics', 'tb_blogs', 'tb_wordpress-v2', 'tb_clientportal', 'tb_url-redirects', 'tb_sites-domain-settings'],
        'reputation': ['tb_online-listings']
    };

    let changesApplied = false;

    // Get the current subaccount ID from the URL
    function getCurrentSubaccountID() {
        const url = window.location.href;
        const match = url.match(/location\/([^\/]+)/);
        return match ? match[1] : null;
    }

    // Update the dashboard title to "Home"
    function updateDashboardTitle() {
        const titleElement = document.querySelector('#location-dashboard .hl-header-content .title');
        if (titleElement) {
            titleElement.textContent = 'Home';
        }
    }

    // Replace sidebar text with the new values
    function replaceSidebarText() {
        const sidebar = document.querySelector('#sidebar-v2');
        if (sidebar) {
            const textNodes = getTextNodesUnder(sidebar);
            textNodes.forEach(node => {
                if (node.nodeValue) {
                    node.nodeValue = node.nodeValue
                        .replace(/Dashboard/g, 'Home')
                        .replace(/Opportunities/g, 'Cases')
                        .replace(/Conversations/g, 'Messages')
                        .replace(/Payments/g, 'Invoice & Sign')
                        .replace(/Reputation/g, 'Reviews')
                        .replace(/Sites/g, 'Funnels & Forms');
                }
            });
        }
    }

    // Update the top menu titles based on the current page
    function updatePageTitles() {
        const titleElement = document.querySelector('.topmenu-navtitle');
        if (titleElement) {
            if (window.location.href.includes("/opportunities")) {
                titleElement.textContent = 'Cases';
            } else if (window.location.href.includes("/conversations")) {
                titleElement.textContent = 'Messages';
            } else if (window.location.href.includes("/calendars")) {
                titleElement.textContent = 'Calendars';
            } else if (window.location.href.includes("/contacts")) {
                titleElement.textContent = 'Contacts';
            } else if (window.location.href.includes("/payments")) {
                titleElement.textContent = 'Invoice & Sign';
            } else if (window.location.href.includes("/marketing")) {
                titleElement.textContent = 'Marketing';
            } else if (window.location.href.includes("/funnels-websites")) {
                titleElement.textContent = 'Funnels & Forms';
            } else if (window.location.href.includes("/reputation")) {
                titleElement.textContent = 'Reviews';
            } else {
                titleElement.textContent = 'Dashboard';
            }
        }
    }

    // Hide specified sidebar items
    function hideSidebarItems() {
        hideIDs.forEach(id => {
            const element = document.getElementById(id);
            if (element) {
                element.style.display = 'none';
            }
        });
    }

    // Hide specified top menu items for a given section
    function hideTopMenuItems(section) {
        const idsToHide = hideSectionIDs[section] || [];
        idsToHide.forEach(id => {
            const element = document.getElementById(id);
            if (element) {
                element.style.display = 'none';
            }
        });
    }

    // Utility function to get text nodes under an element
    function getTextNodesUnder(element) {
        const walk = document.createTreeWalker(element, NodeFilter.SHOW_TEXT, null, false);
        const textNodes = [];
        let node;
        while ((node = walk.nextNode())) {
            textNodes.push(node);
        }
        return textNodes;
    }

    // Apply all the changes if the conditions are met
    function applyChanges() {
        if (specificIDs.includes(getCurrentSubaccountID()) && !changesApplied) {
            replaceSidebarText();
            updateDashboardTitle();
            hideSidebarItems();
            updatePageTitles();

            if (window.location.href.includes("/payments")) {
                hideTopMenuItems('payments');
            } else if (window.location.href.includes("/marketing")) {
                hideTopMenuItems('marketing');
            } else if (window.location.href.includes("/funnels-websites")) {
                hideTopMenuItems('funnels-websites');
            } else if (window.location.href.includes("/reputation")) {
                hideTopMenuItems('reputation');
            }

            changesApplied = true;
        }
    }

    // Observe DOM changes and apply changes when necessary
    const observer = new MutationObserver(() => {
        if (specificIDs.includes(getCurrentSubaccountID())) {
            applyChanges();
        }
    });

    observer.observe(document.body, { childList: true, subtree: true });

    // Initial application of changes
    applyChanges();
})();
