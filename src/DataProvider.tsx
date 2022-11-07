import {
  AuthData,
  Credentials,
  Dashboard,
  DataProviderInterface,
  Embedded,
  LoginResponse,
  RLS,
  Resource,
} from "./DataProvider.types";

export default class DataProvider implements DataProviderInterface {
  _apiUrl: string;
  _credentials: Credentials;

  _authData: AuthData;

  constructor(apiUrl: string, credentials: Credentials) {
    this._apiUrl = apiUrl;
    this._credentials = credentials;
  }

  private _createUrl(path: string): string {
    return `${this._apiUrl}${path}`;
  }

  private async _fetchLogin({
    username,
    password,
  }: Credentials): Promise<LoginResponse> {
    const url = this._createUrl("/api/v1/security/login");
    return fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
        provider: "db",
      }),
    }).then((response) => response.json());
  }

  private async _fetchCsrfToken(accessToken: string): Promise<string> {
    const url = this._createUrl("/api/v1/security/csrf_token/");
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const { result } = await response.json();
    return result;
  }

  private async _fetchAuthData(): Promise<AuthData> {
    if (this._authData) {
      return this._authData;
    }
    if (this._credentials === null) {
      throw new Error("Missing credentials");
    }

    const { access_token, refresh_token } = await this._fetchLogin(
      this._credentials
    );

    const csrfToken = await this._fetchCsrfToken(access_token);
    this._authData = {
      accessToken: access_token,
      refreshToken: refresh_token,
      csrfToken,
    };
    return this._authData;
  }

  private async _fetchData(
    url: string,
    request?: RequestInit
  ): Promise<Response> {
    const { accessToken, csrfToken } = await this._fetchAuthData();
    return fetch(url, {
      ...request,
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": csrfToken,
        Authorization: `Bearer ${accessToken}`,
        ...request?.headers,
      },
    });
  }

  private async _fetchEmbedded(dashboardId: number): Promise<Embedded> {
    const url = this._createUrl(`/api/v1/dashboard/${dashboardId}/embedded`);
    return this._fetchData(url)
      .then((response) => response.json())
      .then(({ result }) => result);
  }

  public async fetchGuestToken(
    resources: Resource[],
    rls: RLS[] = []
  ): Promise<string> {
    if (this._credentials === null) {
      throw new Error("Missing credentials");
    }
    const { accessToken } = await this._fetchAuthData();
    const url = this._createUrl("/api/v1/security/guest_token/");
    const { token } = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        access_token: accessToken,
        user: {
          username: "guest",
          first_name: "Guest",
          last_name: "User",
        },
        resources,
        rls,
      }),
    }).then((response) => response.json());
    return token;
  }

  public async fetchDashboards(): Promise<Dashboard[]> {
    const url = this._createUrl("/api/v1/dashboard/");
    let dashboards = await this._fetchData(url)
      .then((response) => response.json())
      .then(({ result }) => result);

    dashboards = await Promise.all(
      await dashboards.map(async (dashboard) => ({
        ...dashboard,
        embedded: await this._fetchEmbedded(dashboard.id),
      }))
    );
    // Returns only dashboards with embedded data
    return dashboards.filter(
      (dashboard) => dashboard.status === "published" && dashboard.embedded
    );
  }
}
