import { render, screen } from "@testing-library/react";
import CustomGridToolbar from "./CustomGridToolbar";
import {
  DataGrid,
  GridColDef,
  GridToolbarProps,
  ToolbarPropsOverrides,
} from "@mui/x-data-grid";
import { JSXElementConstructor } from "react";

const mockCurrenciesData = {
  baseCurrency: "EUR",
  comparisonDate: "2021-09-01",
  fx: [
    {
      id: 0,
      currency: "USD",
      precision: 2,
      nameI18N: "US Dollar",
      exchangeRate: { middle: 1.2 },
    },
    {
      id: 1,
      currency: "JPY",
      precision: 0,
      nameI18N: "Japanese Yen",
      exchangeRate: { middle: 130.0 },
    },
  ],
  institute: 100,
  lastUpdated: "2021-09-01T10:00:00Z",
};

const tableColumnsDef: GridColDef[] = [
  {
    headerName: "Flag",
    field: "flag",
    filterable: false,
    flex: 1,
    renderCell: (params: { value?: string }) => (
      <img src={params.value} alt='flag' height='20px' />
    ),
  },
  { headerName: "Country", field: "name", flex: 1 },
  { headerName: "Currency", field: "currency", flex: 1 },
  { headerName: "Exchange Rate", field: "rate", flex: 1 },
];

describe("custom table toolbar is rendered properly", () => {
  render(
    <DataGrid
      columns={tableColumnsDef}
      rows={mockCurrenciesData.fx}
      slots={{
        toolbar: CustomGridToolbar as
          | JSXElementConstructor<GridToolbarProps & ToolbarPropsOverrides>
          | null
          | undefined,
      }}
      data-testid='currencies-table|table'
    />,
  );
  it("renders toolbar", () => {
    const toolbar = screen.getByTestId("custom-toolbar");
    expect(toolbar).toBeInTheDocument();
  });
});
