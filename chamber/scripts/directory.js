const membersContainer = document.getElementById('members-container');
const gridBtn = document.getElementById('grid-btn');
const listBtn = document.getElementById('list-btn');
const menuToggle = document.getElementById('menu-toggle');
const mainNav = document.getElementById('main-nav');

document.getElementById('footer-year').textContent = `© ${new Date().getFullYear()} Edmonton Chamber of Commerce`;
document.getElementById('last-modified').textContent = document.lastModified;

menuToggle.addEventListener('click', () => {
  const isOpen = mainNav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', isOpen);
});

window.addEventListener('resize', () => {
  if (window.innerWidth >= 640) {
    mainNav.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', false);
  }
});

function membershipLabel(level) {
  if (level === 3) return 'Gold';
  if (level === 2) return 'Silver';
  return 'Member';
}

function buildCard(member) {
  const card = document.createElement('article');
  card.className = 'member-card';

  card.innerHTML = `
    <img src="images/${member.image}" alt="${member.name} logo" loading="lazy" width="120" height="120" />
    <h2>${member.name}</h2>
    <p class="member-address">${member.address}</p>
    <p class="member-phone">${member.phone}</p>
    <a href="${member.url}" target="_blank" rel="noopener noreferrer">${member.url}</a>
    <span class="membership-badge level-${member.membershipLevel}">${membershipLabel(member.membershipLevel)}</span>
  `;

  return card;
}

function buildRow(member) {
  const row = document.createElement('article');
  row.className = 'member-row';

  row.innerHTML = `
    <img src="images/${member.image}" alt="${member.name} logo" loading="lazy" width="50" height="50" />
    <div class="row-info">
      <h2>${member.name}</h2>
      <p>${member.address} &mdash; ${member.phone}</p>
    </div>
    <a href="${member.url}" target="_blank" rel="noopener noreferrer">${member.url}</a>
    <span class="membership-badge level-${member.membershipLevel}">${membershipLabel(member.membershipLevel)}</span>
  `;

  return row;
}

function renderMembers(members) {
  const isGrid = membersContainer.classList.contains('members-grid');
  membersContainer.innerHTML = '';

  members.forEach(member => {
    const el = isGrid ? buildCard(member) : buildRow(member);
    membersContainer.appendChild(el);
  });
}

async function loadMembers() {
  try {
    const response = await fetch('data/members.json');
    if (!response.ok) throw new Error(`Could not load members (${response.status})`);

    const members = await response.json();
    renderMembers(members);

    gridBtn.addEventListener('click', () => {
      membersContainer.className = 'members-grid';
      gridBtn.classList.add('active');
      listBtn.classList.remove('active');
      renderMembers(members);
    });

    listBtn.addEventListener('click', () => {
      membersContainer.className = 'members-list';
      listBtn.classList.add('active');
      gridBtn.classList.remove('active');
      renderMembers(members);
    });

  } catch (err) {
    membersContainer.innerHTML = `<p class="error-msg">Sorry, we couldn't load the member directory right now. Please try again later.</p>`;
    console.error(err);
  }
}

loadMembers();