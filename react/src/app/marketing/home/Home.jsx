import { Link } from "react-router";
import { useNavigate } from "react-router";
import { cn } from "../../../utils/cn";

const featuresList = [
  {
    title: "Real-Time Dashboard",
    description:
      "See the full picture at a glance — total tickets, open requests, and resolved issues all in one sleek dashboard.",
  },
  {
    title: "Effortless Ticket Management",
    description:
      "Create, update, and track tickets with ease. Everything you need to manage your workflow in one place.",
  },
  {
    title: "Quick Status Tracking",
    description:
      "Card-style tickets with clear status tags let you know exactly what needs attention — instantly.",
  },
  {
    title: "Safe & Smart Controls",
    description:
      "Edit or remove tickets confidently with built-in validation and confirmation steps.",
  },
  {
    title: "Smooth Navigation",
    description:
      "Move seamlessly between screens with intuitive navigation links and a secure logout feature.",
  },
];

export default function Home() {
  return (
    <>
      {/* Hero section */}
      <div className="flex h-screen w-full flex-col items-center justify-center p-4 pt-[68px]">
        <h1 className="font-dm mb-8 max-w-3xl text-center text-4xl font-bold">
          Take Control of Every Ticket.{" "}
          <span className="text-primary">Track</span>,{" "}
          <span className="text-primary">Manage</span>, and{" "}
          <span className="text-primary">Resolve</span> in One Smart Dashboard.
        </h1>
        <div className="flex flex-col items-center gap-4 md:flex-row">
          <CTAButton
            to={"/login"}
            className="text-primary hover:text-primary/80"
          >
            Login
          </CTAButton>
          <CTAButton
            to={"/register"}
            className="bg-primary text-surface hover:bg-primary/80"
          >
            Get Started
          </CTAButton>
        </div>
      </div>
      {/* Features section */}
      <section className="flex min-h-screen w-full flex-col items-center justify-center p-4 pt-[68px]">
        <div>
          <h2 className="font-dm text-primary mb-8 text-center text-3xl font-bold">
            Stay on Top of Every Ticket
          </h2>
          <div className="flex flex-wrap items-stretch justify-center gap-4">
            {featuresList.map((feature, idx) => (
              <FeatureCard key={idx} data={feature} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

const CTAButton = ({ children, to, className }) => {
  const navigate = useNavigate();

  return (
    <button
      className={cn(
        "font-dm border-primary hover:border-primary/80 w-[180px] cursor-pointer rounded-lg border-2 py-2.5 font-semibold",
        className,
      )}
      onClick={() => navigate(to)}
    >
      {children}
    </button>
  );
};

const FeatureCard = ({ data }) => (
  <div className="bg-surface font-dm max-w-xs rounded-lg p-4 shadow-xl">
    <h3 className="text-primary mb-2 text-center text-lg font-bold">
      {data.title}
    </h3>
    <p className="text-center">{data.description}</p>
  </div>
);
