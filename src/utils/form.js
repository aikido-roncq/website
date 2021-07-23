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
