import Dashboard from "./Dashboard";
import React from "react";
export default {
  title: "Dashboard",
};
export const Scrollable = () => (
  <Dashboard
    id="d7a5dccf-1bc6-414b-b52b-35ddfede5226"
    superset={{
      endpoint: "http://localhost:8088",
      guestUser: "website",
      guestPass: "ciccio",
    }}
  />
);
export const FullHeight = () => (
  <Dashboard
    id="d7a5dccf-1bc6-414b-b52b-35ddfede5226"
    fullheight
    superset={{
      endpoint: "http://localhost:8088",
      guestUser: "website",
      guestPass: "ciccio",
    }}
  />
);
