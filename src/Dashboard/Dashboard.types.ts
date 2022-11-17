import { DataProviderInterface } from "../DataProvider.types";
import { NativeFilter } from "./Embedded/NativeFilter";
import { UiConfigType } from "./Embedded";

export type DashboardProps = {
  /**  The data provider to use for the dashboard. */
  dataProvider: DataProviderInterface;
  /** The uuid of the dashboard to display. */
  uuid: string;
  /**
   * Indicates whether the dashboard should be displayed in fullheight mode.
   * In that case the dashboard will try to fit itself adding scrollbar to the container.
   */
  fullheight?: boolean;
  /** Superset domain. */
  domain: string;
  /** Superset dashboard config */
  uiConfig?: UiConfigType;
  /** You can provide guest token directly without using dataProvider. */
  guestToken?: string;
  /** List of filters to apply to the dashboard. */
  nativeFilters?: NativeFilter[];
};
