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

export type User = {
  username: string;
  first_name: string;
  last_name: string;
};

export type GetGuestTokenRequest = {
  access_token: string;
  user: User;
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
export class Dashboard {
  info: DashboardInfo;
  constructor(dashboardInfo: DashboardInfo) {
    this.info = dashboardInfo;
  }
  getJsonMetadata(): JsonMetadata {
    return JSON.parse(this.info.json_metadata);
  }
}

export type ChartDataQueryFilter = {
  col: string;
  op: string;
  val: string;
};
export type ChartDataQuery = {
  datasource: { id: number; type: string };
  force: boolean;
  form_data: {
    adhoc_filters: any[];
    datasource: string;
    defaultToFirstItem: boolean;
    enableEmptyFilter: boolean;
    extra_filters: any[];
    extra_form_data: any;
    force: boolean;
    groupby: string[];
    inView: boolean;
    inverseSelection: boolean;
    metrics: string[];
    multiSelect: boolean;
    result_format: string;
    result_type: string;
    row_limit: number;
    searchAllOptions: boolean;
    showSearch: boolean;
    sortAscending: boolean;
    type: string;
    urlParams: any;
    viz_type: string;
  };
  queries: [
    {
      filters: ChartDataQueryFilter[];
      columns: string[];
      orderby: [string[]];
      row_limit: number;
      order_desc: boolean;
      groupby: string[];
    }
  ];
  result_format: string;
  result_type: string;
};

export type ChartData = {
  cache_key?: string;
  cached_dttm?: string;
  cache_timeout?: number;
  query?: string;
  status?: string;
  stacktrace?: string;
  rowcount?: number;
  from_dttm?: string;
  to_dttm?: string;
  label_map?: {
    [key: string]: string[];
  };
  colnames?: string[];
  indexnames?: string[];
  coltypes?: string[];
  data?: any[];
};

export type DashboardInfo = {
  certified_details?: string;
  certified_by?: string;
  changed_by?: User;
  changed_by_name?: string;
  changed_by_url?: string;
  changed_on?: string;
  changed_on_delta_humanized?: string;
  charts?: string[];
  css?: string;
  dashboard_title: string;
  id: number;
  is_managed_externally?: boolean;
  json_metadata: string;
  owners?: User[];
  position_json?: string;
  published?: boolean;
  roles?: string[];
  slug?: string;
  thumbnail_url?: string;
  url: string;
};

export type NativeFilterConfiguration = {
  cascadeParentIds?: string[];
  controlValues?: {
    defaultToFirstItem?: boolean;
    enableEmptyFilter?: boolean;
    inverseSelection?: boolean;
    multiSelect?: boolean;
    searchAllOptions?: boolean;
  };
  defaultDataMask: {
    extraFormData: {
      [key: string]: any;
    };
    filterState: {
      [key: string]: any;
    };
    ownState: {
      [key: string]: any;
    };
  };
  description: string;
  filterType: string;
  id: string;
  name: string;
  scope: {
    excluded: string[];
    rootPath: string[];
  };
  targets: [
    {
      column: { name: string };
      datasetId: number;
    }
  ];
  type: string;
};
export type JsonMetadata = {
  refresh_frequency?: number;
  show_native_filters?: boolean;
  native_filter_configuration?: NativeFilterConfiguration[];
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

  /**
   * Fetch dashboard info.
   *
   * @param id Id of the dashboard to fetch.
   * @param guestToken Guest token to access the dashboard.
   */
  fetchDashboardInfo(guestToken: string, id: number): Promise<Dashboard>;

  fetchChartData(guestToken: string, query: ChartDataQuery): Promise<ChartData>;
}
