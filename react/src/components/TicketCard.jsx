import { useCallback } from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";

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
        return { color: "bg-gray-500/10 text-gray-500", description: "CLOSED" };
      case 1:
        return {
          color: "bg-pending/10 text-pending",
          description: "IN PROGRESS",
        };
      case 2:
        return { color: "bg-success/10 text-success", description: "OPEN" };

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
            className={`block rounded-full px-2 py-1 text-xs font-medium md:hidden ${statusResult.color}`}
          >
            {statusResult.description}
          </div>
          <div
            className={`size-2 animate-pulse rounded-full text-xs font-medium md:size-auto md:w-fit md:animate-none md:px-2 md:py-1 ${priorityResult.color}`}
          >
            <span className="hidden md:inline">
              {priorityResult.description}
            </span>
          </div>
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

export default TicketCard;
