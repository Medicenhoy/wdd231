const apiKey = "f16abc889dd9618ff1d3dcff664d73df"; 
const lat = "53.5461";
const lon = "-113.4938";

const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

const weatherCurrentContainer = document.getElementById('weather-current');
const weatherForecastContainer = document.getElementById('weather-forecast');

function capitalizeDescription(desc) {
  return desc.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}

async function fetchCurrentWeather() {
  if (!weatherCurrentContainer) return;
  try {
    const response = await fetch(currentWeatherUrl);
    if (!response.ok) throw new Error(`Weather error: ${response.status}`);
    
    const data = await response.json();
    displayCurrentWeather(data);
  } catch (error) {
    console.error("Error fetching current weather:", error);
    weatherCurrentContainer.innerHTML = `<p class="error-msg">Unable to load current weather.</p>`;
  }
}

function displayCurrentWeather(data) {
  if (!weatherCurrentContainer) return;
  const temp = Math.round(data.main.temp);
  const desc = capitalizeDescription(data.weather[0].description);
  const iconCode = data.weather[0].icon;
  const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

  weatherCurrentContainer.innerHTML = `
    <div class="current-weather-info">
      <img src="${iconUrl}" alt="${desc}" width="100" height="100">
      <div>
        <p class="current-temp">${temp}&deg;C</p>
        <p class="current-desc">${desc}</p>
      </div>
    </div>
  `;
}

async function fetchWeatherForecast() {
  if (!weatherForecastContainer) return;
  try {
    const response = await fetch(forecastUrl);
    if (!response.ok) throw new Error(`Forecast error: ${response.status}`);
    
    const data = await response.json();
    displayForecast(data);
  } catch (error) {
    console.error("Error fetching forecast:", error);
    weatherForecastContainer.innerHTML = `<p class="error-msg">Unable to load forecast.</p>`;
  }
}

function displayForecast(data) {
  if (!weatherForecastContainer) return;
  weatherForecastContainer.innerHTML = '';
  
  const dailyForecasts = data.list.filter(item => item.dt_txt.includes("12:00:00"));

  const nextThreeDays = dailyForecasts.slice(0, 3);

  nextThreeDays.forEach(item => {
    const dateObj = new Date(item.dt * 1000);
    const dayName = dateObj.toLocaleDateString('en-US', { weekday: 'long' });
    const temp = Math.round(item.main.temp);
    const desc = capitalizeDescription(item.weather[0].description);
    const iconCode = item.weather[0].icon;
    const iconUrl = `https://openweathermap.org/img/wn/${iconCode}.png`;

    const forecastItem = document.createElement('div');
    forecastItem.className = 'forecast-item';
    forecastItem.innerHTML = `
      <h4>${dayName}</h4>
      <img src="${iconUrl}" alt="${desc}" width="50" height="50">
      <p class="forecast-temp">${temp}&deg;C</p>
      <p class="forecast-desc">${desc}</p>
    `;
    
    weatherForecastContainer.innerHTML += forecastItem.outerHTML;
  });
}

const footerYear = document.getElementById('footer-year');
if (footerYear) {
  footerYear.textContent = `© ${new Date().getFullYear()} Edmonton Chamber of Commerce`;
}

const lastMod = document.getElementById('last-modified');
if (lastMod) {
  lastMod.textContent = document.lastModified;
}

fetchCurrentWeather();
fetchWeatherForecast();

const spotlightsGrid = document.getElementById('spotlights-grid');

function membershipLabel(level) {
  if (level === 3) return 'Gold';
  if (level === 2) return 'Silver';
  return 'Member';
}

function displaySpotlights(members) {
  if (!spotlightsGrid) return;
  const eligibleMembers = members.filter(m => m.membershipLevel === 3 || m.membershipLevel === 2);
  const shuffled = eligibleMembers.sort(() => 0.5 - Math.random());
  const selectedMembers = shuffled.slice(0, 3);

  spotlightsGrid.innerHTML = '';

  selectedMembers.forEach(member => {
    const card = document.createElement('div');
    card.className = `spotlight-card level-${member.membershipLevel}`;

    card.innerHTML = `
      <div class="spotlight-header">
        <img src="images/${member.image}" alt="${member.name}" loading="lazy" width="80" height="80">
        <h3>${member.name}</h3>
        <span class="membership-badge level-${member.membershipLevel}">${membershipLabel(member.membershipLevel)}</span>
      </div>
      <div class="spotlight-body">
        <p class="spotlight-phone">📞 ${member.phone}</p>
        <p class="spotlight-address">📍 ${member.address}</p>
        <a href="${member.url}" target="_blank" rel="noopener noreferrer" class="spotlight-web">Visit Website</a>
      </div>
    `;
    spotlightsGrid.appendChild(card);
  });
}

async function loadSpotlights() {
  if (!spotlightsGrid) return;
  try {
    const response = await fetch('data/members.json');
    if (!response.ok) throw new Error(`Could not load members JSON: ${response.status}`);
    
    const members = await response.json();
    displaySpotlights(members);
  } catch (error) {
    console.error("Error loading spotlights:", error);
    spotlightsGrid.innerHTML = `<p class="error-msg">Unable to load featured spotlights at this time.</p>`;
  }
}

loadSpotlights();