const user = document.getElementById('user');
const loginPanel = document.querySelector('nav .login-panel');

user?.addEventListener('click', (e) => {
  e.preventDefault();
  loginPanel.parentElement.classList.toggle('nav-active');
});

const hamburgerIcon = document.querySelector('.hamburger');
const navMenu = document.querySelector('nav');

hamburgerIcon.addEventListener('click', (e) => {
  navMenu.classList.toggle('nav-active');
});
