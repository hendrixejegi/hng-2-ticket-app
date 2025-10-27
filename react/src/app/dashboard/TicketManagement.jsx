import { useState, useEffect, useCallback, useRef } from "react";
import useTickets from "../../hooks/useTicket";
import { FaPlus, FaEdit, FaTrashAlt } from "react-icons/fa";
import "./TicketManagement.css";
import CreateTicketModal from "../../components/CreateTicketModal";
import EditTicketModal from "../../components/EditTicketModal";
import DeleteTicketModal from "../../components/DeleteTicketModal";

export default function TicketManagement() {
  const [ticketsData, refreshTicketsData] = useTickets();
  const [sortedData, setSortedData] = useState({
    open: [],
    progress: [],
    closed: [],
  });
  const [actionState, setActionState] = useState({
    creating: false,
    editing: false,
    deleting: false,
    initialRender: true,
    ticket: null,
  });

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
    setActionState((prev) => ({ ...prev, initialRender: false }));
  }, [ticketsData]);

  // Handle create ticket

  // keep the latest refresh function in a ref so the effect won't re-run
  // when the function identity changes (which can happen if useTickets
  // returns a new function each render).
  const refreshRef = useRef(refreshTicketsData);
  useEffect(() => {
    refreshRef.current = refreshTicketsData;
  }, [refreshTicketsData]);

  const { creating, editing, deleting, initialRender } = actionState;

  useEffect(() => {
    if ((!creating || !editing || !deleting) && !initialRender) {
      // call the latest refresh function from the ref
      refreshRef.current();
    }
  }, [creating, editing, deleting, initialRender]);

  // Handle edit ticket
  const handleEditTicket = (ticketId) => {
    setActionState((prev) => ({
      ...prev,
      editing: true,
      ticket: ticketsData.find((ticket) => ticket.id === ticketId),
    }));
  };

  const handleDeleteTicket = (ticketId) => {
    setActionState((prev) => ({
      ...prev,
      deleting: true,
      ticket: ticketsData.find((ticket) => ticket.id === ticketId),
    }));
  };

  return (
    <div className="ticket-management">
      <h1 className="sr-only">Dashboard ticket management</h1>
      <div>
        <button
          className="bg-primary text-surface hover:bg-primary/80 flex cursor-pointer items-center gap-2 rounded-lg px-4 py-3"
          onClick={() =>
            setActionState((prev) => ({ ...prev, creating: true }))
          }
        >
          <FaPlus aria-hidden="true" />
          <span>Create Ticket</span>
        </button>
      </div>
      {/* Group titles */}
      <div className="hidden grid-cols-3 gap-4 md:grid">
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
              <TicketCard
                key={ticket.id}
                data={ticket}
                editTicket={() => handleEditTicket(ticket.id)}
                deleteTicket={() => handleDeleteTicket(ticket.id)}
              />
            ))}
        </div>
        {/* In progress group */}
        <div
          className="ticket-group space-y-4"
          aria-labelledby="in-progress-group"
        >
          {isArray(sortedData.progress) &&
            sortedData.progress.map((ticket) => (
              <TicketCard
                key={ticket.id}
                data={ticket}
                editTicket={() => handleEditTicket(ticket.id)}
                deleteTicket={() => handleDeleteTicket(ticket.id)}
              />
            ))}
        </div>
        {/* Closed group */}
        <div className="ticket-group space-y-4" aria-labelledby="closed-group">
          {isArray(sortedData.closed) &&
            sortedData.closed.map((ticket) => (
              <TicketCard
                key={ticket.id}
                data={ticket}
                editTicket={() => handleEditTicket(ticket.id)}
                deleteTicket={() => handleDeleteTicket(ticket.id)}
              />
            ))}
        </div>
      </div>
      {/* Ticket view small screen */}
      <div className="mt-4 space-y-4 md:hidden">
        {isArray(ticketsData) &&
          ticketsData.map((ticket) => (
            <TicketCard
              key={ticket.id}
              data={ticket}
              editTicket={() => handleEditTicket(ticket.id)}
              deleteTicket={() => handleDeleteTicket(ticket.id)}
            />
          ))}
      </div>
      {/* Create modal */}
      {actionState.creating && (
        <CreateTicketModal
          closeModal={() =>
            setActionState((prev) => ({ ...prev, creating: false }))
          }
        />
      )}
      {/* Edit modal */}
      {actionState.editing && actionState.ticket && (
        <EditTicketModal
          data={actionState.ticket}
          closeModal={() =>
            setActionState((prev) => ({
              ...prev,
              editing: false,
              ticket: null,
            }))
          }
        />
      )}
      {/* Delete modal */}
      {actionState.deleting && actionState.ticket && (
        <DeleteTicketModal
          data={actionState.ticket}
          closeModal={() =>
            setActionState((prev) => ({
              ...prev,
              deleting: false,
              ticket: null,
            }))
          }
        />
      )}
    </div>
  );
}

function TicketCard({ data, editTicket, deleteTicket }) {
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

  const resolveTicketStatus = useCallback((code) => {
    switch (code) {
      case 0:
        return { color: "bg-gray-500 text-gray-500", description: "CLOSED" };
      case 1:
        return {
          color: "bg-pending text-pending",
          description: "IN PROGRESS",
        };
      case 2:
        return { color: "bg-success text-success", description: "OPEN" };

      default:
        break;
    }
  }, []);

  const priorityResult = resolveTicketPriority(data.priority);
  const statusResult = resolveTicketStatus(data.status);

  return (
    <div className="bg-background rounded-lg p-4">
      <h3 className="mb-2 text-lg font-semibold">{data.title}</h3>
      <p className="text-gray-500">{data.description}</p>
      <div className="my-2 h-px bg-gray-200/60"></div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div
            className={`w-fit rounded-full px-2 py-1 text-xs font-medium uppercase ${priorityResult.color}`}
          >
            {priorityResult.description}
          </div>
          <div
            className={`block size-2 animate-pulse rounded-full md:hidden ${statusResult.color}`}
          ></div>
        </div>
        <div className="flex items-center gap-2">
          <button
            aria-label={`Edit ${data.title} ticket`}
            className="hover:text-primary cursor-pointer text-gray-500"
            onClick={editTicket}
          >
            <FaEdit aria-hidden="true" className="text-lg" />
          </button>
          <button
            aria-label={`Delete ${data.title} ticket`}
            className="hover:text-error cursor-pointer text-gray-500"
            onClick={deleteTicket}
          >
            <FaTrashAlt aria-hidden="true" className="text-lg" />
          </button>
        </div>
      </div>
    </div>
  );
}

const isArray = (obj) => Array.isArray(obj) && obj.length > 0;
