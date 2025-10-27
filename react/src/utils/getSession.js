export const getSession = () =>
  JSON.parse(sessionStorage.getItem("ticket-app-session"));
