# Video & CTV Ad Showcase

A modern web application for showcasing video advertisements and Connected TV (CTV) campaigns with an intuitive interface, filtering capabilities, and responsive design.

## Features

- **Modern Design**: Clean, professional interface with Adobe branding
- **Video & CTV Ads**: Dedicated sections for different ad types
- **Advanced Filtering**: Filter by category, format, and search functionality
- **Modal Previews**: Full-screen ad previews with detailed information
- **Responsive Layout**: Works on desktop, tablet, and mobile devices
- **Interactive Elements**: Hover effects, animations, and smooth scrolling

## Project Structure

```
video-ctv-showcase/
├── index.html              # Main HTML file
├── css/
│   └── styles.css          # Main stylesheet
├── js/
│   ├── data.js            # Ad data and configuration
│   └── main.js            # Main application logic
├── images/
│   └── thumbnails/        # Ad thumbnail images
├── videos/                # Video assets
├── ads/
│   ├── ctv/              # CTV ad HTML files
│   └── interactive/      # Interactive ad files
└── README.md             # This file
```

## Getting Started

### 1. Setup Files

The basic structure has been created. You need to add your actual assets:

#### Add Video Files
Place your video files in the `videos/` directory:
- `hero-video.mp4` - Hero section background video
- `xbox-avowed-preview.mp4` - Preview videos for ads
- `auto-campaign-preview.mp4`
- `retail-sale-preview.mp4`
- `ctv-entertainment-preview.mp4`
- `ctv-food-preview.mp4`
- `ctv-tech-preview.mp4`

#### Add Thumbnail Images
Place thumbnail images in `images/thumbnails/`:
- `xbox-avowed-thumb.jpg`
- `auto-campaign-thumb.jpg`
- `retail-sale-thumb.jpg`
- `ctv-entertainment-thumb.jpg`
- `ctv-food-thumb.jpg`
- `ctv-tech-thumb.jpg`

#### Add Ad HTML Files
Place your actual ad HTML files in the appropriate directories:
- Video ads: Reference existing files or create new ones
- CTV ads: Place in `ads/ctv/`
- Interactive ads: Place in `ads/interactive/`

### 2. Customization

#### Update Ad Data
Edit `js/data.js` to add your actual advertisements:

```javascript
const adData = {
    videoAds: [
        {
            id: 'your-ad-id',
            title: 'Your Ad Title',
            description: 'Description of your ad',
            category: 'Entertainment', // or your category
            format: 'HTML5 Video Banner',
            sizes: ['300x250', '728x90'],
            duration: '30s',
            thumbnail: 'images/thumbnails/your-thumb.jpg',
            videoSrc: 'videos/your-video.mp4',
            htmlPath: 'path/to/your/ad.html',
            tags: ['tag1', 'tag2'],
            createdDate: '2025-01-25'
        }
        // Add more ads...
    ],
    // ... ctv ads and interactive ads
};
```

#### Customize Styling
Modify `css/styles.css` to match your brand colors and styling preferences:

```css
:root {
    --primary-color: #0066cc;     /* Your primary brand color */
    --secondary-color: #ff6b6b;   /* Your accent color */
    --text-color: #333;           /* Main text color */
    --background-color: #f8f9fa;  /* Background color */
}
```

### 3. Development Server

For development, you can use any local server. Here are a few options:

#### Python (if installed)
```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```

#### Node.js (if installed)
```bash
# Install a simple server globally
npm install -g http-server

# Run in project directory
http-server -p 8000
```

#### VS Code Live Server Extension
1. Install the "Live Server" extension in VS Code
2. Right-click on `index.html`
3. Select "Open with Live Server"

Then open your browser to `http://localhost:8000`

## Integration with Existing Ads

### Xbox Game Pass Example
The data already references your existing Xbox Game Pass ad:
```javascript
htmlPath: '../XGP_AlabamaPN_GBR_160x600_BAN_AGN_EN_NA_Standard_ANI_JOINNOW_NA_1/XGP_AlabamaPN_GBR_160x600_BAN_AGN_EN_NA_Standard_ANI_JOINNOW_NA_1.html'
```

### Adding More Existing Ads
To add your other existing ads, update the `adData` object in `js/data.js`:

1. Reference the HTML files from your existing ad directories
2. Create thumbnail images for each ad
3. Add appropriate metadata (title, description, category, etc.)

## Features Explained

### Filtering System
- **All/Video/CTV/Interactive**: Filter by ad type
- **Search**: Real-time search through titles, descriptions, and tags
- **Sort**: Sort by newest, oldest, name, or category

### Modal Preview System
- Click any ad card to open a detailed preview
- Shows the actual ad (iframe or video)
- Displays campaign details and specifications
- Full-screen and download options

### Responsive Design
- Mobile-first approach
- Collapsible navigation for mobile
- Flexible grid layout
- Touch-friendly interactions

## Browser Support

- Chrome 60+
- Firefox 60+
- Safari 12+
- Edge 79+

## Performance Optimization

- Lazy loading for videos
- Optimized images (use WebP when possible)
- Minified CSS and JS for production
- Efficient DOM manipulation

## Next Steps

1. **Add Real Content**: Replace placeholder data with your actual ads
2. **Asset Optimization**: Optimize images and videos for web
3. **Analytics**: Add tracking for ad views and interactions
4. **CMS Integration**: Connect to a content management system
5. **User Accounts**: Add user authentication and saved favorites
6. **Advanced Filtering**: Add more filter options (date range, performance metrics)

## Troubleshooting

### Videos Not Playing
- Ensure video files are in the correct format (MP4 H.264)
- Check file paths in the data.js file
- Verify CORS settings if serving from different domains

### Ads Not Loading in Modal
- Check iframe permissions and CORS policies
- Ensure HTML file paths are correct
- Test ad files individually to verify they work

### Styling Issues
- Check browser developer tools for CSS errors
- Verify all CSS files are loading correctly
- Test in different browsers for compatibility

## Support

For questions or issues with this showcase:
1. Check the browser console for JavaScript errors
2. Verify all file paths are correct
3. Ensure your local server is running properly
4. Test with simplified content first, then add complexity

---

*This showcase is designed to work with Adobe's dynamic creative optimization tools and can be extended to integrate with Adobe's advertising platforms.*
