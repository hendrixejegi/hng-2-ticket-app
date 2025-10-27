import { twMerge } from "tailwind-merge";
import clsx from "clsx";

export const cn = (...classNames) => twMerge(clsx(classNames));

/**
 * Returns base URL for api request
 * @returns {string}
 */
export const getBaseUrl = () =>
  import.meta.env.PROD
    ? "https://ticket-mock.onrender.com"
    : "http://localhost:3001";

/**
 * Checks if a form input has error
 *
 * @param {string} name The name of the input
 * @param {Object} data Field errors object
 * @returns {boolean}
 */
export const checkError = (name, data) => {
  const isProperty = data.fieldErrors && name in data.fieldErrors;
  return !data.success && isProperty;
};

/**
 * Displays form input error message
 *
 * @param {string} name The name of the input
 * @param {Object} data Field errors object
 * @returns {string}
 */
export const showError = (name, data) => data.fieldErrors[name][0];

/**
 * Gets the current session information
 * @returns {Object}
 */
export const getSession = () =>
  JSON.parse(localStorage.getItem("ticketapp_session"));

/**
 *
 * @param {string} str The string which first letter should be capitalized
 * @returns
 */
export const capFirstLetter = (str) => str.slice(0, 1).toUpperCase();
