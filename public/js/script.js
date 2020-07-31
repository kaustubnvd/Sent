const fromAddress = document.getElementById('from-address');
const toAddress = document.getElementById('to-address');

function autoComplete() {
  new google.maps.places.Autocomplete(fromAddress);
  new google.maps.places.Autocomplete(toAddress);
}
