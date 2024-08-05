import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import "@testing-library/jest-dom";
import fetch from "jest-fetch-mock";
import CurrenciesTable from "./CurrenciesTable";

jest.mock("./NoRowsOverlay/NoRowsOverlay", () => () => <div>No Rows</div>);
jest.mock(
  "../SnackbarAlert/SnackbarAlert",
  () =>
    ({ open }: { open: boolean }) =>
      open ? <div data-testid='alert'>Error</div> : null,
);
jest.mock("./CustomGridToolbar/CustomGridToolbar", () => {
  return ({
    quickFilterValue,
    setQuickFilterValue,
  }: {
    quickFilterValue: string;
    setQuickFilterValue: React.Dispatch<React.SetStateAction<string>>;
  }) => (
    <div>
      <input
        data-testid='quick-filter'
        value={quickFilterValue}
        onChange={(e) => setQuickFilterValue(e.target.value)}
      />
    </div>
  );
});
jest.mock(
  "../../utils/getFlags/getFlags",
  () => (currency: string) => `/flags/${currency}.png`,
);
jest.mock(
  "../../utils/getTableHeight/getTableHeight",
  () => (rows: any[], pageSize: number) => 400,
);

const mockCurrenciesData = {
  baseCurrency: "EUR",
  comparisonDate: "2021-09-01",
  fx: [
    {
      currency: "USD",
      precision: 2,
      nameI18N: "US Dollar",
      exchangeRate: { middle: 1.2 },
    },
    {
      currency: "JPY",
      precision: 0,
      nameI18N: "Japanese Yen",
      exchangeRate: { middle: 130.0 },
    },
  ],
  institute: 100,
  lastUpdated: "2021-09-01T10:00:00Z",
};

describe("CurrenciesTable", () => {
  beforeEach(() => {
    fetch.resetMocks();
  });

  it("renders data after loading", async () => {
    fetch.mockResponseOnce(JSON.stringify(mockCurrenciesData));

    render(
      <Router>
        <CurrenciesTable />
      </Router>,
    );

    await waitFor(() => {
      expect(screen.queryByText("Loading...")).not.toBeInTheDocument();
    });
  });

  it("renders error snackbar on fetch error", async () => {
    fetch.mockRejectOnce(new Error("API Error"));

    render(
      <Router>
        <CurrenciesTable />
      </Router>,
    );

    expect(await screen.findByTestId("alert")).toBeInTheDocument();
    expect(screen.getByTestId("alert")).toHaveTextContent("Error");
  });

  it("updates URL when search term changes", async () => {
    fetch.mockResponseOnce(JSON.stringify(mockCurrenciesData));

    render(
      <Router>
        <CurrenciesTable />
      </Router>,
    );

    await waitFor(() => {
      expect(screen.queryByText("Loading...")).not.toBeInTheDocument();
    });

    const quickFilterInput = screen.getByTestId("quick-filter");
    fireEvent.change(quickFilterInput, { target: { value: "Dollar" } });

    await waitFor(() => {
      expect(new URLSearchParams(window.location.search).get("search")).toBe(
        "Dollar",
      );
    });
  });
});
