import { getConsolesData } from './api.js';

const grid = document.querySelector('#catalog-grid');
const modal = document.querySelector('#details-modal');
const closeModalBtn = document.querySelector('#close-modal');
const filterBtns = document.querySelectorAll('.filter-btn');

let consoleList = [];

async function initCatalog() {
    consoleList = await getConsolesData();
    displayConsoles(consoleList);
}

function displayConsoles(data) {
    grid.innerHTML = '';
    data.forEach(item => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <h3>${item.name}</h3>
            <p><strong>Company:</strong> ${item.company}</p>
            <p><strong>Year:</strong> ${item.year}</p>
            <p><strong>Bits:</strong> ${item.bits}</p>
            <button class="btn-primary view-btn" data-id="${item.name}">Details</button>
        `;
        grid.appendChild(card);
    });

    document.querySelectorAll('.view-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const consoleName = e.target.getAttribute('data-id');
            const selectedConsole = consoleList.find(c => c.name === consoleName);
            showModal(selectedConsole);
        });
    });
}

filterBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        const company = e.target.textContent;
        if (company === 'All') {
            displayConsoles(consoleList);
        } else {
            const filtered = consoleList.filter(c => c.company === company);
            displayConsoles(filtered);
        }
    });
});

function showModal(data) {
    document.querySelector('#modal-title').textContent = data.name;
    document.querySelector('#modal-info').innerHTML = `
        <p>Manufacturer: ${data.company}</p>
        <p>Released in ${data.year}</p>
        <p>System Architecture: ${data.bits}</p>
    `;
    modal.showModal();
}

closeModalBtn.addEventListener('click', () => {
    modal.close();
});

initCatalog();