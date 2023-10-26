import "./Dashboard.scss";

import rison from "rison";
import React, { useEffect, useRef } from "react";

import { DashboardProps } from "./Dashboard.types";
import { embedDashboard } from "./Embedded";
import { formatNativeFilter } from "./Embedded/NativeFilter";

const Dashboard = ({
  uuid,
  domain,
  dataProvider,
  guestToken,
  nativeFilters,
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
          id: uuid,
        },
      ];

      const token = guestToken || (await dataProvider.fetchGuestToken(resources, []));

      const mergedNativeFilters = {};
      let risonFilters = "";
      if (nativeFilters && nativeFilters.length > 0) {
        nativeFilters.map(formatNativeFilter).forEach((filterObject) => {
          const nativeFilterKey = Object.keys(filterObject)[0];
          mergedNativeFilters[nativeFilterKey] = filterObject[nativeFilterKey];
        });
        risonFilters = rison.encode(mergedNativeFilters);
      }

      const config = await embedDashboard({
        uuid: uuid,
        supersetDomain: domain,
        mountPoint: ref!.current,
        fetchGuestToken: () => Promise.resolve(token),
        dashboardUiConfig: {
          ...uiConfig,
          filters: {
            ...uiConfig.filters,
            native_filters: risonFilters,
          },
        },
      });
      return;
    })();
  }, [ref.current, uuid]);

  return <div className={`superset-dashboard`} ref={ref} />;
};

export default Dashboard;
