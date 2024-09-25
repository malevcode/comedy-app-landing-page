// openMicFinder.js
export function createOpenMicDiv() {
    const newDiv = document.createElement('div');
    newDiv.classList.add('feature');

    // Create elements
    const heading = document.createElement('h2');
    heading.textContent = 'Open Mic Finder - Explore Opportunities';

    const paragraph = document.createElement('p');
    paragraph.textContent = 'Use the tool below to find and sign up for open mics in your area.';

    const form = document.createElement('form');

    const input = document.createElement('input');
    input.type = 'text';
    input.placeholder = 'Enter Your City';
    input.required = true;

    const searchButton = document.createElement('button');
    searchButton.type = 'submit';
    searchButton.textContent = 'Search';

    // Append input and button to form
    form.appendChild(input);
    form.appendChild(searchButton);

    const goBackButton = document.createElement('button');
    goBackButton.textContent = 'Go Back';
    goBackButton.onclick = () => location.reload();

    // Create the Google Maps div
    const mapDiv = document.createElement('div');
    mapDiv.id = 'map';
    mapDiv.style.width = '100%';
    mapDiv.style.height = '400px';
    mapDiv.style.marginTop = '20px';

    // Append all elements to the new div
    newDiv.appendChild(heading);
    newDiv.appendChild(paragraph);
    newDiv.appendChild(form);
    newDiv.appendChild(mapDiv); // Append the map div here
    newDiv.appendChild(goBackButton);

    // Initialize the Google Map
    initMap(mapDiv);

    return newDiv;
}

// Function to initialize the Google Map
function initMap(mapElement) {
    const mapOptions = {
        zoom: 10,
        center: { lat: 40.7128, lng: -74.0060 } // Default to New York City
    };
    new google.maps.Map(mapElement, mapOptions);
}
