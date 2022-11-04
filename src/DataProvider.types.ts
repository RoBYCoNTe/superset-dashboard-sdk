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

export interface DataProviderInterface {
  fetchGuestToken(resource: Resource[], rls: RLS[]): Promise<string>;
}
