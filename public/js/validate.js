let validForm = function (inputs) {
  let valid = true;
  inputs.forEach(({ element, validator = () => true }) => {
    if (!element.value.trim() || !validator()) {
      element.parentElement.classList.add('error');
      valid = false;
    } else {
      element.parentElement.classList.remove('error');
    }
  });
  return valid;
};
