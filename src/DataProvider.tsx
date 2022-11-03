export type LoginResponse = {
  access_token: string;
  refresh_token: string;
};

export type GetGuestTokenResponse = {
  token: string;
};

export type Resource = {
  type: string;
  id: string;
};

export type RLS = {
  clause: string;
};

export type GuestUser = {
  username: string;
  first_name: string;
  last_name: string;
};

export type GetGuestTokenRequest = {
  access_token: string;
  user: GuestUser;
  resources: Resource[];
  rls: RLS[];
};

export type Credentials = {
  username: string;
  password: string;
};

export default class DataProvider {
  _apiUrl: string;
  _credentials: Credentials;

  constructor(apiUrl: string, credentials: Credentials) {
    this._apiUrl = apiUrl;
    this._credentials = credentials;
  }

  private _createUrl(path: string): string {
    return `${this._apiUrl}${path}`;
  }

  private _login({ username, password }: Credentials): Promise<LoginResponse> {
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

  public login(): Promise<LoginResponse> {
    return this._login(this._credentials);
  }

  public getGuestToken({
    access_token,
    ...body
  }: GetGuestTokenRequest): Promise<GetGuestTokenResponse> {
    const url = this._createUrl("/api/v1/security/guest_token/");
    return fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access_token}`,
      },
      body: JSON.stringify(body),
    }).then((response) => response.json());
  }

  public async fetchGuestToken(
    resources: Resource[],
    rls: RLS[] = []
  ): Promise<string> {
    if (this._credentials === null) {
      throw new Error("Missing credentials");
    }
    const { access_token } = await this.login();
    const { token } = await this.getGuestToken({
      access_token,
      user: {
        username: "guest",
        first_name: "Guest",
        last_name: "User",
      },
      resources,
      rls,
    });
    return token;
  }
}
