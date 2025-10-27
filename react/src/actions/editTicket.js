import { getBaseUrl, getSession } from "../utils";
import * as z from "zod";

const ticketSchema = z.object({
  title: z.string().min(2, "Field is required"),
  description: z.string().optional(),
  status: z.enum(["0", "1", "2"]),
  priority: z.enum(["0", "1", "2"]),
});

export default async function editTicket(prevState, formData) {
  const data = Object.fromEntries(formData);
  const result = ticketSchema.safeParse(data);

  if (!result.success) {
    return {
      success: result.success,
      message: "Invalid Ticket data",
      data,
    };
  }

  const serverResult = { success: false, message: null, data };
  try {
    const baseUrl = getBaseUrl();
    const session = getSession();

    // Guard: unauthorized request
    if (session === null) {
      const errMessage = "Unauthorized request from unknown";
      serverResult.message = errMessage;
      throw new Error(errMessage);
    }

    const response = await fetch(`${baseUrl}/tickets/${data.id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${session.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...data,
        status: Number(data.status),
        priority: Number(data.priority),
        id: Number(data.id),
      }),
    });

    // Handle failed fetch
    if (!response.ok) {
      const errData = await response.json();
      const errMessage = errData.message || "Failed to Edit ticket";
      serverResult.message = errMessage;
      throw new Error(errMessage);
    }

    serverResult.success = true;
  } catch (error) {
    console.error(error);
  }

  return serverResult;
}
