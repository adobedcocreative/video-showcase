// Main application functionality
class VideoAdsShowcase {
    constructor() {
        this.currentFilter = 'all';
        this.searchTerm = '';
        this.modal = null;
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.setupModal();
        this.loadAds();
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

        // Filter buttons
        const filterButtons = document.querySelectorAll('.filter-btn');
        filterButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                filterButtons.forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
                this.currentFilter = e.target.dataset.filter;
                this.filterAndDisplayAds();
            });
        });

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

    displayAds(containerId, ads, type) {
        const container = document.getElementById(containerId);
        if (!container) return;

        container.innerHTML = '';

        ads.forEach(ad => {
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
                <img src="${ad.thumbnail}" alt="${ad.title}">
                <button class="play-button">
                    <i class="fas fa-play"></i>
                </button>
            </div>
            <div class="ad-info">
                <h3 class="ad-title">${ad.title}</h3>
                <p class="ad-type">${type === 'video' ? 'Ad Type - Video Ad' : 'Ad Type - CTV Ad'}</p>
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

        // Add hover effects for video
        const video = card.querySelector('video');
        if (video) {
            card.addEventListener('mouseenter', () => {
                video.play();
            });
            card.addEventListener('mouseleave', () => {
                video.pause();
                video.currentTime = 0;
            });
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
                        <i class="fas fa-search"></i>
                        <p>No ads found matching your criteria.</p>
                    </div>
                `;
                videoSection.style.display = 'block';
            } else if (ctvSection) {
                ctvGrid.innerHTML = `
                    <div class="no-results">
                        <i class="fas fa-search"></i>
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
        const formatSpan = this.modal.querySelector('.format');
        const durationSpan = this.modal.querySelector('.duration');

        // Update modal content
        modalTitle.textContent = ad.title;
        adDescription.textContent = ad.description;
        
        // Determine if this is a CTV ad
        const isCtvAd = ad.id.startsWith('ctv-') || adData.ctvAds.some(ctvAd => ctvAd.id === ad.id);
        
        // Show/hide "How It Works" section based on ad type
        if (isCtvAd && ad.howItWorks) {
            howItWorksSection.style.display = 'block';
            adHowItWorks.textContent = ad.howItWorks;
        } else {
            howItWorksSection.style.display = 'none';
        }
        
        formatSpan.textContent = ad.format;
        durationSpan.textContent = ad.duration;

        // Load ad preview
       if (ad.videoSrc) {
            // Video preview
            modalBody.innerHTML = `
                <video controls autoplay muted style="max-width: 100%; height: auto;">
                    <source src="${ad.videoSrc}" type="video/mp4">
                    Your browser does not support the video tag.
                </video>
            `;
        } else {
            // Fallback to thumbnail
            modalBody.innerHTML = `<img src="${ad.thumbnail}" alt="${ad.title}" style="max-width: 100%; height: auto;">`;
        }

        // Show modal
        this.modal.style.display = 'block';
        document.body.style.overflow = 'hidden';

        // Add modal action button events
        this.setupModalActions(ad);
    }

    setupModalActions(ad) {
        const fullScreenBtn = this.modal.querySelector('.btn-primary');
        const downloadBtn = this.modal.querySelector('.btn-secondary');

        if (fullScreenBtn) {
            fullScreenBtn.onclick = () => {
                if (ad.videoSrc) {
                    window.open(ad.fullscreenVideoSrc, '_blank');
                }
            };
        }

        if (downloadBtn) {
            downloadBtn.onclick = () => {
                // Implement download functionality
                this.downloadAdAssets(ad);
            };
        }
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
        const videoUrl = ad.fullscreenVideoSrc || ad.videoSrc;
        
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
            width: 90%;
            max-width: 1200px;
            height: 80%;
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
            width: 299px;
            height: 169px;
            margin-left: 19px;
            margin-bottom: 138px;
            left: 10px;
            object-fit: contain;
        `;
        video.controls = true;
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
