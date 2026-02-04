# Project Detail Pages - Documentation

## Overview
Your portfolio now includes a complete project detail system with 9 template projects. Each project has its own dedicated page with full details, screenshots, and links.

## Project Structure

### Files Created/Modified

1. **data/projects.json** - Contains all project data (9 projects)
2. **views/project.ejs** - Template for project detail pages
3. **public/css/style.css** - Added project page styling (bottom of file)
4. **app.js** - Added `/projects/:slug` route
5. **views/index.ejs** - Updated carousel links to point to project pages
6. **public/images/projects/** - Created placeholder images for all 9 projects

### Available Projects

All projects can be accessed via: `http://localhost:8080/projects/{slug}`

1. **Travel List Application** - `/projects/travel-list-application`
2. **Sustainable E-Commerce (Figma Design)** - `/projects/sustainable-ecommerce`
3. **Portfolio Website** - `/projects/portfolio-website`
4. **E-Commerce Store** - `/projects/e-commerce-store`
5. **Recipe Finder** - `/projects/recipe-finder`
6. **Quiz Application** - `/projects/quiz-application`
7. **Expense Tracker** - `/projects/expense-tracker`
8. **Movie Search Engine** - `/projects/movie-search`
9. **Note Taking App** - `/projects/note-taking-app`

## How to Customize

### Adding New Projects

1. Open `data/projects.json`
2. Add a new object with these fields:
   ```json
   {
     "slug": "unique-url-name",
     "title": "Project Title",
     "category": "Web Development",
     "date": "Month Year",
     "short": "Short description for preview",
     "description": "Full project description (2-3 sentences)",
     "challenges": "What you learned and challenges faced",
     "tech": ["Technology1", "Technology2"],
     "features": [
       "Feature 1",
       "Feature 2"
     ],
     "featured": "/images/projects/folder-name/hero.jpg",
     "images": [
       "/images/projects/folder-name/screenshot1.jpg",
       "/images/projects/folder-name/screenshot2.jpg"
     ],
     "live": "https://your-live-demo.com",
     "repo": "https://github.com/yourusername/repo"
   }
   ```

3. Create a folder in `public/images/projects/` with your project slug name
4. Add images: `hero.jpg` (main) and `screenshot1.jpg`, `screenshot2.jpg`, etc.

### Editing Existing Projects

1. Open `data/projects.json`
2. Find the project by slug
3. Update any field (title, description, tech, features, etc.)
4. Save and refresh the page

### Replacing Placeholder Images

The current images are SVG placeholders. To replace them:

1. Navigate to `public/images/projects/{project-slug}/`
2. Replace `hero.jpg` with your main project image (recommended: 1200x630px)
3. Replace `screenshot1.jpg`, `screenshot2.jpg`, etc. with actual screenshots
4. Update the image paths in `projects.json` if you add more images

### Updating Links

In `projects.json`, update:
- `repo`: Your GitHub repository URL
- `live`: Your live demo/deployed site URL
- Remove `repo` or `live` fields if not applicable

### Updating Carousel on Homepage

The carousel in `views/index.ejs` (lines 197-354) now links to project detail pages. 

To add a new carousel item:
1. Copy an existing `carousel-item` div
2. Update the title, description, and tags
3. Update the `href` to `/projects/your-project-slug`

## Theme Support

All project pages support both dark and light modes:

**Dark Mode Colors:**
- Primary: Green/Cyan (#0dffab, #00b4d8)
- Background: Dark grays

**Light Mode Colors:**
- Primary: Purple (#8b5cf6, #a78bfa)
- Background: White

The theme automatically matches your homepage theme toggle.

## Features

Each project detail page includes:
- ✅ Hero section with featured image
- ✅ Project metadata (category, date)
- ✅ Tech stack badges
- ✅ Key features list
- ✅ Challenges & learnings section
- ✅ Screenshot gallery
- ✅ Links to live demo and GitHub repo
- ✅ Back to projects button
- ✅ Navigation to all projects
- ✅ Responsive design for mobile
- ✅ Theme-aware styling (dark/light mode)

## Testing

1. Start the server: `node app.js`
2. Visit: `http://localhost:8080`
3. Click "View Project" on any carousel item
4. Navigate through different projects
5. Test the back button to return to homepage
6. Toggle theme to see light mode styling

## Tips

- **Image sizes**: Hero images should be landscape (1200x630px recommended)
- **Screenshots**: Use 3-4 screenshots showing key features
- **Descriptions**: Keep short description under 100 characters for previews
- **Tech tags**: Use concise names (React, Node.js, API, etc.)
- **Features**: List 4-6 key features with action verbs
- **Links**: Test all GitHub and live demo links before deploying

## Next Steps

1. Replace placeholder images with real project screenshots
2. Update GitHub repo URLs to your actual repositories
3. Add live demo links when you deploy projects
4. Customize project descriptions to match your actual work
5. Add more projects as you build them

Your portfolio is now ready with a complete project showcase system! 🎉
