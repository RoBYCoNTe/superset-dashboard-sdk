import { DataProviderInterface } from "../DataProvider.types";
import { NativeFilter } from "./Embedded/NativeFilter";
import { UiConfigType } from "./Embedded";

export type DashboardProps = {
  /**
   * The data provider to use to fetch data.
   */
  dataProvider?: DataProviderInterface;
  /**
   * The UUID of the dashboard to embed.
   */
  uuid: string;
  /**
   * The domain of the Superset instance to use.
   */
  domain: string;
  /**
   * Superset Dashboard Config
   */
  uiConfig?: UiConfigType;
  /**
   * You can provide guest token directly without using dataProvider.
   */
  guestToken?: string;
  /**
   * Native filters to apply to the dashboard.
   */
  nativeFilters?: NativeFilter[];
  /**
   * If true, the dashboard will automatically resize to fit its content.
   * It will always be influenced by the parent container size.
   */
  autosize?: boolean;
  /**
   * The placeholder to show while the dashboard is loading.
   */
  placeholder?: string | boolean;
};
