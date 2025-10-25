import { Link } from "react-router";
import AuthLayout from "../../components/AuthLayout";
import "./Authentication.css";

export default function Register() {
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
        <form action="" className="font-dm mt-8" noValidate>
          <fieldset className="space-y-4">
            <legend className="sr-only">User Details</legend>
            <div className="flex flex-col items-center gap-4 md:flex-row">
              <div className="input-group">
                <label htmlFor="first-name">First Name*:</label>
                <input
                  type="text"
                  id="first-name"
                  name="first-name"
                  placeholder="John"
                  aria-describedby="first-name-error"
                  required
                />
                <span
                  id="first-name-error"
                  className="error"
                  aria-live="polite"
                ></span>
              </div>
              <div className="input-group">
                <label htmlFor="last-name">Last Name*:</label>
                <input
                  type="text"
                  id="last-name"
                  name="last-name"
                  placeholder="Doe"
                  aria-describedby="last-name-error"
                  required
                />
                <span
                  id="last-name-error"
                  className="error"
                  aria-live="polite"
                ></span>
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
              />
              <span
                id="email-error"
                className="error"
                aria-live="polite"
              ></span>
            </div>
            <div className="input-group">
              <label htmlFor="password">Password*:</label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="johndoe@example.com"
                aria-describedby="password-error"
                required
              />
              <span
                id="password-error"
                className="error"
                aria-live="polite"
              ></span>
            </div>
          </fieldset>
          <button
            type="submit"
            className="bg-primary text-surface hover:bg-primary/80 mt-8 w-full cursor-pointer rounded-lg px-4 py-2.5 font-semibold"
          >
            Register
          </button>
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
