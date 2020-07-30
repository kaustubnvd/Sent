const button = document.querySelector('a');

button.addEventListener('click', (e) => {
  document.querySelector('form').submit();
  console.log('click');
});
