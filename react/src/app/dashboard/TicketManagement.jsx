import { useState, useEffect, useRef } from "react";
import useTickets from "../../hooks/useTicket";
import { FaPlus } from "react-icons/fa";
import "./TicketManagement.css";
import {
  CreateTicketModal,
  EditTicketModal,
  DeleteTicketModal,
  TicketCard,
} from "../../components/tickets-management";
import { ToastContainer, toast } from "react-toastify";

const toastOptions = {
  position: "bottom-right",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: false,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "light",
};

export default function TicketManagement() {
  const [ticketsData, refreshTicketsData, isFetching] = useTickets();

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

  const [mobileFilter, setMobileFilter] = useState({
    value: "0",
    filteredTickets: ticketsData,
  });

  // keep mobile filtered list in sync whenever tickets or sorted groups change
  useEffect(() => {
    if (!ticketsData) return;

    setMobileFilter((prev) => {
      let filtered;
      switch (prev.value) {
        case "1":
          filtered = sortedData.open;
          break;
        case "2":
          filtered = sortedData.progress;
          break;
        case "3":
          filtered = sortedData.closed;
          break;
        default:
          filtered = ticketsData;
      }
      return { ...prev, filteredTickets: filtered };
    });
  }, [ticketsData, sortedData.open, sortedData.progress, sortedData.closed]);

  const updateMobileFilter = (event) => {
    const value = event.target.value;

    switch (value) {
      case "0":
        setMobileFilter((prev) => ({
          ...prev,
          filteredTickets: ticketsData,
          value,
        }));
        break;
      case "1":
        setMobileFilter((prev) => ({
          ...prev,
          filteredTickets: sortedData.open,
          value,
        }));
        break;
      case "2":
        setMobileFilter((prev) => ({
          ...prev,
          filteredTickets: sortedData.progress,
          value,
        }));
        break;
      case "3":
        setMobileFilter((prev) => ({
          ...prev,
          filteredTickets: sortedData.closed,
          value,
        }));
        break;
      default:
        setMobileFilter((prev) => ({
          ...prev,
          filteredTickets: ticketsData,
          value,
        }));
        break;
    }
  };

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
      <div className="flex items-center">
        <button
          className="bg-primary text-surface hover:bg-primary/80 flex cursor-pointer items-center gap-2 rounded-lg px-4 py-3"
          onClick={() =>
            setActionState((prev) => ({ ...prev, creating: true }))
          }
        >
          <FaPlus aria-hidden="true" />
          <span>Create Ticket</span>
        </button>
        <select
          name="mobile-filter"
          id="mobile-filter"
          className="ml-auto border-0 outline-0 md:hidden"
          defaultValue={mobileFilter.value}
          onChange={updateMobileFilter}
        >
          <option value="0">All</option>
          <option value="1">Open</option>
          <option value="2">In Progress</option>
          <option value="3">Closed</option>
        </select>
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
        {isArray(mobileFilter.filteredTickets) &&
          mobileFilter.filteredTickets.map((ticket) => (
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
          notify={() => toast("Ticket created", toastOptions)}
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
          notify={() => toast("Changes saved", toastOptions)}
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
          notify={() => toast("Ticket deleted", toastOptions)}
        />
      )}
      <ToastContainer />
    </div>
  );
}

const isArray = (obj) => Array.isArray(obj) && obj.length > 0;
