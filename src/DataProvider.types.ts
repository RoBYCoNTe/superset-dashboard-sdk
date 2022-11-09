export type LoginResponse = {
  access_token: string;
  refresh_token: string;
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

export type Embedded = {
  uuid: string;
};
export type Dashboard = {
  id: number;
  dashboard_title: string;
  embedded?: Embedded;
};

export type AuthData = {
  accessToken: string;
  refreshToken: string;
  csrfToken: string;
};

/**
 * Basic interface for a data provider.
 */
export interface DataProviderInterface {
  /**
   * Fetch guest token necessary to access the dashboard.
   * @param resource
   * @param rls
   */
  fetchGuestToken(resource: Resource[], rls: RLS[]): Promise<string>;
  /**
   * Fetch valid csrf token.
   */
  fetchCsrfToken(): Promise<string>;
}
