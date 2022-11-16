import "./Dashboard.scss";

import React, { useEffect, useRef } from "react";

import { DashboardProps } from "./Dashboard.types";
import { embedDashboard } from "./Embedded";
import { formatFilter } from "./Embedded/Filter";

const Dashboard = ({
  id,
  domain,
  fullheight = false,
  dataProvider,
  guestToken,
  filters,
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

      const token =
        guestToken || (await dataProvider.fetchGuestToken(resources, []));
      const config = await embedDashboard({
        id: id,
        supersetDomain: domain,
        mountPoint: ref!.current,
        fetchGuestToken: () => Promise.resolve(token),
        dashboardUiConfig: {
          ...uiConfig,
          filters: {
            ...uiConfig.filters,
            native_filters:
              filters && filters.length > 0
                ? `(${filters.map(formatFilter).join(",")})`
                : undefined,
          },
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

        const height = parseInt(ref.current.style.height.replace("px", ""));

        if (size.height !== height) {
          ref.current.style.height = `${size.height}px`;
          ref.current.style.overflow = "hidden";
        }
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
