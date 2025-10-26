import { FaTicket, FaRegHourglassHalf, FaCircleCheck } from "react-icons/fa6";

export default function DashboardSummary() {
  return (
    <div>
      <h1 className="sr-only">Dashboard ticket summary</h1>
      <div className="flex gap-4">
        <SummaryCard value={1} description="Open Tickets">
          <FaRegHourglassHalf aria-hidden="true" className="text-accent" />
        </SummaryCard>
        <SummaryCard value={9} description="Resolved Tickets">
          <FaCircleCheck aria-hidden="true" className="text-accent" />
        </SummaryCard>
        <SummaryCard value={10} description="Total Tickets">
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
