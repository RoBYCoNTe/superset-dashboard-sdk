import Dashboard from "./Dashboard";
import { DashboardProps } from "./Dashboard.types";
import React from "react";
import { render } from "@testing-library/react";

describe("Test Component", () => {
  let props: DashboardProps;

  beforeEach(() => {
    props = {
      id: "d7a5dccf-1bc6-414b-b52b-35ddfede5226",
      fullheight: false,
      superset: {
        endpoint: "http://localhost:8088",
        guestUser: "website",
        guestPass: "ciccio",
      },
    };
  });

  const renderComponent = () => render(<Dashboard {...props} />);

  it("should render component with no errors", () => {
    const { container } = renderComponent();
    expect(container).toBeInTheDocument();
  });
  //   it("should have primary className with default props", () => {
  //     const { getByTestId } = renderComponent();

  //     const testComponent = getByTestId("test-component");

  //     expect(testComponent).toHaveClass("test-component-primary");
  //   });

  //   it("should have secondary className with theme set as secondary", () => {
  //     props.theme = "secondary";
  //     const { getByTestId } = renderComponent();

  //     const testComponent = getByTestId("test-component");

  //     expect(testComponent).toHaveClass("test-component-secondary");
  //   });
});
