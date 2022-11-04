import { DataProviderInterface } from "../DataProvider.types";

export type DashboardProps = {
  /**
   * The data provider to use for the dashboard.
   */
  dataProvider: DataProviderInterface;
  /**
   * The id of the dashboard to display.
   */
  id: string;
  /**
   * Indicates whether the dashboard should be displayed in fullheight mode.
   * In that case the dashboard will try to fit itself adding scrollbar to the container.
   */
  fullheight?: boolean;
  /**
   * Superset domain.
   */
  domain: string;
};
