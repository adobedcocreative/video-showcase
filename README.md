# Video Showcase

An Adobe team-built showcase page for presenting our video and CTV creative work to a broader audience.

The experience is designed to help viewers quickly discover campaigns, understand how each creative works, and open live previews.

## What This Showcase Includes

- Curated gallery of video and CTV ads
- Category-based filtering for faster browsing
- Search across ad title, description, category, and tags
- Interactive preview modal with:
	- Play/pause and mute/unmute controls
	- Dimensions, format, duration, and category details
	- "Open preview" action for the live creative link
- Responsive layout for desktop and mobile

## Audience

This page is intended for internal and external stakeholders who want a quick, visual view of our creative capabilities and recent work.

## Tech Stack

- HTML
- CSS
- Vanilla JavaScript (no framework dependency)

## Project Structure

```text
video-showcase/
├── index.html              # Main page markup
├── README.md               # Project documentation
├── css/
│   └── styles.css          # Styling and responsive behavior
├── js/
│   ├── data.js             # Showcase content data (ads metadata)
│   └── main.js             # Rendering, filtering, search, and modal logic
├── images/                 # Logos, thumbnails, and supporting visuals
├── fonts/                  # Local font assets
└── videos/                 # Local video assets (if used)
```

## How To Run Locally

1. Open `index.html` directly in a browser, or
2. Serve the folder with a local static server for a closer production-like setup.

Example using Python:

```bash
cd video-showcase
python3 -m http.server 8080
```

Then open `http://localhost:8080`.

## Updating Showcase Content

To add or update ads:

1. Edit `js/data.js`
2. Add/update ad metadata fields (title, description, category, duration, media source, preview link, etc.)
3. Ensure corresponding media files exist in the expected folders

The UI will automatically pick up data changes through the existing render/filter/search flow.

## Notes

- Mute/unmute and preview controls are custom UI behavior handled in `js/main.js`.
- Filters and search are data-driven and do not require markup changes for new categories.
- Keep media naming and paths consistent to avoid broken thumbnails/videos.
