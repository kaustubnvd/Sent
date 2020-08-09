const title = document.getElementById('package-title');
const description = document.getElementById('package-desc');
// const phoneNum = document.getElementById('package-number');
// const email = document.getElementById('package-email');
const button = document.querySelector('.button button');

const inputs = [
  {
    element: title,
  },
  {
    element: description,
  },
  // {
  //   element: email,
  //   validator: (email) => {
  //     return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value);
  //   },
  // },
  // {
  //   element: phoneNum,
  //   validator: (phoneNum) => {
  //     return /^\D?(\d{3})\D?\D?(\d{3})\D?(\d{4})$/.test(phoneNum.value);
  //   },
  // },
];

button.addEventListener('click', (e) => {
  e.preventDefault();
  // eslint-disable-next-line no-undef
  if (!validForm(inputs)) {
    return;
  }
  e.target.parentElement.parentElement.submit();
});
