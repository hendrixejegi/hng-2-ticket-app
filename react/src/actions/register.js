import * as z from "zod";
import { getBaseUrl } from "../utils";

const PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@()!%*?&])[A-Za-z\d@()!%*?&]{8,}$/;

const registerSchema = z.object({
  first_name: z.string().min(2, "Field is required"),
  last_name: z.string().min(2, "Field is required"),
  email: z.email("Enter a valid email"),
  password: z
    .string("Field is required")
    .min(8, "Password must be at least 8 characters")
    .regex(
      PASSWORD_REGEX,
      "Password must include uppercase, lowercase, number and special character",
    ),
});

async function tryParseJson(response) {
  try {
    return await response.json();
  } catch {
    return null;
  }
}

export default async function register(
  prevState,
  formData,
  { timeout = 8000 } = {},
) {
  const data = Object.fromEntries(formData);
  const result = registerSchema.safeParse(data);

  if (result.error) {
    return {
      data,
      success: false,
      fieldErrors: z.flattenError(result.error).fieldErrors,
      message: "Registration failed: Invalid credentials",
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

    const response = await fetch(`${baseUrl}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
      signal: controller.signal,
    });

    clearTimeout(timer);

    const parsed = await tryParseJson(response);

    if (!response.ok) {
      if (response.status === 400) {
        serverResult.message =
          parsed?.message || "Registration failed: Invalid input.";
      } else if (response.status >= 500) {
        serverResult.message =
          "Server error occurred during registration. Please try again later.";
      } else {
        serverResult.message =
          parsed?.message || response.statusText || "Registration failed.";
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

    try {
      localStorage.setItem(
        "ticketapp_session",
        JSON.stringify({
          userId: successData.user?.id,
          token: successData.accessToken,
        }),
      );
    } catch (e) {
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

    if (error.name === "AbortError") {
      serverResult.message =
        "Network timeout: The request took too long. Please check your connection and try again.";
    } else {
      serverResult.message =
        "Network error: Could not reach the server. Please check your internet connection.";
    }

    console.error("Registration fetch error:", error);

    return {
      fieldErrors: null,
      ...serverResult,
      data,
      success: false,
    };
  }
}
