import { Dispatch, SetStateAction } from "react";
import {
  GridToolbarContainer,
  GridToolbarContainerProps,
  GridToolbarQuickFilter,
} from "@mui/x-data-grid";

import "./CustomGridToolbar.css";

interface CustomGridToolbarProps extends GridToolbarContainerProps {
  quickFilterValue: string | (string | null)[];
  setQuickFilterValue: Dispatch<SetStateAction<string | (string | null)[]>>;
}

const CustomGridToolbar = ({
  quickFilterValue,
  setQuickFilterValue,
  ...props
}: CustomGridToolbarProps) => {
  return (
    <GridToolbarContainer
      {...props}
      className='toolbar'
      data-testid='custom-toolbar'
    >
      <GridToolbarQuickFilter
        value={quickFilterValue}
        onChange={(event) => setQuickFilterValue(event.target.value)}
        debounceMs={2000}
        inputProps={{
          "data-testid": "custom-toolbar|input",
        }}
      />
    </GridToolbarContainer>
  );
};

export default CustomGridToolbar;
