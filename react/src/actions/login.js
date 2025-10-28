import * as z from "zod";
import { getBaseUrl } from "../utils";

const loginSchema = z.object({
  email: z.email("Enter a valid email"),
  password: z.string().min(2, "Field is required"),
});

// Helper to parse JSON safely
async function tryParseJson(response) {
  try {
    return await response.json();
  } catch {
    return null;
  }
}

export default async function login(
  prevState,
  formData,
  { timeout = 8000 } = {},
) {
  const data = Object.fromEntries(formData);
  const result = loginSchema.safeParse(data);

  if (result.error) {
    return {
      data,
      success: false,
      fieldErrors: z.flattenError(result.error).fieldErrors || null,
      message: "Cannot submit empty fields",
    };
  }

  const serverResult = {
    success: false,
    message: null,
  };

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeout);

  try {
    const baseUrl = getBaseUrl();

    const response = await fetch(`${baseUrl}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
      signal: controller.signal,
    });

    clearTimeout(timer);

    const parsed = await tryParseJson(response);

    if (!response.ok) {
      // Provide more specific messages where possible
      if (response.status === 400) {
        serverResult.message = "Login failed: Incorrect email or password.";
      } else if (response.status === 401) {
        serverResult.message = `Login failed: ${parsed?.message || "Unauthorized"}`;
      } else if (response.status >= 500) {
        serverResult.message =
          "Server error occurred during login. Please try again later.";
      } else {
        serverResult.message =
          parsed?.message || response.statusText || "Login failed.";
      }

      return {
        fieldErrors: null,
        ...serverResult,
        data,
        success: false,
      };
    }

    // Success
    serverResult.success = true;
    const successData = parsed || {};

    // persist session
    try {
      localStorage.setItem(
        "ticketapp_session",
        JSON.stringify({
          userId: successData.user?.id,
          token: successData.accessToken,
        }),
      );
    } catch (e) {
      // localStorage might fail in some environments; log and continue
      console.warn("Could not persist session to localStorage", e);
    }

    return {
      fieldErrors: null,
      ...serverResult,
      data,
      success: true,
    };
  } catch (error) {
    clearTimeout(timer);

    // Handle Abort errors separately
    if (error.name === "AbortError") {
      serverResult.message =
        "Network timeout: The request took too long. Please check your connection and try again.";
    } else {
      serverResult.message =
        "Network error: Could not reach the server. Please check your internet connection.";
    }

    console.error("Login fetch error:", error);

    return {
      fieldErrors: null,
      ...serverResult,
      data,
      success: false,
    };
  }
}
