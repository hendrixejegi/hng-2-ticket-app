import * as z from "zod";
import { getBaseUrl } from "../utils";

const PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@()!%*?&])[A-Za-z\d@()!%*?&]{8,}$/;

const registerSchema = z.object({
  first_name: z.string("Field is required"),
  last_name: z.string("Field is required"),
  email: z.email(),
  password: z
    .string("Field is required")
    .min(8, "Password must be at least 8 characters")
    .regex(
      PASSWORD_REGEX,
      "Password must include uppercase, lowercase, number and special character",
    ),
});

export default async function register(prevState, formData) {
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

  try {
    const baseUrl = getBaseUrl();

    const response = await fetch(`${baseUrl}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json();

      if (response.status === 400) {
        // Client error
        serverResult.message = "Registration Failed: " + errorData.message;
        throw new Error(errorData.message);
      } else {
        // Handle any other non-2xx errors (e.g., 500 server error)
        console.error(
          "Registration Failed (Server Error):",
          errorData.message || response.statusText,
        );
        throw new Error(
          "Server error occurred during registration. Please try again.",
        );
      }
    }

    // Success
    serverResult.success = true;
    const successData = await response.json();
    sessionStorage.setItem("ticket-app-token", successData.accessToken);
  } catch (error) {
    console.error("Fetch error:", error);
  }

  return {
    ...prevState,
    ...serverResult,
    data,
  };
}
