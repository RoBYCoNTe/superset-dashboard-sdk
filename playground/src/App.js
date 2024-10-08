import { SUPERSET_DOMAIN, dataProvider } from "./config";

import { Dashboard } from "superset-dashboard";

const RESOURCE_UUID = "ffbb43c4-1faf-49bf-bc7c-cdde244c1da0";
function App() {
  // const [guestToken, setGuestToken] = useState(null);
  // useEffect(() => {
  //   async function fetch() {
  //     const guestToken = await dataProvider.fetchGuestToken(
  //       [{ id: RESOURCE_UUID, type: "dashboard" }]
  //       // [
  //       //   {
  //       //     clause: "year = 2022",
  //       //   },
  //       // ]
  //     );
  //     setGuestToken(guestToken);
  //     const dashboard = await dataProvider.fetchDashboardInfo(guestToken, 4);
  //     const jsonMetadata = dashboard.getJsonMetadata();
  //     const nativeFilter = jsonMetadata.native_filter_configuration[0];
  //     const targetColumn = nativeFilter.targets[0];
  //     const nativeFilterData = await dataProvider.fetchChartData(guestToken, {
  //       datasource: {
  //         id: targetColumn.datasetId,
  //         type: "table",
  //       },
  //       queries: [
  //         {
  //           columns: [targetColumn.column.name],
  //           orderby: [[targetColumn.column.name, false]],
  //           groupby: [targetColumn.column.name],
  //         },
  //       ],
  //     });
  //     console.info({
  //       nativeFilter,
  //       nativeFilterData,
  //     });
  //   }
  //   fetch();
  // }, []);

  // if (!guestToken) {
  //   return null;
  // }

  return (
    <div style={{ height: "100vh" }}>
      <Dashboard
        uuid={RESOURCE_UUID}
        domain={SUPERSET_DOMAIN}
        dataProvider={dataProvider}
        // filters={[
        //   {
        //     id: "NATIVE_FILTER-37AnUlqIo",
        //     name: "pathology",
        //     operator: "IN",
        //     value: ["CHE"],
        //   },
        //   {
        //     id: "NATIVE_FILTER-GAeFWY3OB",
        //     name: "risk",
        //     operator: "IN",
        //     value: "Tutte",
        //   },
        // ]}
        uiConfig={{
          hideTitle: true,
          hideTab: true,
          hideChartControls: true,
          filters: {
            visible: false,
            expanded: false,
          },
        }}
      />
    </div>
  );
}

export default App;
