const title = document.getElementById('package-title');
const description = document.getElementById('package-desc');
const button = document.querySelector('.button button');

const inputs = [
  {
    element: title,
  },
  {
    element: description,
  },
];

button.addEventListener('click', (e) => {
  e.preventDefault();
  // eslint-disable-next-line no-undef
  if (!validForm(inputs)) {
    console.log('invalid form');
    return;
  }
  e.target.parentElement.parentElement.submit();
});
