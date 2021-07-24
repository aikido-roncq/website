import { handlePlural } from './string';

/**
 * Hydrate the form in parameter from an object with values
 * @param {object} form the form to hydrate
 * @param {object} values the values for the form
 */
export const hydrateForm = (form, data) => {
  Object.entries(data).forEach(([key, value]) => {
    form.setValue(key, value);
  });
};

/**
 * Tells the user how many characters he needs to type to reach the minimum, or how many characters
 * he needs to remove to be under the maximum
 * @param {string} value the value to check
 * @param {Number} minLength the minimum length
 * @param {Number} maxLength the maximum length
 * @returns {string} the message to display
 */
export const charactersCountText = (value, minLength, maxLength) => {
  const trimmed = value.trim();
  const length = trimmed.length;
  if (length == 0) {
    return;
  } else if (length < minLength) {
    const amount = minLength - length;
    return `Encore ${amount} ${handlePlural(amount, 'caractère')}`;
  } else if (length > maxLength) {
    const amount = length - maxLength;
    return `${amount} ${handlePlural(amount, 'caractère')} en trop`;
  } else {
    const amount = maxLength - length;
    return `✅ Il vous reste ${amount} ${handlePlural(amount, 'caractère')}`;
  }
};
