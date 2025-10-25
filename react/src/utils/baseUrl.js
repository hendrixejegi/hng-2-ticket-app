export const getBaseUrl = () =>
  import.meta.env.PROD
    ? "https://ticket-mock.onrender.com"
    : "http://localhost:3001";
