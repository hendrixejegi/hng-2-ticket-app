import { useState, useEffect } from "react";
import { getSession } from "../utils";
import getTickets from "../actions/getTickets";

const useTickets = (init = null) => {
  const [session] = useState(getSession());
  const [ticketsData, setTicketsData] = useState(init);

  // Fetch tickets data
  useEffect(() => {
    if (!session) return;
    const { token } = session;
    getTickets(token).then((res) => setTicketsData(res));
  }, [session]);

  return [ticketsData, setTicketsData];
};

export default useTickets;
