// Ad data structure for video and CTV advertisements
const adData = {
    ctvAds: [
        {
            id: 'ctv-001',
            title: 'Adobe Carousel Ad',
            description: 'This interactive CTV ad promotes Adobe’s suite of creative products through a dynamic, headline-driven experience. Viewers can navigate through multiple branded messages using their TV remote, with smooth transitions between headlines. The ad features a QR code overlay that allows users to scan and access more information or special offers directly on their mobile devices.',
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
            id: 'ctv-002',
            title: 'Popz Cereal Brand Ad',
            description: 'Popz presents an interactive cereal ad where viewers can explore delicious flavors and vote for their favorite. Using your TV remote, navigate through flavor options and engage directly with the brand, making snack time fun and personalized.',
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
            id: 'ctv-003',
            title: 'Travel Ad Carousel',
            description: 'Dynamic travel advertisement featuring the latest destinations in an interactive carousel. Explore stunning locations through animated visuals, immersive video, and mobile-friendly QR codes—all navigable with your TV remote.',
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
        }
    ],
    videoAds: [
        {
            id: 'video-001',
            title: 'Level Up with Adobe Creative Cloud',
            description: 'This video ad features bold, eye-catching visuals that highlight the 40% discount on Adobe Creative Cloud, using sleek motion graphics and dynamic transitions to capture attention. An interactive QR code is prominently integrated into the video, encouraging viewers to engage directly. The ad delivers a high-energy, visually compelling message that speaks to creators looking to elevate their work.',
            category: 'Retail',
            format: 'MP4 Video',
            duration: '05s',
            thumbnail: 'images/thumbnails/creativity_standout.png',
            videoSrc: 'videos/300x250_videoAdSample_CreativityStandOut_HD.mp4',
            fullscreenVideoSrc: 'videos/300x250_videoAdSample_CreativityStandOut_HD.mp4',
            createdDate: '2025-09-10'
        },
        {
            id: 'video-002',
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
            id: 'video-003',
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
        {
            id: 'video-004',
            title: 'Auto Hub Ad with Dynamic Overlay',
            description: 'This car advertisement is based on geo-location to deliver a personalized experience. The dynamic overlay adjusts in real-time based on the viewer’s location, showcasing relevant region-specific details. This innovative approach ensures that every potential buyer receives tailored information designed to enhance their shopping journey and drive engagement.',
            category: 'Geo',
            format: 'MP4 Video',
            duration: '06s',
            thumbnail: 'images/thumbnails/auto.png',
            videoSrc: 'videos/auto.mp4',
            fullscreenVideoSrc: 'videos/auto.mp4',
            createdDate: '2025-09-03'
        },
        {
            id: 'video-005',
            title: 'Gaming Ad with Countdown',
            description: 'This gaming ad features a dynamic, geo-specific overlay that highlights exclusive offers on gaming consoles and accessories available near you. The countdown clock creates urgency by showing how much time is left to grab these limited-time deals. Tailored to your location, this ad delivers personalized promotions that level up your gaming experience and help you score the best bargains before time runs out!',
            category: 'Geo',
            format: 'MP4 Video',
            duration: '05s',
            thumbnail: 'images/thumbnails/countdown.png',
            videoSrc: 'videos/Countdown.mp4',
            fullscreenVideoSrc: 'videos/Countdown.mp4',
            createdDate: '2025-09-03'
        }
    ]
};

// Export data for use in main application
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { adData };
}
