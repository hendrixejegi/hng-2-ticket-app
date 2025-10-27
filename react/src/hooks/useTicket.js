import { useState, useEffect, useCallback } from "react";
import { getSession } from "../utils";
import getTickets from "../actions/getTickets";

const useTickets = (init = null) => {
  const [session] = useState(getSession());
  const [ticketsData, setTicketsData] = useState(init);

  const refreshTicketsData = useCallback(() => {
    if (!session) return;
    const { token } = session;
    getTickets(token).then((res) => setTicketsData(res));
  }, [session]);

  // Fetch tickets data
  useEffect(() => {
    refreshTicketsData();
  }, [session, refreshTicketsData]);

  return [ticketsData, refreshTicketsData];
};

export default useTickets;
