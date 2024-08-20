import "./Dashboard.scss";

import rison from "rison";
import React, { useEffect, useRef } from "react";

import { DashboardProps } from "./Dashboard.types";
import { embedDashboard, EmbeddedDashboard } from "./Embedded";
import { formatNativeFilter } from "./Embedded/NativeFilter";

const Dashboard = ({
  uuid,
  domain,
  dataProvider,
  guestToken,
  nativeFilters,
  autosize = false,
  placeholder = false,
  uiConfig = {
    hideTitle: true,
  },
}: DashboardProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = React.useState(true);
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

      await embedDashboard({
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
      }).then(async (dashboard: EmbeddedDashboard) => {
        if (!autosize) {
          setLoading(false);
          ref.current!.style.height = "100%";
          return;
        }
        const { height } = await dashboard.getScrollSize();
        let lastHeight = height;
        const interval = setInterval(async () => {
          const { height, width } = await dashboard.getScrollSize();
          if (lastHeight === height) {
            clearInterval(interval);
            ref.current!.style.height = `${height}px`;
            setLoading(false);
          }
          lastHeight = height;
        }, 1500);

        return () => {
          clearInterval(interval);
          dashboard.unmount();
        };
      });
    })();
  }, [ref.current, uuid]);

  return (
    <>
      {placeholder !== false && loading === true && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
            width: "100%",
          }}
        >
          {placeholder}
        </div>
      )}
      <div className={`superset-dashboard`} ref={ref} style={{ height: 0 }} />
    </>
  );
};

export default Dashboard;
