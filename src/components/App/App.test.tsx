import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";

test("renders basic app structure", () => {
  render(
    <Router>
      <App />
    </Router>,
  );
  const header = screen.getByTestId("app-header");
  expect(header).toBeInTheDocument();

  const logo = screen.getByTestId("app-logo");
  expect(logo).toBeInTheDocument();

  const contentWrapper = screen.getByTestId("app-content-wrapper");
  expect(contentWrapper).toBeInTheDocument();
});
