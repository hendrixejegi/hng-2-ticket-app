import { getBaseUrl } from "../utils";

export default async function getTickets(token) {
  const baseUrl = getBaseUrl();

  try {
    const response = await fetch(`${baseUrl}/tickets`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error(errorData);
      throw new Error(errorData.message || "Failed to fetch Tickets.");
    }

    const tickets = await response.json();
    return tickets;
  } catch (error) {
    console.error(error);
  }
}
