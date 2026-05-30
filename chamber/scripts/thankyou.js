const currentUrl = window.location.href;
const urlString = currentUrl.split('?')[1];

if (urlString) {
  const urlParams = new URLSearchParams(urlString);

  const firstName = urlParams.get('firstName') || '';
  const lastName = urlParams.get('lastName') || '';
  const email = urlParams.get('email') || '';
  const phone = urlParams.get('phone') || '';
  const org = urlParams.get('organization') || '';
  const timestamp = urlParams.get('timestamp') || '';

  const showFirstName = document.getElementById('show-first-name');
  const showName = document.getElementById('show-name');
  const showEmail = document.getElementById('show-email');
  const showPhone = document.getElementById('show-phone');
  const showOrg = document.getElementById('show-org');
  const showDate = document.getElementById('show-date');

  if (showFirstName) showFirstName.textContent = firstName;
  if (showName) showName.textContent = `${firstName} ${lastName}`;
  if (showEmail) showEmail.textContent = email;
  if (showPhone) showPhone.textContent = phone;
  if (showOrg) showOrg.textContent = org;

  if (showDate && timestamp) {
    const date = new Date(parseInt(timestamp));
    showDate.textContent = date.toLocaleString('en-US', {
      dateStyle: 'full',
      timeStyle: 'short'
    });
  } else if (showDate) {
    showDate.textContent = 'Date not recorded';
  }
}