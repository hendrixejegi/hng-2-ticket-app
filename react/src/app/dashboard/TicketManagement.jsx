import { useState, useEffect, useCallback } from "react";
import useTickets from "../../hooks/useTicket";
import { FaPlus } from "react-icons/fa";
import "./TicketManagement.css";
import CreateTicketModal from "../../components/CreateTicketModal";

export default function TicketManagement() {
  const [ticketsData, refreshTicketsData] = useTickets();
  const [sortedData, setSortedData] = useState({
    open: [],
    progress: [],
    closed: [],
  });
  const [isCreatingTicket, setIsCreatingTicket] = useState({
    creating: false,
    initialRender: true,
  });

  useEffect(() => {
    if (!isCreatingTicket.creating && !isCreatingTicket.initialRender) {
      refreshTicketsData();
    }
  }, [isCreatingTicket, refreshTicketsData]);

  useEffect(() => {
    if (ticketsData === null) return;

    const openTickets = [];
    const progressTickets = [];
    const closedTickets = [];

    for (let ticket of ticketsData) {
      const { status } = ticket;

      switch (status) {
        case 0:
          closedTickets.push(ticket);
          break;
        case 1:
          progressTickets.push(ticket);
          break;
        case 2:
          openTickets.push(ticket);
          break;

        default:
          break;
      }
    }

    setSortedData({
      open: openTickets,
      progress: progressTickets,
      closed: closedTickets,
    });
    setIsCreatingTicket((prev) => ({ ...prev, initialRender: false }));
  }, [ticketsData]);

  return (
    <div className="ticket-management">
      <h1 className="sr-only">Dashboard ticket management</h1>
      <div>
        <button
          className="bg-primary text-surface hover:bg-primary/80 flex w-[180px] cursor-pointer items-center gap-2 rounded-lg px-4 py-3"
          onClick={() =>
            setIsCreatingTicket((prev) => ({ ...prev, creating: true }))
          }
        >
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
        <div className="ticket-group space-y-4" aria-labelledby="open-group">
          {isArray(sortedData.open) &&
            sortedData.open.map((ticket) => (
              <TicketCard key={ticket.id} data={ticket} />
            ))}
        </div>
        {/* In progress group */}
        <div
          className="ticket-group space-y-4"
          aria-labelledby="in-progress-group"
        >
          {isArray(sortedData.progress) &&
            sortedData.progress.map((ticket) => (
              <TicketCard key={ticket.id} data={ticket} />
            ))}
        </div>
        {/* Closed group */}
        <div className="ticket-group space-y-4" aria-labelledby="closed-group">
          {isArray(sortedData.closed) &&
            sortedData.closed.map((ticket) => (
              <TicketCard key={ticket.id} data={ticket} />
            ))}
        </div>
      </div>
      {isCreatingTicket.creating && (
        <CreateTicketModal
          closeModal={() =>
            setIsCreatingTicket((prev) => ({ ...prev, creating: false }))
          }
          refresh={refreshTicketsData}
        />
      )}
    </div>
  );
}

function TicketCard({ data }) {
  const resolveTicketPriority = useCallback((code) => {
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
  }, []);

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

const isArray = (obj) => Array.isArray(obj) && obj.length > 0;
