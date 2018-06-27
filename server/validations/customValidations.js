export default {
  isString(value) {
    const result = typeof value === 'string';
    return isNaN(value) && result;
  },
  isEqualString(value) {
    const result = typeof value === 'string';
    return result;
  },
};
