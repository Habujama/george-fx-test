import { useEffect, useMemo, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";

import "./CurrenciesTable.css";

import fx from "../../assets/fx.json";
import NoRowsOverlay from "../NoRowsOverlay/NoRowsOverlay";
import SnackbarAlert from "../SnackbarAlert/SnackbarAlert";

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
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorSnackbarOpen, setErrorSnackBarOpen] = useState<boolean>(false);
  const [currenciesData, setCurrenciesData] = useState<
    CurrenciesDataProps | undefined
  >(undefined);

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
        setCurrenciesData(fx);
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

  useEffect(() => {
    console.log("currenciesData:", JSON.stringify(currenciesData));
    console.log("isLoading:", isLoading);
  }, [currenciesData, isLoading]);

  const TableColumnsDef = [
    { headerName: "Flag", field: "flag", flex: 1 },
    { headerName: "Country", field: "name", flex: 1 },
    { headerName: "Currency", field: "currency", flex: 1 },
    { headerName: "Exchange Rate", field: "rate", flex: 1 },
  ];

  const TableRowsData = useMemo(() => {
    if (currenciesData?.fx.length) {
      return currenciesData.fx.map((item, index) => ({
        id: index,
        flag: item.flags,
        name: item.nameI18N,
        currency: item.currency,
        rate: item.exchangeRate?.middle || 0, // Assuming middle exchange rate, fallback to 0 if not available
      }));
    } else {
      return [];
    }
  }, [currenciesData]);

  return (
    <div className='table'>
      <SnackbarAlert open={errorSnackbarOpen} setOpen={setErrorSnackBarOpen} />
      <DataGrid
        columns={TableColumnsDef}
        rows={TableRowsData}
        loading={isLoading}
        slotProps={{
          loadingOverlay: {
            variant: "skeleton",
            noRowsVariant: "skeleton",
          },
        }}
        slots={{
          noRowsOverlay: NoRowsOverlay,
          noResultsOverlay: NoRowsOverlay,
        }}
        sx={{
          ".MuiDataGrid-cell:hover": {
            color: "primary.main",
          },
          ".MuiDataGrid-row:hover": {
            backgroundColor: "rgb(40,44,52)",
          },
          ".MuiDataGrid-footerContainer": {
            color: "#fff",
          },
        }}
      />
    </div>
  );
};

export default CurrenciesTable;
