import { Link } from "react-router";
import { FaXTwitter, FaGithub, FaLinkedinIn } from "react-icons/fa6";
import Logo from "./Logo";

const Footer = () => {
  return (
    <footer className="mt-8">
      <div className="md: mx-auto flex max-w-[1440px] flex-col items-start justify-between gap-4 p-4 md:flex-row md:items-center">
        <div className="flex flex-col gap-2">
          <Logo />
          <div className="font-dm">Take control of every ticket.</div>
        </div>
        <div className="flex items-start gap-8">
          <nav aria-label="Quick links">
            <p className="font-dm text-primary mb-2 font-semibold">
              Quick Links
            </p>
            <ul className="font-dm space-y-2">
              <li>
                <Link
                  to="/dashboard"
                  className="text-primary hover:text-primary/80"
                >
                  Dashboard
                </Link>
              </li>
              <li>
                <Link
                  to="/dashboard/tickets"
                  className="text-primary hover:text-primary/80"
                >
                  Ticket Management
                </Link>
              </li>
              <li>
                <Link
                  to="/login"
                  className="text-primary hover:text-primary/80"
                >
                  Login/Sign Up
                </Link>
              </li>
            </ul>
          </nav>
          <nav aria-label="Social">
            <p className="font-dm text-primary mb-2 font-semibold">Social</p>
            <ul className="font-dm flex items-center gap-2">
              <li>
                <a
                  href="https://www.linkedin.com/in/hendrixabugewaejegi/"
                  className="text-primary hover:text-primary/80"
                  aria-label="LinkedIn link"
                >
                  <FaLinkedinIn aria-hidden="true" className="text-2xl" />
                </a>
              </li>
              <li>
                <a
                  href="https://x.com/hendrixejegi"
                  className="text-primary hover:text-primary/80"
                  aria-label="Twitter/X link"
                >
                  <FaXTwitter aria-hidden="true" className="text-2xl" />
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/hendrixejegi"
                  className="text-primary hover:text-primary/80"
                  aria-label="GitHub link"
                >
                  <FaGithub aria-hidden="true" className="text-2xl" />
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
