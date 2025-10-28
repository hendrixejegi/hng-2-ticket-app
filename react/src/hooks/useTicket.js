import { useState, useEffect, useCallback } from "react";
import { getSession } from "../utils";
import getTickets from "../actions/getTickets";

const useTickets = (init = null) => {
  const [session] = useState(getSession());
  const [state, setState] = useState({ isFetching: true, data: init });

  const refreshTicketsData = useCallback(() => {
    setState((prev) => ({ ...prev, isFetching: true }));
    if (!session) return;
    const { token } = session;
    getTickets(token).then((res) => {
      setState((prev) => ({ ...prev, isFetching: false, data: res }));
    });
  }, [session]);

  // Fetch tickets data
  useEffect(() => {
    refreshTicketsData();
  }, [session, refreshTicketsData]);

  return [state.data, refreshTicketsData, state.isFetching];
};

export default useTickets;
