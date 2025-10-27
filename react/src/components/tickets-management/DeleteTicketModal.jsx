import { useState } from "react";
import deleteTicket from "../../actions/deleteTicket";

export const DeleteTicketModal = ({ data, closeModal, notify }) => {
  const [success, setSuccess] = useState(false);

  if (success) {
    notify();
    closeModal();
    return;
  }

  const handleDelete = () => {
    deleteTicket(data.id).then((res) => setSuccess(res.success));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center bg-gray-200/20 p-4">
      <div className="bg-surface mx-auto w-full max-w-lg overflow-hidden rounded-lg p-4 py-20 shadow-xl">
        <p className="text-center">Confirm delete?</p>
        <div className="mt-8 flex items-center justify-center gap-4">
          <button
            className="bg-error hover:bg-error/80 text-surface w-[180px] cursor-pointer rounded-lg px-4 py-3"
            onClick={closeModal}
          >
            Cancel
          </button>
          <button
            className="text-surface w-[180px] cursor-pointer rounded-lg bg-gray-500 px-4 py-3 hover:bg-gray-500/80"
            onClick={handleDelete}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};
