import { useState, useEffect, useCallback } from "react";
import useTickets from "../../hooks/useTicket";
import { FaPlus, FaTimes } from "react-icons/fa";
import "./TicketManagement.css";

export default function TicketManagement() {
  const [ticketsData] = useTickets();
  const [sortedData, setSortedData] = useState({
    open: [],
    progress: [],
    closed: [],
  });
  const [isCreatingTicket, setIsCreatingTicket] = useState(false);

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
  }, [ticketsData]);

  return (
    <div className="ticket-management">
      <h1 className="sr-only">Dashboard ticket management</h1>
      <div>
        <button
          className="bg-primary text-surface hover:bg-primary/80 flex w-[180px] cursor-pointer items-center gap-2 rounded-lg px-4 py-3"
          onClick={() => setIsCreatingTicket(true)}
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
      {isCreatingTicket && (
        <CreateTicketModal closeModal={() => setIsCreatingTicket(false)} />
      )}
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

const isArray = (obj) => Array.isArray(obj) && obj.length > 0;

function CreateTicketModal({ closeModal }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const TITLE_MAX_LENGTH = 50;
  const DESCRIPTION_MAX_LENGTH = 100;

  const handleTitleChange = useCallback((event) => {
    const value = event.target.value;
    if (value.length > TITLE_MAX_LENGTH) return;
    setTitle(value);
  }, []);

  const handleDescriptionChange = useCallback((event) => {
    const value = event.target.value;
    if (value.length > DESCRIPTION_MAX_LENGTH) return;
    setDescription(value);
  }, []);
  return (
    <div className="fixed inset-0 z-50 flex items-center bg-gray-200/20">
      <div className="bg-surface mx-auto w-full max-w-lg overflow-hidden rounded-lg shadow-xl">
        <div className="bg-primary text-surface flex items-center justify-between p-4">
          <h2 className="text-2xl font-bold">Create new ticket</h2>
          <button
            aria-label="Close create ticket modal"
            className="cursor-pointer"
            onClick={closeModal}
          >
            <FaTimes aria-hidden="true" className="text-2xl" />
          </button>
        </div>
        <form action="" className="bg-surface space-y-2 p-4" noValidate>
          <div className="flex flex-col gap-2">
            <label htmlFor="title" className="font-semibold">
              Title*:
            </label>
            <input
              type="text"
              name="title"
              id="title"
              className="border-primary outline-primary rounded-lg border-2 px-3 py-2.5"
              value={title}
              required
              onChange={handleTitleChange}
            />
            <span className="text-xs">{title.length}/50</span>
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="description" className="font-semibold">
              Description:
            </label>
            <textarea
              type="text"
              name="description"
              id="description"
              className="border-primary outline-primary resize-none rounded-lg border-2 px-3 py-2.5"
              value={description}
              onChange={handleDescriptionChange}
            ></textarea>
            <span className="text-xs">{description.length}/100</span>
          </div>
          <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
            <div className="flex flex-col gap-2">
              <label htmlFor="status" className="font-semibold">
                Status*:
              </label>
              <select
                name="status"
                id="status"
                className="border-primary outline-primary resize-none rounded-lg border-2 py-2.5"
                required
              >
                <option value="0">Closed</option>
                <option value="1">In progress</option>
                <option value="2" selected>
                  Open
                </option>
              </select>
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="priority" className="font-semibold">
                Priority:
              </label>
              <select
                name="priority"
                id="priority"
                className="border-primary outline-primary resize-none rounded-lg border-2 py-2.5"
                required
              >
                <option value="0" selected>
                  Low
                </option>
                <option value="1">Medium</option>
                <option value="2" selected></option>
              </select>
            </div>
          </div>
          <button className="bg-primary hover:bg-primary/80 text-surface mt-4 ml-auto block cursor-pointer rounded-lg px-4 py-3 font-semibold">
            Add Ticket
          </button>
        </form>
      </div>
    </div>
  );
}
