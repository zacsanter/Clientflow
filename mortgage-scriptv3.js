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

(function() {
    const specificIDs = ['ebN44ZZDqKXacptD3Rm7'];
    const iconUrls = {
        'sb_dashboard': 'https://uploads-ssl.webflow.com/64b5377d6986a8653501c06c/669e9d19b05ac2e0b2a515b7_CF%20Icon%20-%20Home_1.svg',
        'sb_conversations': 'https://uploads-ssl.webflow.com/64b5377d6986a8653501c06c/669e9d86cca54ae22933ebec_CF%20Icon%20-%20Messages.svg',
        'sb_calendars': 'https://uploads-ssl.webflow.com/64b5377d6986a8653501c06c/669e9ed5f13e559525c15718_CF%20Icon%20-%20Calendar_1.svg',
        'sb_contacts': 'https://uploads-ssl.webflow.com/64b5377d6986a8653501c06c/669e9ed5baa81c8438b38816_CF%20Icon%20-%20Contacts.svg',
        'sb_opportunities': 'https://uploads-ssl.webflow.com/64b5377d6986a8653501c06c/669e9ed51b29724575729b36_CF%20Icon%20-%20Cases.svg',
        'sb_payments': 'https://uploads-ssl.webflow.com/64b5377d6986a8653501c06c/669e9ed52defbfad6f028703_CF%20Icon%20-%20InvoicesSign.svg',
        'sb_email-marketing': 'https://uploads-ssl.webflow.com/64b5377d6986a8653501c06c/669e9ed56c5ab0f8baf149b3_CF%20Icon%20-%20Marketing.svg',
        'sb_sites': 'https://uploads-ssl.webflow.com/64b5377d6986a8653501c06c/669e9ed5e020a242eacafd05_CF%20Icon%20-%20Forms.svg',
        'sb_settings': 'https://uploads-ssl.webflow.com/64b5377d6986a8653501c06c/669e9e6e5c20f2dd81412b8b_CF%20Icon%20-%20Settings_1.svg',
        'sb_reputation': 'https://uploads-ssl.webflow.com/64b5377d6986a8653501c06c/669eabcca907b2cdb7d70ca8_CF%20Icon%20-%20Reputation v3.svg',
        'sb_location-mobile-app': 'https://uploads-ssl.webflow.com/64b5377d6986a8653501c06c/669ea7266da273956fa99558_CF%20Icon%20-%20Mobile App v3.svg'
    };
    const hideIDs = ['sb_reporting', 'sb_app-media', 'sb_automation', 'sb_memberships'];
    let changesApplied = false;

    function getCurrentSubaccountID() {
        const url = window.location.href;
        const match = url.match(/location\/([^\/]+)/);
        return match ? match[1] : null;
    }

    function replaceText() {
        const sidebar = document.querySelector('#sidebar-v2');
        let textChanged = false;
        if (sidebar) {
            const textNodes = getTextNodesUnder(sidebar);
            textNodes.forEach(node => {
                const originalText = node.nodeValue;
                const newText = originalText
                    .replace(/Opportunities/g, 'Cases')
                    .replace(/Dashboard/g, 'Home')
                    .replace(/Conversations/g, 'Messages')
                    .replace(/Payments/g, 'Invoice & Sign')
                    .replace(/Reputation/g, 'Reviews')
                    .replace(/Sites/g, 'Forms');
                if (newText !== originalText) {
                    node.nodeValue = newText;
                    textChanged = true;
                }
            });
        }
        return textChanged;
    }

    function getTextNodesUnder(el) {
        const walk = document.createTreeWalker(el, NodeFilter.SHOW_TEXT, null, false);
        const textNodes = [];
        let n;
        while (n = walk.nextNode()) textNodes.push(n);
        return textNodes;
    }

    function changeImage() {
        let allUpdated = true;
        Object.keys(iconUrls).forEach(id => {
            const imageElement = document.querySelector(`#${id} img`);
            if (imageElement) {
                const newSrc = `${iconUrls[id]}?time=${new Date().getTime()}`;
                if (imageElement.src !== newSrc) {
                    imageElement.src = newSrc;
                }
            } else {
                allUpdated = false;
            }
        });
        return allUpdated;
    }

    function replaceFontAwesomeIcons() {
        const iconMap = {
            '4ef91dc6-9fa4-415e-96a9-9a15a298d5d9': 'https://uploads-ssl.webflow.com/64b5377d6986a8653501c06c/669ebb50b525241704a8c534_CF%20Icon%20-%20Whatsapp v2.svg',
            'c6a282f5-82f5-42cb-af05-44f1977526fd': 'https://uploads-ssl.webflow.com/64b5377d6986a8653501c06c/669ebc7ebd1e50d338fc0348_CF%20Icon%20-%20New Lead.svg',
            'fe805c15-fdd8-4c7b-ac52-f7e918df91af': 'https://uploads-ssl.webflow.com/64b5377d6986a8653501c06c/669ebc7ee18fd232921d17ff_CF%20Icon%20-%20Add Remortgage.svg'
        };
        Object.keys(iconMap).forEach(id => {
            const link = document.getElementById(id);
            if (link) {
                const icon = link.querySelector('i.nav-fa-icon');
                if (icon) {
                    const img = document.createElement('img');
                    img.src = iconMap[id];
                    img.className = 'h-5 w-5 mr-2';
                    icon.parentNode.replaceChild(img, icon);
                }
            }
        });
    }

    function hideElements() {
        hideIDs.forEach(id => {
            const element = document.querySelector(`#${id}`);
            if (element) {
                element.style.display = 'none';
            }
        });
    }

    function createDivider(id) {
        const divider = document.createElement('div');
        divider.id = id;
        divider.className = 'w-full group px-3 flex items-center justify-start lg:justify-start xl:justify-start text-sm font-medium rounded-md cursor-pointer exact-active-class active text-gray-300 font-normal cursor-text divider';
        divider.innerHTML = '<p class="w-full text-left border-b border-solid my-3" style="line-height: 0.1em; font-size: 10px;"></p>';
        return divider;
    }

    function reorderMenu() {
        const nav = document.querySelector('nav.flex-1');
        
        // Check if divider-1 exists, if not create it
        let divider1 = document.getElementById('sb_divider-1');
        if (!divider1) {
            divider1 = createDivider('sb_divider-1');
        }
        
        // Check if divider-2 exists, if not create it
        let divider2 = document.getElementById('sb_divider-2');
        if (!divider2) {
            divider2 = createDivider('sb_divider-2');
        }

        const aboveDividerIds = ['sb_payments', 'sb_contacts', 'sb_calendars', 'sb_conversations', 'sb_opportunities', 'sb_dashboard'];
        const belowDividerIds1 = ['c6a282f5-82f5-42cb-af05-44f1977526fd', 'fe805c15-fdd8-4c7b-ac52-f7e918df91af', '0c00b7dd-1472-4583-96d3-300efa90270e', '78bd1c09-76e7-46a3-8b6c-084a4bcb4e85'];
        const belowDividerIds2 = ['sb_email-marketing', 'sb_sites', 'sb_reputation', 'sb_location-mobile-app', '4ef91dc6-9fa4-415e-96a9-9a15a298d5d9'];

        aboveDividerIds.forEach(id => {
            const element = document.getElementById(id);
            if (element) {
                nav.insertBefore(element, nav.firstChild);
            }
        });

        nav.appendChild(divider1);

        belowDividerIds1.forEach(id => {
            const element = document.getElementById(id);
            if (element) {
                nav.appendChild(element);
            }
        });

        nav.appendChild(divider2);

        belowDividerIds2.forEach(id => {
            const element = document.getElementById(id);
            if (element) {
                nav.appendChild(element);
            }
        });
    }

    function applyChanges() {
        if (specificIDs.includes(getCurrentSubaccountID()) && !changesApplied) {
            const textUpdated = replaceText();
            const allImagesUpdated = changeImage();
            hideElements();
            reorderMenu();
            replaceFontAwesomeIcons();

            if (textUpdated && allImagesUpdated) {
                // Apply fade-in effect
                const navHeader = document.querySelector('.sidebar-v2-location #sidebar-v2 .hl_nav-header nav');
                if (navHeader) {
                    navHeader.classList.add('fade-in');
                    setTimeout(() => {
                        navHeader.classList.add('visible');
                    }, 50); // Slight delay to trigger CSS transition
                }
                changesApplied = true;
            }
        }
    }

    function handleMutation(mutations) {
        mutations.forEach(mutation => {
            mutation.addedNodes.forEach(node => {
                if ((node.matches && node.matches('.sidebar-v2-location #sidebar-v2 .hl_nav-header nav')) || (node.querySelector && node.querySelector('.sidebar-v2-location #sidebar-v2 .hl_nav-header nav'))) {
                    changesApplied = false;
                    setTimeout(applyChanges, 0); // Apply changes when .sidebar-v2-location #sidebar-v2 .hl_nav-header nav is added
                }
            });
        });
    }

    const observer = new MutationObserver(handleMutation);

    // Observe the entire document for changes
    observer.observe(document.body, { childList: true, subtree: true });

    // Initial call to apply changes
    applyChanges();
})();
