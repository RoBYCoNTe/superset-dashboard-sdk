import "./Dashboard.scss";

import React, { useEffect, useMemo, useRef } from "react";

import { DashboardProps } from "./Dashboard.types";
import DataProvider from "../DataProvider";
import { embedDashboard } from "@superset-ui/embedded-sdk";

const Dashboard = ({ id, fullheight = false, superset }: DashboardProps) => {
  const dataProvider = useMemo(
    () =>
      new DataProvider(superset.endpoint, {
        username: superset.guestUser,
        password: superset.guestPass,
      }),
    [superset.endpoint, superset.guestUser, superset.guestPass]
  );
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!ref.current) {
      return;
    }
    (async () => {
      const resources = [
        {
          type: "dashboard",
          id,
        },
      ];
      const config = await embedDashboard({
        id: id,
        supersetDomain: superset.domain || superset.endpoint,
        mountPoint: ref?.current,
        fetchGuestToken: () => dataProvider.fetchGuestToken(resources),
        dashboardUiConfig: {
          hideTitle: true,
          hideTab: true,
        },
      });
      if (!fullheight) {
        return;
      }
      const sizeWatcher = setInterval(async () => {
        if (ref.current === null) {
          return;
        }
        const size = await config.getScrollSize();
        ref.current.style.height = `${size.height}px`;
        ref.current.style.overflow = "hidden";
      }, 1000);
      return () => {
        clearInterval(sizeWatcher);
      };
    })();
  }, [ref.current, id, fullheight]);

  return (
    <div
      className={`superset-dashboard ${
        fullheight ? "superset-dashboard-fullheight" : ""
      }`}
      ref={ref}
    />
  );
};

export default Dashboard;
