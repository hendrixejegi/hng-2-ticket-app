import { getBaseUrl, getSession } from "../utils";

export default async function deleteTicket(ticketId) {
  const session = getSession();

  if (session === null) {
    return;
  }

  const { token } = session;

  try {
    const baseUrl = getBaseUrl();
    const response = await fetch(`${baseUrl}/tickets/${ticketId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errData = await response.json();
      throw new Error(
        errData.message || `Failed to delete ticket with id: ${ticketId}`,
      );
    }

    return { success: true };
  } catch (error) {
    console.error(error);
  }

  return { success: false };
}
