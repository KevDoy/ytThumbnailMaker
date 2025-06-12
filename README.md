# YT Thumbnail Maker

![logo](https://raw.githubusercontent.com/KevDoy/ytThumbnailMaker/main/logo.png "YT Thumbnail Maker logo")

A self-hosted thumbnail generator for YouTube videos. Designed to help organizations create consistent, branded thumbnails quickly and efficiently.

![screenshot](https://github.com/KevDoy/ytThumbnailMaker/blob/main/_screenshots/preview.gif?raw=true "YT Thumbnail Maker Preview")

## Features
- Simple, intuitive interface
- Preset background templates
- Custom text positioning
- Logo toggle option
- Exports as JPG (under 2MB for YouTube requirements)
- No server-side code required

## Quick Start
1. Download the latest release
2. Replace `logo.png` with your own logo
3. Add your background images to the `backgrounds` folder (numbered sequentially: 1.jpg, 2.jpg, etc.)
4. Upload to any web server
5. Open in a browser and start creating thumbnails

## Setup Requirements
- Web server or local development environment
- Modern web browser
- Recommended minimum screen width of 1000px
- Background images should be 1920x1080px

## Usage
1. Select a background from presets
2. Add your title and subtitle text
3. Toggle logo visibility if needed
4. Click "Save Thumbnail" to download as JPG

## Customization
- Logo: Replace `logo.png` in root directory
- Backgrounds: Add JPG images to `backgrounds` folder named in order: '1.jpg', '2.jpg', and so on
- Styling: Modify CSS in `css/custom.css` to ensure seamless YTTM updates
- Text: Update default text in `index.html` as needed

## Browser Support
- Chrome or Brave (recommended)
- Firefox
- Safari
- Edge

## Contributing
Contributions are welcome! Please feel free to submit a Pull Request.

## License
This project is licensed under the MIT License - see the LICENSE file for details.

## Credits
Built with:
- Bootstrap 5
- html2canvas
- jQuery
