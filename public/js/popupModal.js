document.getElementById('modal-button').addEventListener('click', () => {
  document.querySelector('.bg-modal').style.display = 'flex';
  document.querySelector('.modal-contents').focus();
});

document.querySelector('.close').addEventListener('click', () => {
  document.querySelector('.bg-modal').style.display = 'none';
});

document.querySelector('.modal-contents').addEventListener('blur', () => {
  document.querySelector('.bg-modal').style.display = 'none';
});
