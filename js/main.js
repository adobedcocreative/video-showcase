// Main application functionality
class VideoAdsShowcase {
    constructor() {
        this.currentFilter = 'all';
        this.searchTerm = '';
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

    renderFilterButtons() {
        const filterContainer = document.getElementById('filterButtons');
        if (!filterContainer || !adData) return;

        const allAds = [...adData.videoAds, ...adData.ctvAds];
        const uniqueCategories = [...new Set(
            allAds
                .map(ad => (ad.category || '').trim())
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
                this.searchTerm = e.target.value.toLowerCase();
                this.filterAndDisplayAds();
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

        // Hero buttons
        const heroButtons = document.querySelectorAll('.hero-buttons .btn');
        heroButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                if (e.target.textContent.includes('Video')) {
                    this.scrollToSection('video-ads');
                } else if (e.target.textContent.includes('CTV')) {
                    this.scrollToSection('ctv-ads');
                }
            });
        });

        // Navigation links
        const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                this.scrollToSection(targetId);
            });
        });

        // Dropdown menu items for filtering
        const dropdownItems = document.querySelectorAll('.dropdown-item');
        dropdownItems.forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                const href = item.getAttribute('href');
                
                if (href && href.startsWith('#')) {
                    // Extract category from href (e.g., "#carousel" -> "carousel")
                    const category = href.substring(1);
                    
                    // Update filter state
                    this.currentFilter = category;
                    
                    // Update active filter button
                    const filterButtons = document.querySelectorAll('.filter-btn');
                    filterButtons.forEach(btn => btn.classList.remove('active'));
                    
                    // Find and activate the corresponding filter button
                    const correspondingFilterBtn = document.querySelector(`[data-filter="${category}"]`);
                    if (correspondingFilterBtn) {
                        correspondingFilterBtn.classList.add('active');
                    }
                    
                    // Apply the filter
                    this.filterAndDisplayAds();
                    
                    // Scroll to the main content area
                    this.scrollToSection('ctv-ads');
                }
            });
        });

        // Handle dropdown toggle functionality
        const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
        dropdownToggles.forEach(toggle => {
            toggle.addEventListener('click', (e) => {
                e.preventDefault();
                const dropdown = toggle.closest('.dropdown');
                const dropdownMenu = dropdown.querySelector('.dropdown-menu');
                
                // Close other dropdowns
                document.querySelectorAll('.dropdown').forEach(otherDropdown => {
                    if (otherDropdown !== dropdown) {
                        otherDropdown.classList.remove('active');
                    }
                });
                
                // Toggle current dropdown
                dropdown.classList.toggle('active');
            });
        });

        // Close dropdowns when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.dropdown')) {
                document.querySelectorAll('.dropdown').forEach(dropdown => {
                    dropdown.classList.remove('active');
                });
            }
        });

        // Logo click to reset filters
        const logoSection = document.querySelector('.nav-logo');
        if (logoSection) {
            logoSection.addEventListener('click', () => {
                this.resetFilters();
            });
        }
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

    createAdCard(ad, type) {
        const card = document.createElement('div');
        card.className = 'ad-card fade-in';
        card.dataset.category = ad.category.toLowerCase();
        card.dataset.type = type;
        card.dataset.adId = ad.id;

        card.innerHTML = `
            <div class="ad-thumbnail">
                <video class="ad-thumbnail-video" muted loop playsinline preload="metadata" poster="${ad.thumbnail}">
                    <source src="${ad.videoSrc}" type="video/mp4">
                </video>
                <div class="ad-thumbnail-controls">
                    <button class="thumbnail-control-btn play-toggle-btn" aria-label="Pause preview">
                        <span class="ui-icon" aria-hidden="true">⏸</span>
                    </button>
                    <button class="thumbnail-control-btn mute-toggle-btn" aria-label="Unmute preview">
                        <span class="ui-icon" aria-hidden="true">🔇</span>
                    </button>
                </div>
            </div>
            <div class="ad-info">
                <h3 class="ad-title">${ad.title}</h3>
                <p class="ad-type">${type === 'video' ? 'Ad Type - VAST Ad' : 'Ad Type - VPAID Ad'}</p>
                <p class="ad-description">${ad.description}</p>
                <div class="ad-meta">
                    <span class="ad-category">${ad.category}</span>
                    <span class="ad-duration">${ad.duration}</span>
                </div>
            </div>
        `;

        // Add click event to open modal
        card.addEventListener('click', () => {
            this.openAdModal(ad);
        });

        const video = card.querySelector('.ad-thumbnail-video');
        const playToggleButton = card.querySelector('.play-toggle-btn');
        const muteToggleButton = card.querySelector('.mute-toggle-btn');

        if (video && playToggleButton && muteToggleButton) {
            const playIcon = playToggleButton.querySelector('.ui-icon');
            const muteIcon = muteToggleButton.querySelector('.ui-icon');

            const updateControls = () => {
                playIcon.textContent = video.paused ? '▶' : '⏸';
                playToggleButton.setAttribute('aria-label', video.paused ? 'Play preview' : 'Pause preview');

                muteIcon.textContent = video.muted ? '🔇' : '🔊';
                muteToggleButton.setAttribute('aria-label', video.muted ? 'Unmute preview' : 'Mute preview');
            };

            playToggleButton.addEventListener('click', (e) => {
                e.stopPropagation();
                if (video.paused) {
                    video.play().catch(() => {});
                } else {
                    video.pause();
                }
                updateControls();
            });

            muteToggleButton.addEventListener('click', (e) => {
                e.stopPropagation();
                video.muted = !video.muted;
                updateControls();
            });

            card.addEventListener('mouseenter', () => {
                video.play().catch(() => {});
            });

            card.addEventListener('mouseleave', () => {
                video.pause();
                video.currentTime = 0;
            });

            video.addEventListener('play', updateControls);
            video.addEventListener('pause', updateControls);
            video.addEventListener('volumechange', updateControls);
            video.pause();
            video.defaultMuted = true;
            video.muted = true;
            updateControls();
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
                allAds = allAds.filter(ad => ad.category.toLowerCase() === this.currentFilter.toLowerCase());
            }
        }

        // Apply search
        if (this.searchTerm) {
            allAds = allAds.filter(ad => 
                ad.title.toLowerCase().includes(this.searchTerm) ||
                ad.description.toLowerCase().includes(this.searchTerm) ||
                ad.category.toLowerCase().includes(this.searchTerm) ||
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
            const otherGrid = this.currentFilter === 'video' ? 'ctvAdGrid' : 'videoAdGrid';
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

        const modalTitle = this.modal.querySelector('.modal-title');
        const modalBody = this.modal.querySelector('.ad-preview-container');
        const adDescription = this.modal.querySelector('.ad-description-preview');
        const adHowItWorks = this.modal.querySelector('.ad-how-it-works');
        const howItWorksSection = this.modal.querySelector('.how-it-works-section');
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
        
        // Determine if this is a CTV ad
        const isCtvAd = ad.id.startsWith('ctv-') || adData.ctvAds.some(ctvAd => ctvAd.id === ad.id);


if (ad.howItWorks) {
    howItWorksSection.style.display = 'block';
    if (Array.isArray(ad.howItWorks)) {
        adHowItWorks.innerHTML = `<ul>${ad.howItWorks.map(item => 
            `<li>${item}</li>`
        ).join('')}</ul>`;
    } else {
        adHowItWorks.textContent = ad.howItWorks;
    }
} else {
    howItWorksSection.style.display = 'none';
}
        
        formatSpan.textContent = ad.format;
        durationSpan.textContent = ad.duration;
        categorySpan.textContent = ad.category;
        if (dimensionsSpan) {
            dimensionsSpan.textContent = 'Loading...';
        }
        // Load ad preview
       if (ad.videoSrc) {
            // Video preview
            modalBody.innerHTML = `
                    <div class="video-with-side-controls">
                        <video class="preview-media" autoplay muted playsinline>
                            <source src="${ad.videoSrc}" type="video/mp4">
                            Your browser does not support the video tag.
                        </video>
                        <div class="side-video-controls">
                            <button class="side-control-btn play-pause-btn" type="button" aria-label="Pause" title="Pause">
                                <span class="ui-icon" aria-hidden="true">⏸</span>
                            </button>
                            <button class="side-control-btn mute-unmute-btn" type="button" aria-label="Mute" title="Mute">
                                <span class="ui-icon" aria-hidden="true">🔊</span>
                            </button>
                            <button class="side-control-btn open-preview-btn" type="button" aria-label="Open preview" title="Open preview">
                                <span class="open-icon-external" aria-hidden="true">↗</span>
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
        this.modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }

    updateDimensionsFromMedia(mediaElement, dimensionsSpan) {
        if (!mediaElement || !dimensionsSpan) return;

        const setDimensions = () => {
            const isVideo = mediaElement.tagName.toLowerCase() === 'video';
            const width = isVideo ? mediaElement.videoWidth : mediaElement.naturalWidth;
            const height = isVideo ? mediaElement.videoHeight : mediaElement.naturalHeight;

            if (width && height) {
                dimensionsSpan.textContent = `${width} x ${height} px`;
            } else {
                dimensionsSpan.textContent = '-';
            }
        };

        const isVideo = mediaElement.tagName.toLowerCase() === 'video';
        const isReady = isVideo
            ? mediaElement.readyState >= 1
            : mediaElement.complete;

        if (isReady) {
            setDimensions();
            return;
        }

        const successEvent = isVideo ? 'loadedmetadata' : 'load';
        mediaElement.addEventListener(successEvent, setDimensions, { once: true });
        mediaElement.addEventListener('error', () => {
            dimensionsSpan.textContent = '-';
        }, { once: true });
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
                muteIcon.textContent = isMuted ? '🔇' : '🔊';
            }
            muteUnmuteBtn.setAttribute('aria-label', isMuted ? 'Unmute' : 'Mute');
            muteUnmuteBtn.title = isMuted ? 'Unmute' : 'Mute';
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

    downloadAdAssets(ad) {
        // Get the video URL (prefer fullscreen, fallback to regular)
        const videoUrl = ad.videoSrc || ad.fullscreenVideoSrc;
        
        if (!videoUrl) {
            alert('No video available to preview');
            return;
        }

        // Create video overlay with background image
        this.showVideoOverlay(videoUrl, ad.title);
    }

    showVideoOverlay(videoUrl, title) {
        // Create overlay container
        const overlay = document.createElement('div');
        overlay.className = 'video-overlay';
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.9);
            z-index: 10000;
            display: flex;
            align-items: center;
            justify-content: center;
            opacity: 0;
            transition: opacity 0.3s ease;
        `;

        // Create video container with background image
        const videoContainer = document.createElement('div');
        videoContainer.style.cssText = `
            position: relative;
            width: 100%;
            height: 100%;
            background-image: url('images/VideoAd_PreviewBg.png');
            background-size: contain;
            background-repeat: no-repeat;
            background-position: center;
            display: flex;
            align-items: center;
            justify-content: center;
        `;

        // Create video element
        const video = document.createElement('video');
        video.style.cssText = `
            width: 480px;
            margin-left: 22px;
            margin-top: 143px;
            object-fit: contain;
        `;
        video.controls = false;
        video.autoplay = true;
        video.muted = false;
        video.src = videoUrl;

        // Create close button
        const closeBtn = document.createElement('button');
        closeBtn.innerHTML = '&times;';
        closeBtn.style.cssText = `
            position: absolute;
            top: 20px;
            right: 20px;
            background: rgba(255, 255, 255, 0.9);
            border: none;
            border-radius: 50%;
            width: 40px;
            height: 40px;
            font-size: 24px;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: background 0.2s ease;
            color: #333;
            font-weight: bold;
        `;

        // Add hover effect to close button
        closeBtn.addEventListener('mouseenter', () => {
            closeBtn.style.background = 'rgba(255, 255, 255, 1)';
        });
        closeBtn.addEventListener('mouseleave', () => {
            closeBtn.style.background = 'rgba(255, 255, 255, 0.9)';
        });

        // Close overlay function
        const closeOverlay = () => {
            overlay.style.opacity = '0';
            setTimeout(() => {
                if (overlay.parentNode) {
                    document.body.removeChild(overlay);
                }
                document.body.style.overflow = 'auto';
            }, 300);
        };

        // Add event listeners
        closeBtn.addEventListener('click', closeOverlay);
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                closeOverlay();
            }
        });

        // Handle escape key
        const handleEscape = (e) => {
            if (e.key === 'Escape') {
                closeOverlay();
                document.removeEventListener('keydown', handleEscape);
            }
        };
        document.addEventListener('keydown', handleEscape);

        // Assemble the overlay
        videoContainer.appendChild(video);
        videoContainer.appendChild(closeBtn);
        overlay.appendChild(videoContainer);
        
        // Add to DOM and show
        document.body.appendChild(overlay);
        document.body.style.overflow = 'hidden';
        
        // Fade in
        setTimeout(() => {
            overlay.style.opacity = '1';
        }, 100);

        // Handle video load error
        video.addEventListener('error', () => {
            alert('Error loading video. Please try again.');
            closeOverlay();
        });
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

        // Close any open dropdowns
        document.querySelectorAll('.dropdown').forEach(dropdown => {
            dropdown.classList.remove('active');
        });

        // Apply the reset filters (show all ads)
        this.filterAndDisplayAds();

        // Scroll to top of the page
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
}

