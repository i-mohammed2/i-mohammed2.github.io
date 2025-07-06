# [NAME] - Portfolio Website

A modern, responsive portfolio website built with HTML, CSS, and JavaScript. Features smooth animations, clean design, and excellent user experience optimized for recruiters.

## 🚀 Features

- **Responsive Design**: Works perfectly on all devices
- **Smooth Animations**: CSS animations and JavaScript interactions
- **Modern UI**: Clean, professional design with gradient accents
- **Interactive Elements**: Hover effects, scroll animations, and smooth transitions
- **Contact Form**: Functional contact form with validation
- **SEO Optimized**: Meta tags and semantic HTML structure
- **Fast Loading**: Optimized for performance
- **Accessible**: WCAG compliant design

## 📁 File Structure

```
i-mohammed2.github.io/
├── index.html          # Main HTML file
├── styles.css          # Custom CSS styles
├── script.js           # JavaScript functionality
└── README.md           # This file
```

## 🎨 Personalization Guide

### 1. Basic Information
Replace all `[VALUE]` placeholders in `index.html` with your information:

#### Hero Section
- `[NAME]` - Your full name
- `[INITIALS]` - Your initials (e.g., "JD" for John Doe)
- `[TITLE]` - Your professional title (e.g., "Full Stack Developer")
- `[BRIEF_DESCRIPTION]` - A compelling one-liner about yourself

#### About Section
- `[ABOUT_HEADING]` - Section heading (e.g., "Passionate Developer")
- `[ABOUT_PARAGRAPH_1]` - First paragraph about your background
- `[ABOUT_PARAGRAPH_2]` - Second paragraph about your goals/passion
- `[YEARS_EXPERIENCE]` - Number of years of experience
- `[PROJECTS_COUNT]` - Number of projects completed
- `[COMPANIES_COUNT]` - Number of companies worked for
- `[PROFILE_IMAGE_PLACEHOLDER]` - Text for profile image placeholder

#### Experience Section
- `[JOB_TITLE_1]`, `[COMPANY_1]`, `[DATE_RANGE_1]`, `[JOB_DESCRIPTION_1]` - First job
- `[JOB_TITLE_2]`, `[COMPANY_2]`, `[DATE_RANGE_2]`, `[JOB_DESCRIPTION_2]` - Second job
- `[JOB_TITLE_3]`, `[COMPANY_3]`, `[DATE_RANGE_3]`, `[JOB_DESCRIPTION_3]` - Third job
- `[TECH_1]` through `[TECH_9]` - Technologies used at each job

#### Projects Section
- `[PROJECT_NAME_1]`, `[PROJECT_DESCRIPTION_1]` - First project
- `[PROJECT_NAME_2]`, `[PROJECT_DESCRIPTION_2]` - Second project
- `[PROJECT_NAME_3]`, `[PROJECT_DESCRIPTION_3]` - Third project

#### Skills Section
- `[FRONTEND_SKILL_1]`, `[SKILL_LEVEL_1]` - Frontend skills and proficiency (0-100)
- `[BACKEND_SKILL_1]`, `[SKILL_LEVEL_4]` - Backend skills and proficiency
- `[TOOL_SKILL_1]`, `[SKILL_LEVEL_7]` - Tools and proficiency

#### Contact Section
- `[CONTACT_DESCRIPTION]` - Brief description for contact section
- `[EMAIL]` - Your email address
- `[PHONE]` - Your phone number
- `[LOCATION]` - Your location (city, country)

#### Footer
- `[FOOTER_DESCRIPTION]` - Brief footer description

### 2. Customization Options

#### Colors
The website uses a blue-purple gradient theme. To change colors:
1. Edit the gradient values in `styles.css`
2. Look for `from-blue-600 to-purple-600` and similar patterns
3. Replace with your preferred color scheme

#### Fonts
- Currently uses Inter font from Google Fonts
- To change: Update the font import in `index.html` and font-family in `styles.css`

