const fromAddress = document.getElementById('from-address');
const toAddress = document.getElementById('to-address');

// This gets called as callback by the Google Places API
function autoComplete() {
  // eslint-disable-next-line no-undef
  new google.maps.places.Autocomplete(fromAddress);
  // eslint-disable-next-line no-undef
  new google.maps.places.Autocomplete(toAddress);
}

const hamburgerIcon = document.querySelector('.hamburger');
const navMenu = document.querySelector('nav');

hamburgerIcon.addEventListener('click', (e) => {
  navMenu.classList.toggle('nav-active');
});
