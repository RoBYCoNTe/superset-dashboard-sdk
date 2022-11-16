import { Dashboard, Filter } from "superset-dashboard";
import { SUPERSET_DOMAIN, dataProvider } from "./config";
import { useEffect, useState } from "react";

const RESOURCE_ID = "a4b1e3e4-827a-46a2-9fa0-0259816c64ec";
function App() {
  const [guestToken, setGuestToken] = useState(null);
  useEffect(() => {
    async function fetch() {
      const guestToken = await dataProvider.fetchGuestToken(
        [{ id: RESOURCE_ID, type: "dashboard" }],
        [
          {
            clause: "year = 2022",
          },
        ]
      );
      setGuestToken(guestToken);
      const dashboard = await dataProvider.fetchDashboardInfo(guestToken, 4);
      const jsonMetadata = dashboard.getJsonMetadata();
      const nativeFilter = jsonMetadata.native_filter_configuration[0];
      const targetColumn = nativeFilter.targets[0];
      const nativeFilterData = await dataProvider.fetchChartData(guestToken, {
        datasource: {
          id: targetColumn.datasetId,
          type: "table",
        },
        queries: [
          {
            columns: [targetColumn.column.name],
            orderby: [[targetColumn.column.name, false]],
            groupby: [targetColumn.column.name],
          },
        ],
      });
      console.info({
        nativeFilter,
        nativeFilterData,
      });
    }
    fetch();
  }, []);

  if (!guestToken) {
    return null;
  }

  return (
    <Dashboard
      id={RESOURCE_ID}
      domain={SUPERSET_DOMAIN}
      dataProvider={dataProvider}
      fullheight
      guestToken={guestToken}
      filters={[
        {
          id: "NATIVE_FILTER-37AnUlqIo",
          name: "pathology",
          operator: "IN",
          value: ["CHE"],
        },
        {
          id: "NATIVE_FILTER-GAeFWY3OB",
          name: "risk",
          operator: "IN",
          value: "Tutte",
        },
      ]}
      uiConfig={{
        hideTitle: true,
      }}
    />
  );
}

export default App;