#### Images
- Replace placeholder divs with actual images
- Add your profile photo in the About section
- Add project screenshots in the Projects section

### 3. Adding Content

#### Adding More Experience Items
Copy the timeline-item structure and update the content:

```html
<div class="timeline-item">
    <div class="timeline-content">
        <div class="timeline-header">
            <h3 class="text-xl font-semibold text-gray-900">[NEW_JOB_TITLE]</h3>
            <span class="text-blue-600 font-medium">[NEW_COMPANY]</span>
        </div>
        <div class="timeline-date">[NEW_DATE_RANGE]</div>
        <p class="text-gray-600 mt-4">[NEW_JOB_DESCRIPTION]</p>
        <div class="mt-4">
            <span class="inline-block bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full mr-2 mb-2">[NEW_TECH_1]</span>
            <span class="inline-block bg-purple-100 text-purple-800 text-sm px-3 py-1 rounded-full mr-2 mb-2">[NEW_TECH_2]</span>
        </div>
    </div>
</div>
```

#### Adding More Projects
Copy the project-card structure and update:

```html
<div class="project-card">
    <div class="project-image">
        <div class="w-full h-48 bg-gradient-to-br from-[COLOR]-100 to-[COLOR]-100 rounded-t-lg flex items-center justify-center">
            <i class="fas fa-[ICON] text-4xl text-gray-400"></i>
        </div>
    </div>
    <div class="project-content">
        <h3 class="text-xl font-semibold text-gray-900 mb-2">[NEW_PROJECT_NAME]</h3>
        <p class="text-gray-600 mb-4">[NEW_PROJECT_DESCRIPTION]</p>
        <div class="flex flex-wrap gap-2 mb-4">
            <span class="tech-tag">[NEW_TECH_1]</span>
            <span class="tech-tag">[NEW_TECH_2]</span>
        </div>
        <div class="flex gap-3">
            <a href="[LIVE_DEMO_URL]" class="project-link">
                <i class="fas fa-external-link-alt mr-2"></i>
                Live Demo
            </a>
            <a href="[GITHUB_URL]" class="project-link">
                <i class="fab fa-github mr-2"></i>
                Code
            </a>
        </div>
    </div>
</div>
```

### 4. Deployment

#### GitHub Pages
1. Push your code to a GitHub repository
2. Go to Settings > Pages
3. Select source branch (usually `main`)
4. Your site will be available at `https://username.github.io/repository-name`

#### Other Hosting
- Upload files to any web hosting service
- Ensure all files are in the same directory
- The site will work immediately

## 🛠️ Technical Details

### Technologies Used
- **HTML5**: Semantic markup
- **CSS3**: Custom styles with Tailwind CSS framework
- **JavaScript**: Vanilla JS for interactions
- **Font Awesome**: Icons
- **Google Fonts**: Inter font family

### Browser Support
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

### Performance
- Optimized images and assets
- Minified CSS and JS (when deployed)
- Fast loading times
- Mobile-first responsive design

## 📱 Mobile Optimization

The website is fully responsive and optimized for:
- Mobile phones (320px+)
- Tablets (768px+)
- Desktop (1024px+)
- Large screens (1440px+)

## 🎯 SEO Features

- Semantic HTML structure
- Meta descriptions and titles
- Open Graph tags (can be added)
- Fast loading times
- Mobile-friendly design

## 🔧 Customization Tips

1. **Keep it Clean**: Don't overcrowd with too much information
2. **Use High-Quality Images**: Replace placeholders with professional photos
3. **Update Regularly**: Keep your experience and projects current
4. **Test on Mobile**: Always test the mobile experience
5. **Optimize Images**: Compress images for faster loading

## 📞 Support

If you need help customizing your portfolio:
1. Check this README for guidance
2. Review the HTML structure
3. Modify CSS classes as needed
4. Test changes locally before deploying

## 📄 License

This template is free to use and modify for personal and commercial projects.

---

**Happy coding! 🚀**