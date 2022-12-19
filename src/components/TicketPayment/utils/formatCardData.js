function expirationDate(value) {
  const clearValue = clearNumber(value);

  if (clearValue.length >= 3) {
    return `${clearValue.slice(0, 2)}/${clearValue.slice(2, 4)}`;
  }
  return clearValue;
}

function CVC(value) {
  const clearValue = clearNumber(value);
  let maxLength = 4;

  return clearValue.slice(0, maxLength);
}

function clearNumber(value = '') {
  return value.replace(/\D+/g, '');
}

const formatCard = {
  expirationDate,
  CVC,
};

export default formatCard;
