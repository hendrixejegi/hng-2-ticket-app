import * as z from "zod";
import { getBaseUrl } from "../utils";

const loginSchema = z.object({
  email: z.email(),
  password: z.string("Field is required").min(2, "Field is required"),
});

export default async function login(prevState, formData) {
  const data = Object.fromEntries(formData);
  const result = loginSchema.safeParse(data);

  if (result.error) {
    return {
      data,
      success: false,
      fieldErrors: z.flattenError(result.error).fieldErrors,
      message: "Cannot submit empty fields",
    };
  }

  const serverResult = {
    success: false,
    message: null,
  };

  try {
    const baseUrl = getBaseUrl();

    const response = await fetch(`${baseUrl}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json();

      if (response.status === 400) {
        const errMessage = "Login Failed: Incorrect email or password";
        serverResult.message = errMessage;
        throw new Error(errMessage);
      } else if (response.status === 401) {
        serverResult.message = "Login Failed: " + errorData.message;
        throw new Error(errorData.message);
      } else {
        console.error(
          "Login Failed (Server Error):",
          errorData.message || response.statusText,
        );
        throw new Error("Server error occurred during login. Please try again");
      }
    }

    // Success
    serverResult.success = true;
    const successData = await response.json();
    sessionStorage.setItem("ticket-app-token", successData.accessToken);
  } catch (error) {
    console.error("Fetch error", error);
  }

  return {
    fieldErrors: null,
    ...serverResult,
    data,
  };
}
