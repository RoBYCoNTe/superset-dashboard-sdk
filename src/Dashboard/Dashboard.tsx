import "./Dashboard.scss";

import React, { useEffect, useMemo, useRef } from "react";

import { DashboardProps } from "./Dashboard.types";
import { embedDashboard } from "@superset-ui/embedded-sdk";

const Dashboard = ({
  id,
  domain,
  fullheight = false,
  dataProvider,
  uiConfig = {
    hideTitle: true,
  },
}: DashboardProps) => {
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

      const token = await dataProvider.fetchGuestToken(resources, []);
      const config = await embedDashboard({
        id: id,
        supersetDomain: domain,
        mountPoint: ref!.current,
        fetchGuestToken: () => Promise.resolve(token),
        dashboardUiConfig: uiConfig,
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
