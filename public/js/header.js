const hamburgerIcon = document.querySelector('.hamburger');
const navMenu = document.querySelector('nav');

hamburgerIcon.addEventListener('click', (e) => {
  navMenu.classList.toggle('nav-active');
});
