import { useActionState, useEffect } from "react";
import { useFormStatus } from "react-dom";
import { Link, useNavigate } from "react-router";
import AuthLayout from "../../components/AuthLayout";
import login from "../../actions/login";
import { checkError, showError, cn, getSession } from "../../utils";
import { FaHome } from "react-icons/fa";

export default function Login() {
  const [state, loginAction] = useActionState(login, {
    success: undefined,
    message: null,
    fieldErrors: null,
    data: { email: "", password: "" },
  });
  const navigate = useNavigate();

  const session = getSession();

  // Guard: Authenticated user
  useEffect(() => {
    if (session) {
      navigate("/dashboard");
      return;
    }
  }, [session, navigate]);

  if (state.success) {
    navigate("/dashboard");
    return;
  }

  return (
    <AuthLayout>
      <div className="bg-surface max-w-lg rounded-lg p-4 shadow-xl">
        <hgroup>
          <h1 className="font-dm text-primary mb-2 text-center text-3xl font-bold">
            Welcome Back to QueueUp
          </h1>
          <p className="font-dm text-text text-center">
            Log in to manage your tickets, track updates, and stay organized.
          </p>
        </hgroup>
        <form action={loginAction} className="font-dm mt-8" noValidate>
          <fieldset className="space-y-4">
            <legend className="sr-only">User Details</legend>
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
              {checkError("email", state) && (
                <span id="email-error" className="error" aria-live="polite">
                  {showError("email", state)}
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
              {checkError("password", state) && (
                <span id="password-error" className="error" aria-live="polite">
                  {showError("password", state)}
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
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-primary hover:text-primary/80 font-semibold"
          >
            Register
          </Link>
        </p>
        <div className="mt-2 flex justify-center">
          <Link to="/" className="text-text text-xl">
            <FaHome />
          </Link>
        </div>
      </div>
    </AuthLayout>
  );
}

const SubmitButton = () => {
  const status = useFormStatus();
  return (
    <button
      type="submit"
      className={cn(
        "bg-primary text-surface mt-8 w-full cursor-pointer rounded-lg px-4 py-2.5 font-semibold",
        status.pending
          ? "bg-primary/80 hover:cursor-wait"
          : "hover:bg-primary/80",
      )}
      disabled={status.pending}
    >
      Login
    </button>
  );
};
