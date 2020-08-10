const fromAddress = document.getElementById('from-address');
const toAddress = document.getElementById('to-address');
const date = document.getElementById('delivery-date');

date.min = new Date().toISOString().split('T')[0];

//  Callback for the Google Places API
// eslint-disable-next-line no-unused-vars
function autoComplete() {
  const searchInputs = [fromAddress, toAddress];
  searchInputs.forEach((input) => {
    // eslint-disable-next-line no-undef
    new google.maps.places.Autocomplete(input);
  });
}

