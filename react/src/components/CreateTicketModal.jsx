import { useState, useCallback, useActionState } from "react";
import { useFormStatus } from "react-dom";
import createTicket from "../actions/createTicket";
import { cn } from "../utils";
import { FaTimes } from "react-icons/fa";

const CreateTicketModal = ({ closeModal }) => {
  const [state, createTicketAction] = useActionState(createTicket, {
    success: false,
    message: null,
    data: {
      title: "",
      description: "",
      status: "2",
      priority: "0",
    },
  });

  const [title, setTitle] = useState(
    state.data.title.length > 0 ? state.data.title : "",
  );

  const [description, setDescription] = useState(
    state.data.description.length > 0 ? state.data.description : "",
  );

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

  if (state.success) {
    closeModal();
    return;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center bg-gray-200/20 p-4">
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
        <form
          action={createTicketAction}
          className="bg-surface space-y-2 p-4"
          noValidate
        >
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
                defaultValue="2"
              >
                <option value="0">Closed</option>
                <option value="1">In progress</option>
                <option value="2">Open</option>
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
                defaultValue="0"
              >
                <option value="0">Low</option>
                <option value="1">Medium</option>
                <option value="2">High</option>
              </select>
            </div>
          </div>
          {!state.success && (
            <span className="text-error mt-2 inline-block text-xs">
              {state.message}
            </span>
          )}
          <Submit />
        </form>
      </div>
    </div>
  );
};

export default CreateTicketModal;

const Submit = () => {
  const status = useFormStatus();

  return (
    <button
      className={cn(
        "bg-primary text-surface mt-2 ml-auto block rounded-lg px-4 py-3 font-semibold",
        status.pending
          ? "bg-primary/80 cursor-progress"
          : "hover:bg-primary/80 cursor-pointer",
      )}
      disabled={status.pending}
    >
      Add Ticket
    </button>
  );
};
