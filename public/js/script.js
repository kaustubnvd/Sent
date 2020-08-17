const fromAddress = document.getElementById('from-address');
const toAddress = document.getElementById('to-address');
const date = document.getElementById('delivery-date');

date.min = new Date().toISOString().split('T')[0];

//  Callback for the Google Places API
// eslint-disable-next-line no-unused-vars
function autoComplete() {
  const searchInputs = [fromAddress, toAddress];
  searchInputs.forEach((input) => {
    const texas = {
      lat: 31.294882,
      lng: -99.850342,
    };
    // eslint-disable-next-line no-undef
    const circle = new google.maps.Circle({
      center: texas,
      radius: 653680,
    });
    // eslint-disable-next-line no-undef
    const autocomplete = new google.maps.places.Autocomplete(input, {
      bounds: circle.getBounds(),
    });
    autocomplete.setOptions({ strictBounds: true });
  });
}
