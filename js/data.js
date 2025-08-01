// Ad data structure for video and CTV advertisements
const adData = {
    ctvAds: [
        {
            id: 'ctv-001',
            title: 'Adobe Carousel Ad',
            description: 'This interactive CTV ad promotes Adobe’s suite of creative products through a dynamic, headline-driven experience. Viewers can navigate through multiple branded messages using their TV remote, with smooth transitions between headlines. The ad features a QR code overlay that allows users to scan and access more information or special offers directly on their mobile devices.',
            howItWorks: 'Use the left and right arrows on your remote to scroll through a series of Adobe product headlines. When you’re ready to learn more, simply press the OK button on your remote—this will trigger a QR code overlay, which you can scan with your phone to access more information or special offers. Press Back or Exit to return to your regular viewing experience at any time.',
            category: 'Carousel',
            format: 'MP4 Video',
            duration: '59s',
            thumbnail: 'images/thumbnails/adobe-carousel.png',
            videoSrc: 'videos/Carousel_Remote.mp4',
            fullscreenVideoSrc: 'videos/Carousel_NoRemote.mp4',
            createdDate: '2025-07-31'
        },
        {
            id: 'ctv-002',
            title: 'Popz Cereal Brand Ad',
            description: 'Popz presents an interactive cereal ad where viewers can explore delicious flavors and vote for their favorite. Using your TV remote, navigate through flavor options and engage directly with the brand, making snack time fun and personalized.',
            howItWorks: 'Use the left arrow on your remote to select the first Popz cereal flavor, or the right arrow to select the second flavor. Your choice is recorded instantly—no extra button press needed! Enjoy voting for your favorite cereal flavor directly from your TV screen.',
            category: 'Poll',
            format: 'MP4 Video',
            duration: '17s',
            thumbnail: 'images/thumbnails/cereal-ad.png',
            videoSrc: 'videos/cereal-ad.mp4',
            fullscreenVideoSrc: 'videos/cereal-ad-fullscreen.mp4',
            createdDate: '2025-07-31'
        },
        {
            id: 'ctv-003',
            title: 'Travel Ad Carousel',
            description: 'Dynamic travel advertisement featuring the latest destinations in an interactive carousel. Explore stunning locations through animated visuals, immersive video, and mobile-friendly QR codes—all navigable with your TV remote.',
            howItWorks: 'Use your TV remote to explore different travel destinations by pressing the left or right arrows to scroll through the video carousel. When you find a destination you like, press the OK or Play button to start the video, and press OK or Pause to pause it at any time.\nThe ad includes a unique QR code—just scan it with your phone’s camera to learn more. You can switch between destinations anytime, and press Back or Home on your remote to exit the experience.',
            category: 'Carousel',
            format: 'MP4 Video',
            duration: '38s',
            thumbnail: 'images/thumbnails/travel_carousel.png',
            videoSrc: 'videos/travel_carousel.mp4',
            fullscreenVideoSrc: 'videos/travel_carousel_fullscreen.mp4',
            createdDate: '2025-07-31',
        }
    ],
    videoAds: [
        {
            id: 'video-001',
            title: 'FIFA Video Takeover',
            description: 'This dynamic FIFA ad features a video takeover element that momentarily expands the content, creating a high-impact visual experience. Designed for maximum viewer engagement, the ad combines standard video playback with a seamless transition into a takeover moment, delivering key branding and promotional content in a bold and attention-grabbing format.',
            category: 'Entertainment',
            format: 'MP4 Video',
            duration: '48s',
            thumbnail: 'images/thumbnails/FC25.png',
            videoSrc: 'videos/fifaVideoTakeOver.mp4',
            fullscreenVideoSrc: 'videos/fifaVideoTakeOver.mp4',
            createdDate: '2025-07-31'
        },
        {
            id: 'video-002',
            title: 'Flora Video Ad with QR',
            description: 'This Flora Flower Shop ad combines video playback with dynamic UI overlays to deliver an engaging promotional experience. As the video plays, branded elements slide in from the left and bottom of the screen, displaying real-time promotional details such as current discounts and seasonal offers. A QR code is integrated into the overlay, enabling users to scan with their mobile device to access more information or redeem special deals.',
            category: 'Retail',
            format: 'MP4 Video',
            duration: '10s',
            thumbnail: 'images/thumbnails/Flora-ad.png',
            videoSrc: 'videos/Flora_Video.mp4',
            fullscreenVideoSrc: 'videos/Flora_Video.mp4',
            createdDate: '2025-07-31'
        },
        // {
        //     id: 'video-003',
        //     title: 'Tech Product Launch CTV',
        //     description: 'Premium Connected TV advertisement showcasing new technology product with 4K video quality.',
        //     howItWorks: 'Users can interact with the carousel using their remote to explore different destinations.',
        //     category: 'Technology',
        //     format: 'CTV Video 4K',
        //     sizes: ['3840x2160', '1920x1080'],
        //     duration: '60s',
        //     thumbnail: 'images/thumbnails/ctv-tech-thumb.jpg',
        //     videoSrc: 'videos/ctv-tech-preview.mp4',
        //     htmlPath: 'ads/ctv/tech-launch.html',
        //     tags: ['ctv', 'technology', '4k', 'product-launch'],
        //     createdDate: '2025-01-12'
        // }
    ]
};

// Export data for use in main application
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { adData, categories, adFormats, standardSizes };
}
