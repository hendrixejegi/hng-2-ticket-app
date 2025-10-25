import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { Link, useNavigate } from "react-router";
import AuthLayout from "../../components/AuthLayout";
import "./Authentication.css";
import register from "../../actions/register";

export default function Register() {
  const [state, registerAction] = useActionState(register, {
    success: undefined,
    message: null,
    fieldErrors: null,
    data: { first_name: "", last_name: "", email: "", password: "" },
  });

  const navigate = useNavigate();

  if (state.success) {
    navigate("/dashboard");
  }

  const checkError = (name) => {
    const isProperty = state.fieldErrors && name in state.fieldErrors;
    return !state.success && isProperty;
  };

  const showError = (name) => state.fieldErrors[name][0];

  return (
    <AuthLayout>
      <div className="bg-surface max-w-lg rounded-lg p-4 shadow-xl">
        <hgroup>
          <h1 className="font-dm text-primary mb-2 text-center text-3xl font-bold">
            Create Your QueueUp Account
          </h1>
          <p className="font-dm text-text text-center">
            Sign up to manage your tickets, track progress, and stay in control
            — it only takes a minute.
          </p>
        </hgroup>
        <form action={registerAction} className="font-dm mt-8" noValidate>
          <fieldset className="space-y-4">
            <legend className="sr-only">User Details</legend>
            <div className="flex flex-col gap-4 md:flex-row">
              <div className="input-group">
                <label htmlFor="first_name">First Name*:</label>
                <input
                  type="text"
                  id="first_name"
                  name="first_name"
                  placeholder="John"
                  aria-describedby="first_name_error"
                  required
                  defaultValue={state.data.first_name}
                />
                {checkError("first_name") && (
                  <span
                    id="first_name_error"
                    className="error"
                    aria-live="polite"
                  >
                    {showError("first_name")}
                  </span>
                )}
              </div>
              <div className="input-group">
                <label htmlFor="last_name">Last Name*:</label>
                <input
                  type="text"
                  id="last_name"
                  name="last_name"
                  placeholder="Doe"
                  aria-describedby="last_name_error"
                  required
                  defaultValue={state.data.last_name}
                />
                {checkError("last_name") && (
                  <span
                    id="last_name_error"
                    className="error"
                    aria-live="polite"
                  >
                    {showError("last_name")}
                  </span>
                )}
              </div>
            </div>
            <div className="input-group">
              <label htmlFor="email">Email*:</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="johndoe@example.com"
                aria-describedby="email-error"
                required
                defaultValue={state.data.email}
              />
              {checkError("email") && (
                <span id="email-error" className="error" aria-live="polite">
                  {showError("email")}
                </span>
              )}
            </div>
            <div className="input-group">
              <label htmlFor="password">Password*:</label>
              <input
                type="password"
                id="password"
                name="password"
                aria-describedby="password-error"
                required
                defaultValue={state.data.password}
              />
              {checkError("password") && (
                <span id="password-error" className="error" aria-live="polite">
                  {showError("password")}
                </span>
              )}
            </div>
          </fieldset>
          <SubmitButton />
          {!state.success && (
            <span className="error mt-2 inline-block" aria-live="polite">
              {state.message}
            </span>
          )}
        </form>
        <p className="font-dm text-text mt-4 text-center">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-primary hover:text-primary/80 font-semibold"
          >
            Login
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
}

const SubmitButton = () => {
  const status = useFormStatus();
  return (
    <button
      type="submit"
      className="bg-primary text-surface hover:bg-primary/80 mt-8 w-full cursor-pointer rounded-lg px-4 py-2.5 font-semibold"
      disabled={status.pending}
    >
      Register
    </button>
  );
};
