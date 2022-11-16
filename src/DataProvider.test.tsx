import "isomorphic-fetch";

import {
  ChartData,
  ChartDataQuery,
  Dashboard,
  DashboardInfo,
  DataProviderInterface,
} from "./DataProvider.types";

import DataProvider from "./DataProvider";

const ENDPOINT = "http://127.0.0.1:8088";
const USERNAME = "guest";
const PASSWORD = "guest";

class MockDataProvider implements DataProviderInterface {
  fetchGuestToken() {
    return Promise.resolve("fake_token");
  }
  fetchCsrfToken(): Promise<string> {
    return Promise.resolve("fake_token");
  }
  fetchDashboardInfo(guestToken: string, id: number): Promise<Dashboard> {
    return Promise.resolve(
      new Dashboard({
        id: 0,
        dashboard_title: "fake_dashboard",
        json_metadata: "{}",
        url: "fake_url",
      })
    );
  }
  fetchChartData(
    guestToken: string,
    query: ChartDataQuery
  ): Promise<ChartData> {
    return Promise.resolve({});
  }
}

describe("Test DataProvider", () => {
  it("should returna fake token", () => {
    const dataProvider = new MockDataProvider();
    expect(dataProvider.fetchGuestToken()).resolves.toBe("fake_token");
    expect(dataProvider.fetchCsrfToken()).resolves.toBe("fake_token");
  });
  it("should receive correct props", () => {
    const dataProvider = new DataProvider(ENDPOINT, {
      username: USERNAME,
      password: PASSWORD,
    });
    expect(dataProvider).toHaveProperty("_apiUrl", ENDPOINT);
    expect(dataProvider).toHaveProperty("_credentials", {
      username: USERNAME,
      password: PASSWORD,
    });
    // Ensure that fetched token is not empty
    expect(dataProvider.fetchGuestToken([])).resolves.not.toBe("");
  });
});
