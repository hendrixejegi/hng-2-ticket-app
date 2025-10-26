import { useState, useEffect } from "react";
import getTickets from "../../actions/getTickets";
import { FaTicket, FaRegHourglassHalf, FaCircleCheck } from "react-icons/fa6";

export default function DashboardSummary() {
  const [ticketsData, setTicketsData] = useState(null);
  const [ticketsStats, setTicketsStats] = useState(null);

  useEffect(() => {
    getTickets().then((res) => setTicketsData(res));
  }, []);

  useEffect(() => {
    if (!ticketsData) {
      return;
    }
    const stats = getTicketsStats(ticketsData);
    setTicketsStats(stats);
  }, [ticketsData]);

  return (
    <div>
      <h1 className="sr-only">Dashboard ticket summary</h1>
      <div className="flex gap-4">
        <SummaryCard value={ticketsStats?.open ?? 0} description="Open Tickets">
          <FaRegHourglassHalf aria-hidden="true" className="text-accent" />
        </SummaryCard>
        <SummaryCard
          value={ticketsStats?.resolved ?? 0}
          description="Resolved Tickets"
        >
          <FaCircleCheck aria-hidden="true" className="text-accent" />
        </SummaryCard>
        <SummaryCard
          value={ticketsStats?.total ?? 0}
          description="Total Tickets"
        >
          <FaTicket aria-hidden="true" className="text-accent" />
        </SummaryCard>
      </div>
    </div>
  );
}

function SummaryCard({ value, children, description }) {
  return (
    <div className="bg-background text-text flex basis-1/3 items-center gap-4 rounded-lg p-4">
      <div className="bg-primary/10 flex size-10 items-center justify-center rounded-full">
        {children}
      </div>
      <p className="flex flex-col">
        <span className="text-2xl font-bold">{value}</span>
        <span>{description}</span>
      </p>
    </div>
  );
}

const getTicketsStats = (data) => {
  let openTickets = 0;
  let resolvedTickets = 0;

  for (let ticket of data) {
    const { status } = ticket;

    switch (status) {
      case 0:
        resolvedTickets++;
        break;
      case 1:
      case 2:
        openTickets++;
        break;

      default:
        break;
    }
  }

  return {
    open: openTickets,
    resolved: resolvedTickets,
    total: openTickets + resolvedTickets,
  };
};
