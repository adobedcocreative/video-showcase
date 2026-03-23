// Ad data structure for video and CTV advertisements
const adData = {
    ctvAds: [
        {
            id: 'ctv-001',
            title: 'Popz Cereal Brand Ad',
            description: 'An interactive cereal ad where viewers use the remote to explore flavors and vote for their favorite.',
            howItWorks: [
                'Use the left arrow on your remote to select the first Popz cereal flavor, or the right arrow to select the second flavor.',
                'Your choice is recorded instantly—no extra button press needed! Enjoy voting for your favorite cereal flavor directly from your TV screen.'
            ],
            category: 'Poll',
            format: 'MP4 Video',
            duration: '17s',
            thumbnail: 'images/thumbnails/cereal-ad.png',
            videoSrc: 'videos/cereal-ad-fullscreen.mp4',
            fullscreenVideoSrc: 'videos/cereal-ad-fullscreen.mp4',
            createdDate: '2025-07-31'
        },
        {
            id: 'ctv-002',
            title: 'Travel Ad Carousel',
            description: 'A travel carousel ad with remote navigation, immersive visuals, and a QR code for quick engagement.',
            howItWorks: [
                'Use your TV remote to explore different travel destinations by pressing the left or right arrows to scroll through the video carousel.',
                'When you find a destination you like, press the OK or Play button to start the video, and press OK or Pause to pause it at any time.',
                'The ad includes a unique QR code—just scan it with your phone’s camera to learn more. You can switch between destinations anytime, and press Back or Home on your remote to exit the experience.'
            ],
            category: 'Carousel',
            format: 'MP4 Video',
            duration: '38s',
            thumbnail: 'images/thumbnails/travel_carousel.png',
            videoSrc: 'videos/travel_carousel_fullscreen.mp4',
            fullscreenVideoSrc: 'videos/travel_carousel_fullscreen.mp4',
            createdDate: '2025-07-31',
        },
        {
            id: 'ctv-003',
            title: 'Viasat Overlay',
            description: 'A dynamic ViaSat overlay ad with personalized messaging and a CTA reveal at the end.',
            category: 'Retail',
            format: 'MP4 Video',
            duration: '30s',
            thumbnail: 'images/thumbnails/viasat_overlay.png',
            videoSrc: 'videos/viasat_overlay.mp4',
            fullscreenVideoSrc: 'videos/viasat_overlay_fullscreen.mp4',
            createdDate: '2026-03-23',
        }
    ],
    videoAds: [
        {
            id: 'video-001',
            title: 'Adobe Creative Cloud',
            description: 'A high-energy Creative Cloud ad highlighting the 40% offer with motion graphics and an interactive QR code.',
            category: 'Retail',
            format: 'MP4 Video',
            duration: '30s',
            thumbnail: 'images/thumbnails/creativity_standout.png',
            videoSrc: 'videos/300x250_videoAdSample_CreativityStandOut_HD.mp4',
            fullscreenVideoSrc: 'videos/300x250_videoAdSample_CreativityStandOut_HD.mp4',
            createdDate: '2025-09-10'
        },
        {
            id: 'video-002',
            title: 'FIFA Video Takeover',
            description: 'A dynamic FIFA ad with a seamless video takeover moment for high-impact branding.',
            category: 'Entertainment',
            format: 'MP4 Video',
            duration: '48s',
            thumbnail: 'images/thumbnails/FC25.png',
            videoSrc: 'videos/fifaVideoTakeOver.mp4',
            fullscreenVideoSrc: 'videos/fifaVideoTakeOver.mp4',
            createdDate: '2025-07-31'
        },
         {
            id: 'video-003',
            title: 'Adobe Carousel Ad',
                description: 'An interactive Adobe carousel ad with remote navigation and a QR overlay for quick follow-up.',
            howItWorks: [
                'Use the left and right arrows on your remote to scroll through a series of Adobe product headlines.',
                'When you’re ready to learn more, simply press the OK button on your remote—this will trigger a QR code overlay, which you can scan with your phone to access more information or special offers.',
                'Press Back or Exit to return to your regular viewing experience at any time.'
            ],
            category: 'Carousel',
            format: 'MP4 Video',
            duration: '59s',
            thumbnail: 'images/thumbnails/adobe-carousel.png',
            videoSrc: 'videos/Carousel_NoRemote.mp4',
            fullscreenVideoSrc: 'videos/Carousel_NoRemote.mp4',
            createdDate: '2025-07-31'
        },
        {
            id: 'video-004',
            title: 'Flora Video Ad with QR',
            description: 'A Flora ad with animated overlays, live offer callouts, and a QR code for instant action.',
            category: 'Retail',
            format: 'MP4 Video',
            duration: '10s',
            thumbnail: 'images/thumbnails/Flora-ad.png',
            videoSrc: 'videos/Flora_Video.mp4',
            fullscreenVideoSrc: 'videos/Flora_Video.mp4',
            createdDate: '2025-07-31'
        },
        {
            id: 'video-005',
            title: 'Auto Hub Ad',
            description: 'A geo-targeted auto ad with dynamic overlays that personalize offers by viewer location.',
            category: 'Auto,Geo',
            format: 'MP4 Video',
            duration: '06s',
            thumbnail: 'images/thumbnails/auto.png',
            videoSrc: 'videos/auto.mp4',
            fullscreenVideoSrc: 'videos/auto.mp4',
            createdDate: '2025-09-03'
        },
        {
            id: 'video-006',
            title: 'Gaming Ad with Countdown',
            description: 'A geo-personalized gaming ad with dynamic offers and a countdown to drive urgency.',
            category: 'Geo',
            format: 'MP4 Video',
            duration: '05s',
            thumbnail: 'images/thumbnails/countdown.png',
            videoSrc: 'videos/Countdown.mp4',
            fullscreenVideoSrc: 'videos/Countdown.mp4',
            createdDate: '2025-09-03'
        },
        {
            id: 'video-007',
            title: 'Adobe Creative Cloud Pro Ad',
            description: 'An animated Creative Cloud Pro ad spotlighting 40% savings with a quick-scan QR code.',
            category: 'Geo',
            format: 'MP4 Video',
            duration: '15s',
            thumbnail: 'images/thumbnails/creative_cloud.png',
            videoSrc: 'videos/640x360_videoAdSample_StandOut_SD.mp4',
            fullscreenVideoSrc: 'videos/640x360_videoAdSample_StandOut_SD.mp4',
            createdDate: '2025-09-03'
        },
        {
            id: 'video-008',
            title: 'Salt and Vine Restaurant Ad',
            description: 'A restaurant ad with strong video, dynamic overlays, and a clean end-frame CTA.',
            category: 'Food',
            format: 'MP4 Video',
            duration: '15s',
            previewLink: 'https://advertising.adobe.com/adcloud/public/preview/creative/GNnjKHboll2rbD2ZS9yHQ%3D%3D',
            thumbnail: 'images/thumbnails/restaurant.png',
            videoSrc: 'videos/Restaurant_Ad.mp4',
            fullscreenVideoSrc: 'videos/Restaurant_Ad.mp4',
            createdDate: '2026-03-12'
        },
        {
            id: 'video-009',
            title: 'Noverra Business University',
            description: 'A university ad with background video, clean overlays, and dynamic text highlights.',
            category: 'Education',
            format: 'MP4 Video',
            duration: '10s',
            previewLink: 'https://advertising.adobe.com/adcloud/public/preview/creative/7YMrsYSxL60mBtzvbsh2bA%3D%3D',
            thumbnail: 'images/thumbnails/university.png',
            videoSrc: 'videos/University_ad.mp4',
            fullscreenVideoSrc: 'videos/University_Ad.mp4',
            createdDate: '2026-03-12'
        },
        {
            id: 'video-010',
            title: 'Tea Store Ad',
            description: 'A Tea Store ad with rich video, layered overlays, smooth animation, and a clear end-frame CTA.',
            category: 'Food',
            format: 'MP4 Video',
            duration: '15s',
            previewLink: 'https://advertising.adobe.com/adcloud/public/preview/creative/e6f7XNVx4DgLzXouuhBnNw%3D%3D',
            thumbnail: 'images/thumbnails/teastore.png',
            videoSrc: 'videos/TeaStore.mp4',
            fullscreenVideoSrc: 'videos/TeaStore.mp4',
            createdDate: '2026-03-12'
        },
        {
            id: 'video-011',
            title: 'The Offroader Automobile Ad',
            description: 'An off-roader ad with bold visuals, dynamic feature text, and a strong CTA.',
            category: 'Auto',
            format: 'MP4 Video',
            duration: '15s',
            previewLink: 'https://advertising.adobe.com/adcloud/public/preview/creative/59uTb4TdhRZR4DY9iDjjQ%3D%3D',
            thumbnail: 'images/thumbnails/automobile.png',
            videoSrc: 'videos/Automobile.mp4',
            fullscreenVideoSrc: 'videos/Automobile.mp4',
            createdDate: '2026-03-12'
        },
        {
            id: 'video-012',
            title: 'Fitness Club Ad',
            description: 'A gym ad featuring dynamic overlays, energetic video moments, and a polished end frame.',
            category: 'Health & Fitness',
            format: 'MP4 Video',
            duration: '15s',
            previewLink: 'https://advertising.adobe.com/adcloud/public/preview/creative/FxW6blsUmMoE2lNFvvbtJg%3D%3D',
            thumbnail: 'images/thumbnails/gym.png',
            videoSrc: 'videos/Gym.mp4',
            fullscreenVideoSrc: 'videos/Gym.mp4',
            createdDate: '2026-03-12'
        },
        {
            id: 'video-013',
            title: 'Liquefy Ad',
            description: 'A beverage ad with high-impact video and dynamic copy built for strong recall and action.',
            category: 'Food',
            format: 'MP4 Video',
            duration: '30s',
            previewLink: 'https://advertising.adobe.com/adcloud/public/preview/creative/A1p8eb4pm5HWKsKA3UAyhg%3D%3D',
            thumbnail: 'images/thumbnails/liquefy.png',
            videoSrc: 'videos/liquefy.mp4',
            fullscreenVideoSrc: 'videos/liquefy.mp4',
            createdDate: '2026-03-13'
        }
    ]
};

// Export data for use in main application
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { adData };
}
