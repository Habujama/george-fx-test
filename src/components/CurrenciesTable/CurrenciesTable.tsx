import { JSXElementConstructor, useEffect, useMemo, useState } from "react";
import {
  DataGrid,
  GridColDef,
  GridToolbarProps,
  ToolbarPropsOverrides,
} from "@mui/x-data-grid";
import { useLocation, useNavigate } from "react-router-dom";
import queryString from "query-string";

import "./CurrenciesTable.css";

import fx from "../../assets/fx.json";
import NoRowsOverlay from "./NoRowsOverlay/NoRowsOverlay";
import SnackbarAlert from "../SnackbarAlert/SnackbarAlert";
import getFlag from "../../utils/getFlags/getFlags";
import CustomGridToolbar from "./CustomGridToolbar/CustomGridToolbar";
import getTableHeight from "../../utils/getTableHeight/getTableHeight";

interface fxProps {
  currency: string;
  precision: number;
  nameI18N?: string;
  exchangeRate?: {
    buy?: number;
    middle?: number;
    sell?: number;
    indicator?: number;
    lastModified?: string;
  };
  banknoteRate?: {
    buy?: number;
    middle?: number;
    sell?: number;
    indicator?: number;
    lastModified?: string;
  };
  flags?: string[];
  denominations?: number[];
}

interface CurrenciesDataProps {
  baseCurrency: string;
  comparisonDate: string;
  fx: Array<fxProps>;
  institute: number;
  lastUpdated: string;
}

const CurrenciesTable = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [errorSnackbarOpen, setErrorSnackBarOpen] = useState<boolean>(false);
  const [currenciesData, setCurrenciesData] = useState<
    CurrenciesDataProps | undefined
  >(undefined);
  const [quickFilterValue, setQuickFilterValue] = useState<
    string | (string | null)[]
  >("");
  const [pageSize, setPageSize] = useState<number>(10);

  const location = useLocation();
  const navigate = useNavigate();

  const loadCurrencies = async () => {
    try {
      const response = await fetch(
        "https://run.mocky.io/v3/c88db14a-3128-4fbd-af74-1371c5bb0343",
      );
      if (response.ok) {
        setErrorSnackBarOpen(false);
        const data = await response.json();
        setCurrenciesData(data);
      } else {
        setCurrenciesData(fx); // using mocked data because of the non-functioning endpoint
        setErrorSnackBarOpen(true);
      }
    } catch (error) {
      setCurrenciesData(fx);
      setErrorSnackBarOpen(true);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      await loadCurrencies();
      setIsLoading(false);
    };
    fetchData();
  }, []);

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

  const tableRowsData = useMemo(() => {
    if (currenciesData?.fx.length) {
      return currenciesData.fx.map((item, index) => {
        return {
          id: index,
          flag: getFlag(item.currency),
          name: item.nameI18N || "–",
          currency: item.currency,
          rate: item.exchangeRate?.middle
            ? `${item.exchangeRate?.middle} ${currenciesData.baseCurrency}`
            : "–", // Assuming middle exchange rate, fallback if not available
        };
      });
    } else {
      return [];
    }
  }, [currenciesData]);

  // Get search term from URL on mount
  useEffect(() => {
    const parsed = queryString.parse(location.search);
    setQuickFilterValue(parsed.search || "");
  }, [location.search]);

  // Update URL when search term changes
  useEffect(() => {
    if (!isLoading) {
      const params = new URLSearchParams(location.search);
      if (quickFilterValue && typeof quickFilterValue === "string") {
        params.set("search", quickFilterValue);
      } else {
        params.delete("search");
      }
      navigate({ search: params.toString() });
    }
  }, [quickFilterValue, isLoading, location.search, navigate]);

  // Filter rows based on quick filter value
  const filteredRows = useMemo(
    () =>
      !isLoading
        ? tableRowsData.filter((row) => {
            const searchValue =
              typeof quickFilterValue === "string"
                ? quickFilterValue.toLowerCase()
                : "";
            return Object.values(row).some((value) =>
              value?.toString().toLowerCase().includes(searchValue),
            );
          })
        : tableRowsData,
    [quickFilterValue, tableRowsData, isLoading],
  );

  return (
    <div
      className='table'
      style={{ height: getTableHeight(filteredRows, pageSize) }}
      data-testid='currencies-table'
    >
      <SnackbarAlert
        open={errorSnackbarOpen}
        setOpen={setErrorSnackBarOpen}
        data-testid='currencies-table|alert'
      />
      <DataGrid
        columns={tableColumnsDef}
        rows={filteredRows}
        loading={isLoading}
        slotProps={{
          loadingOverlay: {
            variant: "skeleton",
            noRowsVariant: "skeleton",
          },
          toolbar: {
            quickFilterValue,
            setQuickFilterValue,
          },
        }}
        initialState={{ pagination: { paginationModel: { pageSize: 10 } } }}
        pageSizeOptions={[10, 50, 100]}
        onPaginationModelChange={(model) => setPageSize(model.pageSize)}
        slots={{
          noRowsOverlay: NoRowsOverlay,
          noResultsOverlay: NoRowsOverlay,
          toolbar: CustomGridToolbar as
            | JSXElementConstructor<GridToolbarProps & ToolbarPropsOverrides>
            | null
            | undefined,
        }}
        data-testid='currencies-table|table'
      />
    </div>
  );
};

export default CurrenciesTable;
