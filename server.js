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

// Create the HTTP server
http.createServer((request, response) => {
    if (request.url === '/' || request.url === '/index.html') {
        serveHTML(request, response);
    } else if (request.url.match('.css$')) {
        serveFile(path.join(__dirname, request.url), 'text/css', response);
    } else if (request.url.match('.js$')) {
        serveFile(path.join(__dirname, request.url), 'application/javascript', response);
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
