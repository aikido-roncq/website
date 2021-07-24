/**
 * Handle the plural of the singular word passed as a parameter depending on the count
 * @param {Number} count the count
 * @param {String} singular the singular word
 * @returns {String} the singular or plural word, depending on the count
 */
export const handlePlural = (count, singular) => (count === 1 ? singular : singular + 's');
