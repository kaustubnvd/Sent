const bgModal = document.querySelector('.bg-modal');

document.querySelector('.close')?.addEventListener('click', () => {
  bgModal.style.display = 'none';
});

document.querySelector('.modal-contents')?.addEventListener('blur', () => {
  bgModal.style.display = 'none';
});

document.querySelector('body')?.addEventListener('click', (e) => {
  if (
    document.querySelector('.modal-contents') &&
    e.target.firstElementChild === document.querySelector('.modal-contents')
  ) {
    bgModal.style.display = 'none';
  }
});
