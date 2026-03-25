// Main application functionality
class VideoAdsShowcase {
    constructor() {
        this.currentFilter = 'all';
        this.searchTerm = '';
        this.searchDebounceTimer = null;
        this.modal = null;
        this.init();
    }

    init() {
        this.renderFilterButtons();
        this.setupEventListeners();
        this.setupFilterOverflow();
        this.setupModal();
        this.loadAds();
    }

    getAdCategories(ad) {
        const rawCategories = [];

        if (Array.isArray(ad.categories)) {
            rawCategories.push(...ad.categories);
        } else if (typeof ad.categories === 'string') {
            rawCategories.push(...ad.categories.split(','));
        }

        if (ad.category) {
            if (typeof ad.category === 'string') {
                rawCategories.push(...ad.category.split(','));
            } else {
                rawCategories.push(ad.category);
            }
        }

        const dedupedCategories = [];
        const seen = new Set();

        rawCategories
            .flatMap(category => String(category || '').split(','))
            .map(category => category.trim())
            .filter(Boolean)
            .forEach((category) => {
                const normalizedCategory = category.toLowerCase();
                if (seen.has(normalizedCategory)) return;

                seen.add(normalizedCategory);
                dedupedCategories.push(category);
            });

        return dedupedCategories;
    }

    getAdCategoryLabel(ad) {
        const categories = this.getAdCategories(ad);
        return categories.join(', ');
    }

    matchesCategoryFilter(ad, filterValue) {
        const normalizedFilter = String(filterValue || '').trim().toLowerCase();
        if (!normalizedFilter) return false;

        return this.getAdCategories(ad)
            .some(category => category.toLowerCase() === normalizedFilter);
    }

    renderFilterButtons() {
        const filterContainer = document.getElementById('filterButtons');
        if (!filterContainer || !adData) return;

        const allAds = [...adData.videoAds, ...adData.ctvAds];
        const uniqueCategories = [...new Set(
            allAds
                .flatMap(ad => this.getAdCategories(ad))
                .filter(Boolean)
        )].sort((firstCategory, secondCategory) => firstCategory.localeCompare(secondCategory));

        const buttons = ['all', ...uniqueCategories];

        filterContainer.innerHTML = `
            <div class="filter-visible-buttons"></div>
            <button type="button" class="filter-more-btn" aria-label="More categories" aria-haspopup="true" aria-expanded="false">
                <span class="ui-icon" aria-hidden="true">|||</span>
            </button>
            <div class="filter-overflow-menu" hidden></div>
        `;

        const visibleButtonsContainer = filterContainer.querySelector('.filter-visible-buttons');

        buttons.forEach((category, index) => {
            const isAll = category === 'all';
            const label = isAll ? 'All' : category;
            const dataFilterValue = isAll ? 'all' : category.toLowerCase();
            const activeClass = index === 0 ? ' active' : '';
            const button = document.createElement('button');

            button.className = `filter-btn category-filter-btn${activeClass}`;
            button.dataset.filter = dataFilterValue;
            button.textContent = label;
            visibleButtonsContainer.appendChild(button);
        });

        this.layoutFilterButtons();
    }

    setupFilterOverflow() {
        this.layoutFilterButtons();
        window.addEventListener('resize', () => {
            this.layoutFilterButtons();
        });
    }

    layoutFilterButtons() {
        const filterContainer = document.getElementById('filterButtons');
        if (!filterContainer) return;

        const visibleButtonsContainer = filterContainer.querySelector('.filter-visible-buttons');
        const overflowMenu = filterContainer.querySelector('.filter-overflow-menu');
        const moreButton = filterContainer.querySelector('.filter-more-btn');

        if (!visibleButtonsContainer || !overflowMenu || !moreButton) return;

        const allCategoryButtons = [...filterContainer.querySelectorAll('.category-filter-btn')];

        allCategoryButtons.forEach(button => {
            visibleButtonsContainer.appendChild(button);
        });

        overflowMenu.classList.remove('open');
        overflowMenu.hidden = true;
        moreButton.style.display = 'none';
        moreButton.setAttribute('aria-expanded', 'false');

        if (visibleButtonsContainer.scrollWidth <= filterContainer.clientWidth) return;

        moreButton.style.display = 'inline-flex';

        const movableButtons = [...visibleButtonsContainer.querySelectorAll('.category-filter-btn')]
            .filter(button => button.dataset.filter !== 'all');

        while (movableButtons.length && visibleButtonsContainer.scrollWidth + moreButton.offsetWidth > filterContainer.clientWidth) {
            const buttonToMove = movableButtons.pop();
            overflowMenu.prepend(buttonToMove);
        }

        if (!overflowMenu.children.length) {
            moreButton.style.display = 'none';
        }
    }

