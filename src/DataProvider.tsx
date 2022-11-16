import {
  AuthData,
  ChartData,
  ChartDataQuery,
  Credentials,
  Dashboard,
  DataProviderInterface,
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
        refresh: true,
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

  public async _fetchGuestToken(
    accessToken: string,
    resources: Resource[] = [],
    rls: RLS[] = []
  ): Promise<string> {
    if (this._credentials === null) {
      throw new Error("Missing credentials");
    }
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

  public async fetchCsrfToken(): Promise<string> {
    const { csrfToken } = await this._fetchAuthData();
    return csrfToken;
  }

  public async fetchGuestToken(
    resources: Resource[],
    rls: RLS[] = []
  ): Promise<string> {
    if (this._credentials === null) {
      throw new Error("Missing credentials");
    }
    const { accessToken } = await this._fetchAuthData();
    const token = await this._fetchGuestToken(accessToken, resources, rls);
    return token;
  }

  public async fetchDashboardInfo(
    guestToken: string,
    id: Number
  ): Promise<Dashboard> {
    const { csrfToken } = await this._fetchAuthData();
    const url = this._createUrl(`/api/v1/dashboard/${id}`);
    return fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "X-CSRFToken": csrfToken,
        "X-GuestToken": guestToken,
      },
    })
      .then((response) => response.json())
      .then(({ result }) => new Dashboard(result));
  }

  public async fetchChartData(
    guestToken: string,
    query: ChartDataQuery
  ): Promise<ChartData> {
    const { csrfToken } = await this._fetchAuthData();
    const url = this._createUrl(`/api/v1/chart/data`);
    return fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "X-CSRFToken": csrfToken,
        "X-GuestToken": guestToken,
      },
      body: JSON.stringify(query),
    })
      .then((response) => response.json())
      .then(({ result }) => result);
  }
}
