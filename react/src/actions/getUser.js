import { getBaseUrl } from "../utils";

export default async function getUser(userId, token) {
  const baseUrl = getBaseUrl();

  const response = await fetch(`${baseUrl}/me`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ userId }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    console.error(errorData);
    throw new Error(errorData.message || "Failed to fetch user by ID.");
  }

  // The backend now returns a single user object, not an array.
  const user = await response.json();
  return user;
}