    setupEventListeners() {
        // Search functionality
        const searchInput = document.getElementById('searchInput');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                const latestValue = e.target.value;

                if (this.searchDebounceTimer) {
                    clearTimeout(this.searchDebounceTimer);
                    this.searchDebounceTimer = null;
                }

                if (latestValue.trim() === '') {
                    this.searchTerm = '';
                    this.filterAndDisplayAds();
                    return;
                }

                this.searchDebounceTimer = setTimeout(() => {
                    this.searchTerm = latestValue.toLowerCase();
                    this.filterAndDisplayAds();
                }, 800);
            });
        }

        // Filter buttons and overflow menu toggle
        const filterButtonsContainer = document.getElementById('filterButtons');
        if (filterButtonsContainer) {
            filterButtonsContainer.addEventListener('click', (e) => {
                const moreButton = e.target.closest('.filter-more-btn');
                const overflowMenu = filterButtonsContainer.querySelector('.filter-overflow-menu');

                if (moreButton && overflowMenu) {
                    const willOpen = !overflowMenu.classList.contains('open');
                    overflowMenu.classList.toggle('open', willOpen);
                    overflowMenu.hidden = !willOpen;
                    moreButton.setAttribute('aria-expanded', String(willOpen));
                    return;
                }

                const clickedFilterButton = e.target.closest('.filter-btn');
                if (!clickedFilterButton) return;

                filterButtonsContainer.querySelectorAll('.filter-btn').forEach(button => {
                    button.classList.remove('active');
                });

                clickedFilterButton.classList.add('active');
                this.currentFilter = clickedFilterButton.dataset.filter;
                this.filterAndDisplayAds();

                if (overflowMenu) {
                    overflowMenu.classList.remove('open');
                    overflowMenu.hidden = true;
                }

                const containerMoreButton = filterButtonsContainer.querySelector('.filter-more-btn');
                if (containerMoreButton) {
                    containerMoreButton.setAttribute('aria-expanded', 'false');
                }
            });

            document.addEventListener('click', (e) => {
                if (e.target.closest('#filterButtons')) return;

                const overflowMenu = filterButtonsContainer.querySelector('.filter-overflow-menu');
                const moreButton = filterButtonsContainer.querySelector('.filter-more-btn');
                if (overflowMenu) {
                    overflowMenu.classList.remove('open');
                    overflowMenu.hidden = true;
                }
                if (moreButton) {
                    moreButton.setAttribute('aria-expanded', 'false');
                }
            });
        }

        // Navigation links
        const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                this.scrollToSection(targetId);
            });
        });

        // Logo click to reset filters
        const logoSection = document.querySelector('.nav-logo');
        if (logoSection) {
            logoSection.addEventListener('click', () => {
                this.resetFilters();
            });
        }

        // Pause all videos if user leaves or redirects from the page.
        const pauseAllVideos = () => {
            document.querySelectorAll('video').forEach((videoElement) => {
                videoElement.pause();
            });
        };

        window.addEventListener('pagehide', pauseAllVideos);
        window.addEventListener('beforeunload', pauseAllVideos);
    }

    setupModal() {
        this.modal = document.getElementById('adModal');
        const closeBtn = document.querySelector('.modal .close');
        
        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                this.closeModal();
            });
        }

        // Close modal when clicking outside
        window.addEventListener('click', (e) => {
            if (e.target === this.modal) {
                this.closeModal();
            }
        });
    }

    loadAds() {
        this.displayAds('videoAdGrid', adData.videoAds, 'video');
        this.displayAds('ctvAdGrid', adData.ctvAds, 'ctv');
    }

    sortAdsByLatest(ads) {
        return [...ads].sort((firstAd, secondAd) => {
            const firstDate = new Date(firstAd.createdDate || 0).getTime();
            const secondDate = new Date(secondAd.createdDate || 0).getTime();
            return secondDate - firstDate;
        });
    }

    displayAds(containerId, ads, type) {
        const container = document.getElementById(containerId);
        if (!container) return;

        container.innerHTML = '';

        const sortedAds = this.sortAdsByLatest(ads);

        sortedAds.forEach(ad => {
            const adCard = this.createAdCard(ad, type);
            container.appendChild(adCard);
        });
    }

    getVolumeIconMarkup(isMuted = false) {
        const stateClass = isMuted ? 'is-muted' : 'is-unmuted';
        return `
            <svg class="ui-icon volume-svg ${stateClass}" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                <path class="volume-speaker" d="M2 8h3l4-3v14l-4-3H2z"></path>
                <path class="volume-wave" d="M13 9c1.7 1.2 1.7 4.8 0 6"></path>
                <path class="volume-wave" d="M16 7c2.8 2.2 2.8 7.8 0 10"></path>
                <path class="volume-cross volume-cross-a" d="M15 9.5L20 14.5"></path>
                <path class="volume-cross volume-cross-b" d="M20 9.5L15 14.5"></path>
            </svg>
        `;
    }

    createAdCard(ad, type) {
        const card = document.createElement('div');
        const categoryLabel = this.getAdCategoryLabel(ad);
        const internalUseBadge = ad.internalUseOnly ? `<span class="ad-internal-use">Internal Use Only</span>` : '';
        
        card.className = 'ad-card fade-in';
        card.dataset.type = type;
        card.dataset.adId = ad.id;

        card.innerHTML = `
            <div class="ad-thumbnail">
                <video class="ad-thumbnail-video" muted loop playsinline preload="metadata" poster="${ad.thumbnail}">
                    <source src="${ad.videoSrc}" type="video/mp4">
                </video>
            </div>
            <div class="ad-info">
                <h3 class="ad-title">${ad.title}</h3>
                <p class="ad-type">${type === 'video' ? 'Ad Type - VAST Ad' : 'Ad Type - VPAID Ad'}</p>
                <p class="ad-description">${ad.description}</p>
                <div class="ad-meta">
                    <div class="ad-category-wrapper">
                        <span class="ad-category">${categoryLabel}</span>
                        ${internalUseBadge}
                    </div>
                    <span class="ad-duration">${ad.duration}</span>
                </div>
            </div>
        `;

        // Add click event to open modal
        card.addEventListener('click', () => {
            this.openAdModal(ad);
        });

        const video = card.querySelector('.ad-thumbnail-video');

        if (video) {
            card.addEventListener('mouseenter', () => {
                video.play().catch(() => {});
            });

            card.addEventListener('mouseleave', () => {
                video.pause();
                video.currentTime = 0;
            });

            video.pause();
            video.defaultMuted = true;
            video.muted = true;
        }

        return card;
    }

    filterAndDisplayAds() {
        let allAds = [
            ...adData.videoAds.map(ad => ({...ad, type: 'video'})),
            ...adData.ctvAds.map(ad => ({...ad, type: 'ctv'}))
        ];

        // Apply filters
        if (this.currentFilter !== 'all') {
            if (['video', 'ctv'].includes(this.currentFilter)) {
                allAds = allAds.filter(ad => ad.type === this.currentFilter);
            } else {
                allAds = allAds.filter(ad => this.matchesCategoryFilter(ad, this.currentFilter));
            }
        }

        // Apply search
        if (this.searchTerm) {
            allAds = allAds.filter(ad => 
                ad.title.toLowerCase().includes(this.searchTerm) ||
                ad.description.toLowerCase().includes(this.searchTerm) ||
                this.getAdCategories(ad).some(category => category.toLowerCase().includes(this.searchTerm)) ||
                (ad.tags && ad.tags.some(tag => tag.toLowerCase().includes(this.searchTerm)))
            );
        }

        allAds = this.sortAdsByLatest(allAds);

        // Clear existing content and reset section visibility
        const videoGrid = document.getElementById('videoAdGrid');
        const ctvGrid = document.getElementById('ctvAdGrid');
        const videoSection = videoGrid?.closest('.ad-section');
        const ctvSection = ctvGrid?.closest('.ad-section');
        
        if (videoGrid) videoGrid.innerHTML = '';
        if (ctvGrid) ctvGrid.innerHTML = '';

        // Display filtered results
        if (this.currentFilter === 'all') {
            // Separate by type
            const videoAds = allAds.filter(ad => ad.type === 'video');
            const ctvAds = allAds.filter(ad => ad.type === 'ctv');
            
            this.displayFilteredAds('videoAdGrid', videoAds);
            this.displayFilteredAds('ctvAdGrid', ctvAds);
        } else if (['video', 'ctv'].includes(this.currentFilter)) {
            // Show all in the appropriate grid for type filters
            const targetGrid = this.currentFilter === 'video' ? 'videoAdGrid' : 'ctvAdGrid';
            const otherSection = this.currentFilter === 'video' ? ctvSection : videoSection;

            this.displayFilteredAds(targetGrid, allAds);

            // Hide the other section
            if (otherSection) {
                otherSection.style.display = 'none';
            }
        } else {
            // For category filters, separate by type and show in appropriate grids
            const videoAds = allAds.filter(ad => ad.type === 'video');
            const ctvAds = allAds.filter(ad => ad.type === 'ctv');
            
            this.displayFilteredAds('videoAdGrid', videoAds);
            this.displayFilteredAds('ctvAdGrid', ctvAds);
        }

        // Handle case where no results are found at all
        if (allAds.length === 0) {
            // Show a no results message in the first visible section
            if (videoSection && videoSection.style.display !== 'none') {
                videoGrid.innerHTML = `
                    <div class="no-results">
                        <span class="search-icon no-results-icon" aria-hidden="true"></span>
                        <p>No ads found matching your criteria.</p>
                    </div>
                `;
                videoSection.style.display = 'block';
            } else if (ctvSection) {
                ctvGrid.innerHTML = `
                    <div class="no-results">
                        <span class="search-icon no-results-icon" aria-hidden="true"></span>
                        <p>No ads found matching your criteria.</p>
                    </div>
                `;
                ctvSection.style.display = 'block';
            }
        }
    }

    displayFilteredAds(containerId, ads) {
        const container = document.getElementById(containerId);
        if (!container) return;

        const section = container.closest('.ad-section');
        
        container.innerHTML = '';

        if (ads.length === 0) {
            // Hide the entire section if no ads
            if (section) {
                section.style.display = 'none';
            }
            return;
        }

        // Show the section if it has ads
        if (section) {
            section.style.display = 'block';
        }

        ads.forEach(ad => {
            const adCard = this.createAdCard(ad, ad.type);
            container.appendChild(adCard);
        });
    }

    openAdModal(ad) {
        if (!this.modal) return;

        const modalContentElement = this.modal.querySelector('.modal-content');
        const modalBodyElement = this.modal.querySelector('.modal-body');
        if (modalContentElement) {
            modalContentElement.style.height = 'calc(72vh - 12px)';
        }
        if (modalBodyElement) {
            modalBodyElement.style.height = 'calc(72vh - 92px)';
        }

        const modalTitle = this.modal.querySelector('.modal-title');
        const modalBody = this.modal.querySelector('.ad-preview-container');
        const adDescription = this.modal.querySelector('.ad-description-preview');
        const adNameHeading = this.modal.querySelector('.ad-name');
        const formatSpan = this.modal.querySelector('.format');
        const durationSpan = this.modal.querySelector('.duration');
        const categorySpan = this.modal.querySelector('.category');
        const dimensionsSpan = this.modal.querySelector('.dimensions');

        // Update modal content
        modalTitle.textContent = '';
        if (adNameHeading) {
            adNameHeading.textContent = ad.title;
        }
        adDescription.textContent = ad.description;

        const descriptionCard = this.modal.querySelector('.description-card');
        let dynamicElementsCard = this.modal.querySelector('.dynamic-elements-card');
        if (!dynamicElementsCard && descriptionCard) {
            dynamicElementsCard = document.createElement('div');
            dynamicElementsCard.className = 'description-card dynamic-elements-card';
            dynamicElementsCard.innerHTML = `
                <h2 class="ad-description-title">Dynamic Elements</h2>
                <p class="ad-description-preview dynamic-fields-note"></p>
            `;
            descriptionCard.insertAdjacentElement('afterend', dynamicElementsCard);
        }

        if (dynamicElementsCard) {
            const dynamicFieldsNote = dynamicElementsCard.querySelector('.dynamic-fields-note');
            if (dynamicFieldsNote) {
                dynamicFieldsNote.textContent = 'The background video, on-screen text, and CTA are dynamically populated to adapt each video creative.';
            }
        }

        formatSpan.textContent = ad.format;
        durationSpan.textContent = ad.duration;
        
        // Display category
        const categoryLabel = this.getAdCategoryLabel(ad);
        categorySpan.textContent = categoryLabel;
        
        if (dimensionsSpan) {
            dimensionsSpan.textContent = 'Loading...';
        }
        // Load ad preview
       if (ad.videoSrc) {
            // Video preview
            modalBody.innerHTML = `
                    <div class="video-with-side-controls">
                        <video class="preview-media" autoplay muted playsinline style="width: 800px; height: 450px;">
                            <source src="${ad.videoSrc}" type="video/mp4">
                            Your browser does not support the video tag.
                        </video>
                        <div class="side-video-controls">
                            <button class="side-control-btn play-pause-btn" type="button" aria-label="Pause" title="Pause">
                                <span class="ui-icon" aria-hidden="true">⏸</span>
                            </button>
                            <button class="side-control-btn mute-unmute-btn" type="button" aria-label="Mute" title="Mute">
                                ${this.getVolumeIconMarkup(true)}
                            </button>
                            <button class="side-control-btn open-preview-btn" type="button" aria-label="Open preview" title="Open preview" style="padding:1px; overflow:hidden; background: rgb(249 250 252); box-shadow: inset 0 0 0 1px #d1d5db;">
                                <img class="open-icon-external" src="images/adobe_ad_icon.svg" alt="" aria-hidden="true" style="display:block; width:100%; height:100%; object-fit:contain; transform:none;">
                            </button>
                        </div>
                    </div>
            `;

            const modalVideoContainer = modalBody.querySelector('.video-with-side-controls');
            if (modalVideoContainer) {
                this.setupSideVideoControls(modalVideoContainer, ad);

                const previewVideo = modalVideoContainer.querySelector('video');
                if (previewVideo && dimensionsSpan) {
                    this.updateDimensionsFromMedia(previewVideo, dimensionsSpan);
                }
            }
        } else {
            // Fallback to thumbnail
            modalBody.innerHTML = `<img src="${ad.thumbnail}" alt="${ad.title}" class="preview-media">`;

            if (dimensionsSpan) {
                const previewImage = modalBody.querySelector('img.preview-media');
                if (previewImage) {
                    this.updateDimensionsFromMedia(previewImage, dimensionsSpan);
                }
            }
        }

        // Show modal
        this.modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }

    updateDimensionsFromMedia(mediaElement, dimensionsSpan) {
        if (!dimensionsSpan) return;

        dimensionsSpan.textContent = '1920 x 1080 px';
    }

    resolvePreviewLink(ad) {
        const directLink = ad && ad.previewLink ? String(ad.previewLink).trim() : '';
        if (directLink) return directLink;

        const allAds = [...adData.videoAds, ...adData.ctvAds];
        const matchedAd = allAds.find((candidate) => {
            const sameTitle = candidate.title === ad.title;
            const sameIdAndTitle = candidate.id === ad.id && sameTitle;
            return sameIdAndTitle || sameTitle;
        });

        return matchedAd && matchedAd.previewLink
            ? String(matchedAd.previewLink).trim()
            : '';
    }

    setupSideVideoControls(videoWrapper, ad) {
        const video = videoWrapper.querySelector('video');
        const playPauseBtn = videoWrapper.querySelector('.play-pause-btn');
        const muteUnmuteBtn = videoWrapper.querySelector('.mute-unmute-btn');
        const openPreviewBtn = videoWrapper.querySelector('.open-preview-btn');

        if (!video || !playPauseBtn || !muteUnmuteBtn) return;

        video.defaultMuted = true;
        video.muted = true;

        // Disable mute button if video has no audio
        const hasAudio = ad.hasAudio !== false; // Default to true if not specified
        muteUnmuteBtn.disabled = !hasAudio;
        muteUnmuteBtn.classList.toggle('is-disabled', !hasAudio);
        muteUnmuteBtn.setAttribute('aria-disabled', String(!hasAudio));
        if (!hasAudio) {
            muteUnmuteBtn.style.opacity = '0.5';
            muteUnmuteBtn.style.cursor = 'not-allowed';
            muteUnmuteBtn.title = 'No audio';
        }

        const updatePlayPauseLabel = () => {
            const isPaused = video.paused;
            const playPauseIcon = playPauseBtn.querySelector('.ui-icon');
            if (playPauseIcon) {
                playPauseIcon.textContent = isPaused ? '▶' : '⏸';
            }
            playPauseBtn.setAttribute('aria-label', isPaused ? 'Play' : 'Pause');
            playPauseBtn.title = isPaused ? 'Play' : 'Pause';
        };

        const updateMuteLabel = () => {
            const isMuted = video.muted;
            const muteIcon = muteUnmuteBtn.querySelector('.ui-icon');
            if (muteIcon) {
                muteIcon.classList.toggle('is-muted', isMuted);
                muteIcon.classList.toggle('is-unmuted', !isMuted);
            }
            if (hasAudio) {
                muteUnmuteBtn.setAttribute('aria-label', isMuted ? 'Unmute' : 'Mute');
                muteUnmuteBtn.title = isMuted ? 'Unmute' : 'Mute';
            }
        };

        playPauseBtn.addEventListener('click', () => {
            if (video.paused) {
                video.play();
            } else {
                video.pause();
            }
            updatePlayPauseLabel();
        });

        muteUnmuteBtn.addEventListener('click', () => {
            if (!hasAudio) {
                return; // Prevent toggle if no audio
            }
            video.muted = !video.muted;
            updateMuteLabel();
        });

        if (openPreviewBtn) {
            const previewLink = this.resolvePreviewLink(ad);
            const hasPreviewLink = previewLink.length > 0;

            openPreviewBtn.disabled = !hasPreviewLink;
            openPreviewBtn.classList.toggle('is-disabled', !hasPreviewLink);
            openPreviewBtn.setAttribute('aria-disabled', String(!hasPreviewLink));
            openPreviewBtn.title = hasPreviewLink ? 'Open preview' : 'Preview link unavailable';
            openPreviewBtn.setAttribute('aria-label', hasPreviewLink ? 'Open preview' : 'Preview link unavailable');

            openPreviewBtn.addEventListener('click', (event) => {
                event.preventDefault();
                event.stopPropagation();

                if (!hasPreviewLink) return;
                video.pause();
                window.open(previewLink, '_blank', 'noopener,noreferrer');
            });
        }

        video.addEventListener('play', updatePlayPauseLabel);
        video.addEventListener('pause', updatePlayPauseLabel);
        video.addEventListener('volumechange', updateMuteLabel);

        updatePlayPauseLabel();
        updateMuteLabel();
    }

    closeModal() {
        if (this.modal) {
            this.modal.style.display = 'none';
            document.body.style.overflow = 'auto';
            
            // Stop any playing videos
            const videos = this.modal.querySelectorAll('video');
            videos.forEach(video => {
                video.pause();
                video.currentTime = 0;
            });
        }
    }

    scrollToSection(sectionId) {
        const section = document.getElementById(sectionId);
        if (section) {
            const headerHeight = document.querySelector('.header').offsetHeight;
            const elementPosition = section.offsetTop;
            const offsetPosition = elementPosition - headerHeight - 20;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    }

    resetFilters() {
        // Reset filter state
        this.currentFilter = 'all';
        this.searchTerm = '';

        // Reset search input
        const searchInput = document.getElementById('searchInput');
        if (searchInput) {
            searchInput.value = '';
        }

        // Reset filter buttons
        const filterButtons = document.querySelectorAll('.filter-btn');
        filterButtons.forEach(btn => btn.classList.remove('active'));
        
        const allButton = document.querySelector('[data-filter="all"]');
        if (allButton) {
            allButton.classList.add('active');
        }

        // Apply the reset filters (show all ads)
        this.filterAndDisplayAds();

        // Scroll to top of the page
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize the main application
    new VideoAdsShowcase();
});
