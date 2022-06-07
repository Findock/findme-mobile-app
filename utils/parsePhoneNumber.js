export const parsePhoneNumber = (phoneNumber) => {
  let result = '';
  phoneNumber?.split('')
    .forEach((digit, index) => {
      if (index % 3 === 0) {
        result = `${result} ${digit}`;
      } else {
        result += digit;
      }
    });
  return result;
};
