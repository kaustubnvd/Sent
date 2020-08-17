const departureFrom = document.getElementById('departure-from');
const departureTo = document.getElementById('departure-to');

const elements = Array.from(document.querySelectorAll('.form-control input'));
const date = document.getElementById('departure-date');
const button = document.querySelector('.form-control-btn button');

// Sets the minimum date to the current date
date.min = new Date().toISOString().split('T')[0];

// This gets called as callback by the Google Places API
// eslint-disable-next-line no-unused-vars
function autoComplete() {
  const texas = {
    lat: 31.294882,
    lng: -99.850342,
  };
  // eslint-disable-next-line no-undef
  const circle = new google.maps.Circle({
    center: texas,
    radius: 653680,
  });
  const searchInputs = [departureFrom, departureTo];
  searchInputs.forEach((input) => {
    // eslint-disable-next-line no-undef
    const autocomplete = new google.maps.places.Autocomplete(input, {
      bounds: circle.getBounds(),
    });
    autocomplete.setOptions({ strictBounds: true });
  });
}

// Maps the input elements into objects with that the validForm function can use
const inputs = elements.map((element) => ({
  element,
}));

button.addEventListener('click', (e) => {
  e.preventDefault();
  // eslint-disable-next-line no-undef
  if (!validForm(inputs)) {
    return;
  }
  e.target.parentElement.parentElement.submit();
});
