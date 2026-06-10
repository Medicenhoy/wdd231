
import { places } from '../data/places.mjs';


const container = document.getElementById('places-container');

places.forEach(place => {
    const card = document.createElement('article');
    card.classList.add('place-card');
    
    card.innerHTML = `
        <h2 class="place-title">${place.name}</h2>
        <figure class="place-fig">
            <img src="${place.photo}" alt="${place.name}" loading="lazy" width="300" height="200">
        </figure>
        <address class="place-address">${place.address}</address>
        <p class="place-desc">${place.description}</p>
        <button class="place-btn">Learn More</button>
    `;
    
    container.appendChild(card);
});


const visitMessage = document.getElementById('visit-message');
const msToDays = 84600000; 
const today = Date.now();
const lastVisit = localStorage.getItem('lastVisitDate');

if (!lastVisit) {
    
    visitMessage.textContent = "Welcome! Let us know if you have any questions.";
} else {
    
    const timeDifference = today - parseInt(lastVisit);
    const daysDifference = timeDifference / msToDays;

    if (daysDifference < 1) {
        visitMessage.textContent = "Back so soon! Awesome!";
    } else {
        const roundedDays = Math.floor(daysDifference);
        const dayWord = roundedDays === 1 ? "day" : "days";
        visitMessage.textContent = `You last visited ${roundedDays} ${dayWord} ago.`;
    }
}

localStorage.setItem('lastVisitDate', today.toString());