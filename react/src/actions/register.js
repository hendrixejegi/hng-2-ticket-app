import * as z from "zod";

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
    return { data, isValidated: false, error: z.flattenError(result.error) };
  }

  return data;
}
