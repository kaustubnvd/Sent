const elements = Array.from(document.querySelectorAll('.form-control input'));
const date = document.getElementById('departure-date');
const button = document.querySelector('.form-control-btn button');

// Sets the minimum date to the current date
date.min = new Date().toISOString().split('T')[0];

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
