const fromAddress = document.getElementById('from-address');
const toAddress = document.getElementById('to-address');

const departureFrom = document.getElementById('departure-from');
const departureTo = document.getElementById('departure-to');


// This gets called as callback by the Google Places API
function autoComplete() {
  const searchInputs = [fromAddress, toAddress, departureFrom, departureTo];
  searchInputs.forEach((input) => {
    // eslint-disable-next-line no-undef
    new google.maps.places.Autocomplete(input);
  });
}

const hamburgerIcon = document.querySelector('.hamburger');
const navMenu = document.querySelector('nav');

hamburgerIcon.addEventListener('click', (e) => {
  navMenu.classList.toggle('nav-active');
});