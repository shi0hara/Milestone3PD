const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
const port = 8080;

// Set view engine to ejs
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Load projects data
const projectsData = JSON.parse(fs.readFileSync(path.join(__dirname, 'data', 'projects.json'), 'utf8'));

// Routes
app.get('/', (req, res) => {
    res.render('index');
});

// Project detail page route
app.get('/projects/:slug', (req, res) => {
    const project = projectsData.find(p => p.slug === req.params.slug);
    
    if (!project) {
        return res.status(404).send('Project not found');
    }
    
    res.render('project', { project });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
