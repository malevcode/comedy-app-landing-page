const http = require('http');
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');
const port = 8080;

// Load environment variables from .env file
dotenv.config();

// Function to serve static files
function serveFile(filePath, contentType, response) {
    fs.readFile(filePath, (error, content) => {
        if (error) {
            response.writeHead(500);
            response.end('Sorry, check with the site admin for error: ' + error.code + ' ..\n');
            response.end();
        } else {
            response.writeHead(200, { 'Content-Type': contentType });
            response.end(content, 'utf-8');
        }
    });
}

// Static HTML pages (no template substitution needed)
const staticPages = ['/privacy.html', '/terms.html', '/faq.html', '/support.html'];

// Create the HTTP server
http.createServer((request, response) => {
    // Strip query strings
    const url = request.url.split('?')[0];

    if (url === '/' || url === '/index.html') {
        serveHTML(request, response);
    } else if (staticPages.includes(url)) {
        serveFile(path.join(__dirname, url), 'text/html', response);
    } else if (url.match('.css$')) {
        serveFile(path.join(__dirname, url), 'text/css', response);
    } else if (url.match('.js$')) {
        serveFile(path.join(__dirname, url), 'application/javascript', response);
    } else if (url.match('.html$')) {
        serveFile(path.join(__dirname, url), 'text/html', response);
    } else {
        response.writeHead(404);
        response.end('Page Not Found');
    }
}).listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

// Function to serve HTML with Google Maps API key replacement
function serveHTML(request, response) {
    fs.readFile(path.join(__dirname, 'index.html'), 'utf8', (err, data) => {
        if (err) {
            response.writeHead(500, { 'Content-Type': 'text/plain' });
            response.end('Error loading HTML file.');
            return;
        }

        const modifiedData = data.replace('{{GOOGLE_MAPS_API_KEY}}', process.env.GOOGLE_MAPS_API_KEY);
        response.writeHead(200, { 'Content-Type': 'text/html' });
        response.end(modifiedData);
    });
}
