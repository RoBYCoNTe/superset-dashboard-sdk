import "./Dashboard.scss";

import rison from 'rison';
import React, { useEffect, useRef } from "react";

import { DashboardProps } from "./Dashboard.types";
import { embedDashboard } from "./Embedded";
import { formatNativeFilter } from "./Embedded/NativeFilter";

const Dashboard = ({
  uuid,
  domain,
  fullHeight = false,
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

      const token =
        guestToken || (await dataProvider.fetchGuestToken(resources, []));

      const mergedNativeFilters = {}
      let risonFilters = ''
      if(nativeFilters && nativeFilters.length > 0){
        nativeFilters.map(formatNativeFilter).forEach(filterObject => {
          const nativeFilterKey = Object.keys(filterObject)[0]
          mergedNativeFilters[nativeFilterKey] = filterObject[nativeFilterKey]
        })
        risonFilters = rison.encode(mergedNativeFilters)
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
      if (!fullHeight) {
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
  }, [ref.current, uuid, fullHeight]);

  return (
    <div
      className={`superset-dashboard ${
        fullHeight ? "superset-dashboard-fullheight" : ""
      }`}
      ref={ref}
    />
  );
};

export default Dashboard;
