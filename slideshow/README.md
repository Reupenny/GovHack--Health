# OpenHealth API Slideshow

A professional HTML slideshow presentation for the OpenHealth API GovHack 2024 project.

## 🚀 Quick Start

The slideshow is ready to deploy! Simply push this repository to GitHub and enable GitHub Pages.

## 📋 Features

- **7 Professional Slides**: Complete project overview from problem to solution
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Interactive Navigation**: Click, keyboard arrows, or swipe to navigate
- **Professional Styling**: Modern gradient design with smooth animations
- **Architecture Diagram**: Includes the OpenHealth API system architecture

## 🎯 Slide Overview

1. **Title Slide**: Project introduction and team information
2. **The Problem**: Healthcare data fragmentation statistics and challenges
3. **Architecture**: Visual system overview with integrated diagram
4. **User Stories**: Real-world personas and impact scenarios  
5. **Key Features**: Core platform capabilities and benefits
6. **Impact & Benefits**: Expected outcomes across healthcare, equity, and efficiency
7. **Demo & Next Steps**: Live demo links and implementation roadmap

## 🛠️ How to Deploy on GitHub Pages

### Option 1: Direct Repository Deployment

1. **Push to GitHub**:
   ```bash
   git add slideshow/
   git commit -m "Add OpenHealth API slideshow"
   git push origin main
   ```

2. **Enable GitHub Pages**:
   - Go to your repository on GitHub
   - Click **Settings** tab
   - Scroll down to **Pages** section
   - Under **Source**, select **Deploy from a branch**
   - Choose **main** branch and **/ (root)** folder
   - Click **Save**

3. **Access Your Slideshow**:
   - Your slideshow will be available at: `https://yourusername.github.io/your-repo-name/slideshow/`
   - GitHub will provide the exact URL in the Pages settings

### Option 2: Dedicated Slideshow Repository

1. **Create New Repository**:
   - Go to GitHub and create a new repository named `openhealth-slideshow`
   - Initialize with README

2. **Upload Slideshow Files**:
   ```bash
   # Clone the new repo
   git clone https://github.com/yourusername/openhealth-slideshow.git
   cd openhealth-slideshow
   
   # Copy slideshow files (make index.html the root file)
   cp /path/to/GovHack--Health/slideshow/* .
   
   # Commit and push
   git add .
   git commit -m "Initial slideshow deployment"
   git push origin main
   ```

3. **Enable GitHub Pages**:
   - Repository Settings → Pages
   - Source: **Deploy from a branch**
   - Branch: **main**, Folder: **/ (root)**
   
4. **Access Your Slideshow**:
   - URL: `https://yourusername.github.io/openhealth-slideshow/`

### Option 3: GitHub Pages with Custom Domain (Advanced)

1. Follow Option 1 or 2 above
2. In your repository, add a file named `CNAME` with your custom domain:
   ```
   slideshow.yourdomain.com
   ```
3. Configure your DNS to point to GitHub Pages
4. Access via your custom domain

## 🎮 Navigation Controls

- **Arrow Keys**: ← Previous slide, → Next slide
- **Mouse/Touch**: Click navigation buttons or slide indicators
- **Mobile**: Swipe left/right to navigate
- **Keyboard Shortcuts**:
  - `Home`: Go to first slide
  - `End`: Go to last slide  
  - `F`: Toggle fullscreen mode

## 📱 Mobile Optimization

The slideshow is fully responsive and includes:
- Touch/swipe navigation
- Optimized layouts for small screens
- Readable font sizes on mobile
- Touch-friendly navigation buttons

## 🎨 Customization

### Updating Content
- Edit `index.html` to modify slide content
- Update `styles.css` for styling changes
- Modify `script.js` for functionality changes

### Adding New Slides
1. Add new slide HTML in `index.html`
2. Add corresponding dot indicator
3. Update `totalSlides` variable in `script.js`
4. Update slide counter display

### Color Scheme
The slideshow uses a professional blue gradient theme. Key colors:
- Primary: `#667eea` to `#764ba2`
- Accent: `#3498db`
- Text: `#2c3e50`

## 📸 Screenshots

The slideshow includes:
- Clean, modern design
- Professional color scheme
- Smooth animations
- Mobile-responsive layout
- Interactive navigation

## 🔗 Live Demo

Once deployed, share your slideshow URL with stakeholders, judges, and team members for the GovHack presentation.

## 📄 Files Structure

```
slideshow/
├── index.html          # Main slideshow file
├── styles.css          # Styling and animations  
├── script.js           # Navigation and interactions
├── assets/
│   └── architecture-diagram.png  # System architecture image
└── README.md           # This deployment guide
```

## 🏆 GovHack 2024 Presentation Ready

This slideshow is specifically designed for GovHack 2024 presentations with:
- 7 slides covering all key aspects
- Professional healthcare industry styling
- Mobile-friendly for demo on any device
- Quick loading and reliable performance
- Accessible navigation for all users

Perfect for pitching OpenHealth API to judges and showcasing your innovative healthcare solution!