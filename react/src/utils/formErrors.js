export const checkError = (name, data) => {
  const isProperty = data.fieldErrors && name in data.fieldErrors;
  return !data.success && isProperty;
};

export const showError = (name, data) => data.fieldErrors[name][0];
