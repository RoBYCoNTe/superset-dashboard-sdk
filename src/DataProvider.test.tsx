import DataProvider from "./DataProvider";
import { DataProviderInterface } from "./DataProvider.types";
class MockDataProvider implements DataProviderInterface {
  fetchGuestToken() {
    return Promise.resolve("fake_token");
  }
}

describe("Test DataProvider", () => {
  it("should returna fake token", () => {
    const dataProvider = new MockDataProvider();
    expect(dataProvider.fetchGuestToken()).resolves.toBe("fake_token");
  });
  it("should receive correct props", () => {
    const dataProvider = new DataProvider("http://localhost:8088", {
      username: "website",
      password: "ciccio",
    });
    expect(dataProvider).toHaveProperty("_apiUrl", "http://localhost:8088");
    expect(dataProvider).toHaveProperty("_credentials", {
      username: "website",
      password: "ciccio",
    });
  });
});
