import { render, screen } from "@testing-library/react";
import SnackbarAlert from "./SnackbarAlert";

describe("SnackbarAlert Tests", () => {
  afterEach(() => {
    jest.useRealTimers();
  });

  it("should render snackbar when open is true", () => {
    render(<SnackbarAlert open={true} setOpen={() => {}} />);

    const snackbar = screen.getByRole("alert");
    expect(snackbar).toBeInTheDocument();

    const snackbarContent = screen.getByTestId("alert|content");
    expect(snackbarContent).toBeInTheDocument();
    expect(snackbarContent).toContainHTML(
      `<div data-testid="alert|content">Exchange rates could not be loaded.<br />Showing mocked data.</div>`,
    );
  });
});
