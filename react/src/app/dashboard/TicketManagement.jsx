import { FaPlus } from "react-icons/fa";
import "./TicketManagement.css";

export default function TicketManagement() {
  return (
    <div className="ticket-management">
      <h1 className="sr-only">Dashboard ticket management</h1>
      <div>
        <button className="bg-primary text-surface hover:bg-primary/80 flex w-[180px] cursor-pointer items-center gap-2 rounded-lg px-4 py-3">
          <FaPlus aria-hidden="true" />
          <span>Create Ticket</span>
        </button>
      </div>
      <div className="grid grid-cols-3 gap-4">
        <h2
          className="bg-background text-success mr-2 rounded-lg px-4 py-2.5 font-semibold"
          aria-label="Opened tickets"
          id="open-group"
        >
          Open
        </h2>
        <h2
          className="bg-background text-pending mr-2 rounded-lg px-4 py-2.5 font-semibold"
          aria-label="Tickets being resolved"
          id="in-progress-group"
        >
          In Progress
        </h2>
        <h2
          className="bg-background mr-2 rounded-lg px-4 py-2.5 font-semibold text-gray-500"
          aria-label="Closed Tickets"
          id="closed-group"
        >
          Closed
        </h2>
      </div>
      <div className="ticket-management_groups">
        {/* Open group */}
        <div
          className="ticket-group space-y-4"
          aria-labelledby="open-group"
        ></div>
        {/* In progress group */}
        <div
          className="ticket-group space-y-4"
          aria-labelledby="in-progress-group"
        ></div>
        {/* Closed group */}
        <div
          className="ticket-group space-y-4"
          aria-labelledby="closed-group"
        ></div>
      </div>
    </div>
  );
}

function TicketCard({ data }) {
  const result = resolveTicketPriority(data.priority);
  return (
    <div className="bg-background rounded-lg p-4">
      <h3 className="mb-2 text-lg font-semibold">{data.title}</h3>
      <p className="text-gray-500">{data.description}</p>
      <div className="my-2 h-px bg-gray-200/60"></div>
      <div
        className={`w-fit rounded-full px-2 py-1 text-xs font-medium uppercase ${result.color}`}
      >
        {result.description}
      </div>
    </div>
  );
}

const resolveTicketPriority = (code) => {
  switch (code) {
    case 0:
      return { color: "bg-gray-500/10 text-gray-500", description: "LOW" };
    case 1:
      return { color: "bg-pending/10 text-pending", description: "MEDIUM" };
    case 2:
      return { color: "bg-error/10 text-error", description: "HIGH" };

    default:
      break;
  }
};
