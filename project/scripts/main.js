
const menuBtn = document.getElementById('menu-btn');
const navMenu = document.querySelector('#nav-menu ul');

menuBtn.addEventListener('click', () => {
    
    navMenu.classList.toggle('open');
    
   
    if (navMenu.classList.contains('open')) {
        menuBtn.innerHTML = 'X';
    } else {
        menuBtn.innerHTML = '☰';
    }
});


const yearSpan = document.getElementById('currentyear');
if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
}

const lastModified = document.getElementById('lastModified');
if (lastModified) {
    lastModified.textContent = `Last Modification: ${document.lastModified}`;
}

const greetingContainer = document.getElementById('greeting-container');

if (greetingContainer) {
 
    let visits = Number(window.localStorage.getItem('retroHubVisits')) || 0;
    visits++; 
    

    window.localStorage.setItem('retroHubVisits', visits);

    
    if (visits === 1) {
        greetingContainer.innerHTML = `<strong>Welcome, Player 1!</strong> Ready to explore gaming history?`;
    } else {
        greetingContainer.innerHTML = `<strong>Welcome back, Player 1!</strong> You have visited this arcade <span style="color: var(--neon-cyan);">${visits}</span> times.`;
    }
}


const countdownElement = document.getElementById('countdown');

if (countdownElement) {
    
    let tournamentDate = new Date();
    tournamentDate.setDate(tournamentDate.getDate() + 5);

    const updateTimer = () => {
        const now = new Date().getTime();
        const distance = tournamentDate.getTime() - now;

        if (distance < 0) {
            countdownElement.textContent = "Tournament Started!";
            clearInterval(timerInterval);
            return;
        }

    
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        
        countdownElement.textContent = `${days}d ${hours}h ${minutes}m ${seconds}s`;
    };

    updateTimer(); 
    const timerInterval = setInterval(updateTimer, 1000);
}