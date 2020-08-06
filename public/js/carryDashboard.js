const downArrow = document.querySelector('.fa-long-arrow-alt-down');
const rightArrow = document.querySelector('.fa-long-arrow-alt-right');

let resize = () => {
  if (window.innerWidth > 800) {
    rightArrow.remove();
  } else {
    rightArrow.classList.remove('.hidden');
    downArrow.classList.add('.hidden');
  }
};

// document.addEventListener('resize', (e) => {
//   if (window.innerWidth > 800) {
//     rightArrow.classList.add('hidden');
//     downArrow.classList.remove('hidden');
//   } else {
//     rightArrow.classList.remove('hidden');
//     downArrow.classList.add('hidden');
//   }
//   console.log(window.innerWidth);
// });

window.onresize = resize;
