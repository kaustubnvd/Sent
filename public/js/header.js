const user = document.getElementById('user');
const html = document.querySelector('html');
const loginPanel = document.querySelector('nav .login-panel');

user?.addEventListener('click', (e) => {
  e.preventDefault();
  loginPanel.parentElement.classList.toggle('nav-active');
});

html.addEventListener('click', e => {
  if (
    e.target.id !== 'user' &&
    !e.target.classList.contains('login-panel') &&
    !e.target.classList.contains('panel-item')
  )
    loginPanel.parentElement.classList.remove('nav-active');
});

const hamburgerIcon = document.querySelector('.hamburger');
const navMenu = document.querySelector('nav');

hamburgerIcon.addEventListener('click', (e) => {
  navMenu.classList.toggle('nav-active');
});
