(function() {
    const specificIDs = ['39vAwlFCldUFvMyCtKGy'];
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
    const hideSectionIDs = {
        'payments': ['tb_payment-orders-new', 'tb_payment-subscriptions', 'tb_payment-links'],
        'marketing': ['tb_affiliate-manager'],
        'funnels-websites': ['tb_stores', 'tb_websites', 'tb_analytics', 'tb_blogs', 'tb_wordpress-v2', 'tb_clientportal', 'tb_url-redirects', 'tb_sites-domain-settings'],
        'reputation': ['tb_online-listings']
    };
    let changesApplied = false;

    function getCurrentSubaccountID() {
        const url = window.location.href;
        const match = url.match(/location\/([^\/]+)/);
        return match ? match[1] : null;
    }

    function updateDashboardTitle() {
        const titleElement = document.querySelector('#location-dashboard .hl-header-content .title');
        if (titleElement) {
            titleElement.textContent = 'Home';
            titleElement.style.opacity = 1;
        }
    }

    var quickActionsElement = document.getElementById("quickActions");
    if (quickActionsElement) {
        quickActionsElement.style.display = "none";
    }

    function handleIframeMessage(event) {
        if (event.data === 'navigate_to_email_templates') {
            navigateToEmailTemplates();
        } else if (event.data === 'navigate_to_text_templates') {
            navigateToTextTemplates();
        } else if (event.data === 'open_newlead_popup') {
            openNewLeadPopup();
        } else if (event.data === 'open_remortgage_popup') {
            openRemortgagePopup();
        }
    }

    function navigateToEmailTemplates() {
        const marketingLink = document.querySelector('a[href*="/marketing"]');
        if (marketingLink) {
            marketingLink.click();
            const observer = new MutationObserver((mutations, observer) => {
                const templatesLink = document.querySelector('a[href*="/marketing/emails/all"]');
                if (templatesLink) {
                    templatesLink.click();
                    observer.disconnect();
                }
            });
            observer.observe(document.body, {
                childList: true,
                subtree: true
            });
        }
    }

    function navigateToTextTemplates() {
        const conversationsLink = document.querySelector('a[href*="/conversations"]');
        if (conversationsLink) {
            conversationsLink.click();
            const observer = new MutationObserver((mutations, observer) => {
                const templatesLink = document.querySelector('a[href*="/conversations/templates"]');
                if (templatesLink) {
                    templatesLink.click();
                    observer.disconnect();
                }
            });
            observer.observe(document.body, {
                childList: true,
                subtree: true
            });
        }
    }

    function createPopupContainer(popupId, iframeSrc, iframeTitle, height) {
        const overlay = document.createElement('div');
        overlay.id = `popup-overlay-${popupId}`;
        overlay.style.cssText = 'position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0, 0, 0, 0.5); z-index: 9998; display: flex; justify-content: center; align-items: center;';
        overlay.onclick = () => closePopup(popupId);
        document.body.appendChild(overlay);

        const popupContainer = document.createElement('div');
        popupContainer.id = `popup-container-${popupId}`;
        popupContainer.style.cssText = `position: relative; width: 700px; height: ${height}px; max-height: 90%; background: white; border-radius: 20px; display: flex; flex-direction: column; justify-content: center; align-items: center;`;
        overlay.appendChild(popupContainer);

        const popupIframe = document.createElement('iframe');
        popupIframe.src = iframeSrc;
        popupIframe.style.cssText = 'width: 100%; height: 100%; border: none; border-radius: 20px;';
        popupIframe.id = `popup-${popupId}`;
        popupIframe.title = iframeTitle;
        popupContainer.appendChild(popupIframe);

        const closeBtn = document.createElement('button');
        closeBtn.id = `popup-close-btn-${popupId}`;
        closeBtn.innerHTML = '&times;';
        closeBtn.style.cssText = 'position: absolute; top: 10px; right: 20px; z-index: 10000; background: transparent; border: none; font-size: 24px; font-weight: bold; color: black; cursor: pointer;';
        closeBtn.onclick = () => closePopup(popupId);
        popupContainer.appendChild(closeBtn);
    }

    function openNewLeadPopup() {
        const popupContainer = document.getElementById('popup-container-newlead');
        const overlay = document.getElementById('popup-overlay-newlead');

        if (popupContainer && overlay) {
            popupContainer.style.display = 'flex';
            overlay.style.display = 'flex';
        } else {
            createPopupContainer('newlead', 'https://api.clientflow.ai/widget/form/Hpix7Xq0muUZmlINd37c', 'Manual Input', 865);
        }
    }

    function openRemortgagePopup() {
        const popupContainer = document.getElementById('popup-container-remortgage');
        const overlay = document.getElementById('popup-overlay-remortgage');

        if (popupContainer && overlay) {
            popupContainer.style.display = 'flex';
            overlay.style.display = 'flex';
        } else {
            createPopupContainer('remortgage', 'https://api.clientflow.ai/widget/form/ZN684guea1XfjJg3OIdT', 'New Remortgage Clients', 410);
        }
    }

    function closePopup(popupId) {
        const popupContainer = document.getElementById(`popup-container-${popupId}`);
        const overlay = document.getElementById(`popup-overlay-${popupId}`);

        if (popupContainer) {
            popupContainer.style.display = 'none';
        }
        if (overlay) {
            overlay.style.display = 'none';
        }
    }

    window.addEventListener('message', handleIframeMessage, false);

    new MutationObserver(() => {
        if (window.location.href.indexOf("/dashboard") > -1) {
            const titleElement = document.querySelector('#location-dashboard .hl-header-content .title');
            if (titleElement) {
                updateDashboardTitle();
            } else {
                setTimeout(updateDashboardTitle, 50);
            }
        }
    }).observe(document.body, { attributes: true, subtree: true, childList: true });

    if (window.location.href.indexOf("/dashboard") > -1) {
        const titleElement = document.querySelector('#location-dashboard .hl-header-content .title');
        if (titleElement) {
            updateDashboardTitle();
        } else {
            setTimeout(updateDashboardTitle, 50);
        }
    }

    function updateTitle() {
        const titleElement = document.querySelector('.topmenu-navtitle');
        if (titleElement) {
            if (window.location.href.indexOf("/opportunities") > -1) {
                titleElement.textContent = 'Cases';
            } else if (window.location.href.indexOf("/conversations") > -1) {
                titleElement.textContent = 'Messages';
            } else if (window.location.href.indexOf("/calendars") > -1) {
                titleElement.textContent = 'Calendars';
            } else if (window.location.href.indexOf("/contacts") > -1) {
                titleElement.textContent = 'Contacts';
            } else if (window.location.href.indexOf("/payments") > -1) {
                titleElement.textContent = 'Invoice & Sign';
            } else if (window.location.href.indexOf("/marketing") > -1) {
                titleElement.textContent = 'Marketing';
            } else if (window.location.href.indexOf("/funnels-websites") > -1) {
                titleElement.textContent = 'Funnels & Forms';
            } else if (window.location.href.indexOf("/reputation") > -1) {
                titleElement.textContent = 'Reviews';
            } else {
                titleElement.textContent = 'Dashboard';
            }
        }
    }

    function updateOpportunitiesContent() {
        updateTitle();

        const itemsCenterElements = document.querySelectorAll('.flex.items-center span');
        itemsCenterElements.forEach(element => {
            if (/Opportunities/i.test(element.textContent)) {
                element.textContent = element.textContent.replace(/Opportunities/i, 'Cases');
            }
        });

        itemsCenterElements.forEach(element => {
            if (/Pipelines/i.test(element.textContent)) {
                element.textContent = element.textContent.replace(/Pipelines/i, 'Stages');
            }
        });

        const addOpportunityElement = document.querySelector('.add-opportunity');
        if (addOpportunityElement) {
            addOpportunityElement.textContent = addOpportunityElement.textContent.replace(/Add opportunity/i, 'Add Case');
        }

        const countElements = document.querySelectorAll('.count');
        countElements.forEach(element => {
            if (/opportunities/i.test(element.textContent)) {
                element.textContent = element.textContent.replace(/(\d+)\s*opportunities/i, '$1 cases');
            }
        });

        const newTitleElement = document.querySelector('.title');
        if (newTitleElement) {
            newTitleElement.textContent = newTitleElement.textContent.replace(/Add new opportunity/i, 'Add new case');
        }

        const descriptionElement = document.querySelector('.description');
        if (descriptionElement) {
            descriptionElement.textContent = descriptionElement.textContent.replace(/Create new opportunity by filling in details and selecting a contact/i, 'Create new case by filling in details and selecting a contact');
        }

        const pb3Element = document.querySelector('.pb-3');
        if (pb3Element) {
            pb3Element.textContent = pb3Element.textContent.replace(/You can now have different owner for contact and opportunity./i, 'You can now have different owner for contact and case.');
        }

        const opportunityDetailsButton = document.querySelector('.bg-blue-50.font-bold.text-blue-800.w-48.rounded.p-2.text-left.text-xs');
        if (opportunityDetailsButton) {
            opportunityDetailsButton.textContent = opportunityDetailsButton.textContent.replace(/Opportunity Details/i, 'Case Details');
        }

        const pipelineTitleElement = document.querySelector('.hl_controls--left.flex h3');
        if (pipelineTitleElement) {
            pipelineTitleElement.textContent = pipelineTitleElement.textContent.replace(/Pipelines/i, 'Stages');
        }

        const createPipelineButton = document.querySelector('.hl_controls .hl_controls--right button');
        if (createPipelineButton && createPipelineButton.textContent.includes('Create new pipeline')) {
            createPipelineButton.textContent = createPipelineButton.textContent.replace(/Create new pipeline/i, 'Create new stage');
        }
    }

    function updateConversationsContent() {
        updateTitle();

        const itemsCenterElements = document.querySelectorAll('.flex.items-center span');
        itemsCenterElements.forEach(element => {
            if (/Conversations/i.test(element.textContent)) {
                element.textContent = element.textContent.replace(/Conversations/i, 'Messages');
            }
        });
    }

    function hidePaymentsIDs() {
        const idsToHide = hideSectionIDs['payments'];
        idsToHide.forEach(id => {
            const element = document.getElementById(id);
            if (element) {
                element.style.display = 'none';
            }
        });
    }

    function hideMarketingIDs() {
        const idsToHide = hideSectionIDs['marketing'];
        idsToHide.forEach(id => {
            const element = document.getElementById(id);
            if (element) {
                element.style.display = 'none';
            }
        });
    }

    function hideFunnelsWebsitesIDs() {
        const idsToHide = hideSectionIDs['funnels-websites'];
        idsToHide.forEach(id => {
            const element = document.getElementById(id);
            if (element) {
                element.style.display = 'none';
            }
        });
    }

    function hideReputationIDs() {
        const idsToHide = hideSectionIDs['reputation'];
        idsToHide.forEach(id => {
            const element = document.getElementById(id);
            if (element) {
                element.style.display = 'none';
            }
        });
    }

    function observeChanges() {
        const observer4 = new MutationObserver(() => {
            if (specificIDs.includes(getCurrentSubaccountID())) {
                if (window.location.href.indexOf("/opportunities") > -1) {
                    updateOpportunitiesContent();
                } else if (window.location.href.indexOf("/conversations") > -1) {
                    updateConversationsContent();
                } else if (window.location.href.indexOf("/payments") > -1) {
                    hidePaymentsIDs();
                } else if (window.location.href.indexOf("/marketing") > -1) {
                    hideMarketingIDs();
                } else if (window.location.href.indexOf("/funnels-websites") > -1) {
                    hideFunnelsWebsitesIDs();
                } else if (window.location.href.indexOf("/reputation") > -1) {
                    hideReputationIDs();
                }
                updateTitle();
                hideElements();
            }
        });

        observer4.observe(document.body, { attributes: true, subtree: true, childList: true });
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
                    .replace(/Sites/g, 'Funnels & Forms');
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

    function reorderMenu() {
        const nav = document.querySelector('nav.flex-1');
        const aboveDividerIds = ['sb_payments', 'sb_contacts', 'sb_calendars', 'sb_conversations', 'sb_opportunities', 'sb_dashboard'];
        const belowDividerIds = ['sb_email-marketing', 'sb_sites', 'sb_reputation', 'sb_location-mobile-app', '4ef91dc6-9fa4-415e-96a9-9a15a298d5d9'];

        aboveDividerIds.forEach(id => {
            const element = document.getElementById(id);
            if (element) {
                nav.insertBefore(element, nav.firstChild);
            }
        });

        belowDividerIds.forEach(id => {
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
                const navHeader = document.querySelector('.sidebar-v2-location #sidebar-v2 .hl_nav-header nav');
                if (navHeader) {
                    navHeader.classList.add('fade-in');
                    setTimeout(() => {
                        navHeader.classList.add('visible');
                    }, 50);
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
                    setTimeout(applyChanges, 0);
                }
            });
        });
    }

    const observer5 = new MutationObserver(handleMutation);
    observer5.observe(document.body, { childList: true, subtree: true });

    applyChanges();
    observeChanges();
})();
