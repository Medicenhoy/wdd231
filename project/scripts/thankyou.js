const currentUrl = window.location.search;
const urlParams = new URLSearchParams(currentUrl);
const resultsContainer = document.querySelector('#results');

if (resultsContainer && currentUrl) {
    resultsContainer.innerHTML = `
        <p><strong>Player First Name:</strong> ${urlParams.get('fname')}</p>
        <p><strong>Player Last Name:</strong> ${urlParams.get('lname')}</p>
        <p><strong>Contact Email:</strong> ${urlParams.get('email')}</p>
        <p><strong>Gamertag:</strong> ${urlParams.get('gamertag')}</p>
        <p><strong>Registered Division:</strong> ${urlParams.get('console')}</p>
        <br>
        <p><em>Check your email for tournament bracket details.</em></p>
    `;
}