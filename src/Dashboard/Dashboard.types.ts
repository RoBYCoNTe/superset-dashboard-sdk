export type DashboardProps = {
  /**
   * Superset configuration parameters.
   */
  superset: {
    /**
     * If null is equal to endpoint.
     */
    domain?: string;
    endpoint: string;
    guestUser: string;
    guestPass: string;
  };
  id: string;
  fullheight?: boolean;
};