// Add some CSS for no-results display and dropdown functionality
const noResultsCSS = `
.no-results {
    grid-column: 1 / -1;
    text-align: center;
    padding: 4rem 2rem;
    color: #666;
}

.no-results i {
    font-size: 3rem;
    margin-bottom: 1rem;
    opacity: 0.5;
}

.no-results p {
    font-size: 1.2rem;
}

/* Dropdown styles */
.dropdown {
    position: relative;
}

.dropdown-menu {
    display: none;
    position: absolute;
    top: 100%;
    left: 0;
    background: white;
    min-width: 160px;
    box-shadow: 0 8px 16px rgba(0,0,0,0.1);
    border-radius: 4px;
    z-index: 1000;
    padding: 8px 0;
    margin-top: 4px;
}

.dropdown.active .dropdown-menu {
    display: block;
}

.dropdown-item {
    display: block;
    padding: 8px 16px;
    color: #333;
    text-decoration: none;
    transition: background-color 0.2s;
}

.dropdown-item:hover {
    background-color: #f5f5f5;
    color: #667eea;
}

.dropdown-toggle {
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 8px;
}

.dropdown-toggle i {
    transition: transform 0.2s;
}

.dropdown.active .dropdown-toggle i {
    transform: rotate(180deg);
}

/* Logo clickable style */
.nav-logo {
    cursor: pointer;
    transition: opacity 0.2s;
}

.video-with-side-controls {
    display: inline-flex;
    align-items: flex-start;
    gap: 12px;
}

.side-video-controls {
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin-top: 8px;
}

.side-control-btn {
    border: none;
    border-radius: 4px;
    background: rgba(0, 0, 0, 0.75);
    color: #fff;
    padding: 8px;
    cursor: pointer;
    font-size: 18px;
    width: 40px;
    height: 40px;
    line-height: 1;
    display: flex;
    align-items: center;
    justify-content: center;
}

.side-control-btn:hover {
    background: rgba(0, 0, 0, 0.9);
}

.open-icon-external {
    display: inline-block;
    font-size: 16px;
    line-height: 1;
    transform: translateX(1px);
}

.side-control-btn.is-disabled,
.side-control-btn:disabled {
    opacity: 0.45;
    cursor: not-allowed;
}
`;

// Add CSS to head
const style = document.createElement('style');
style.textContent = noResultsCSS;
document.head.appendChild(style);

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize the main application
    new VideoAdsShowcase();
});
