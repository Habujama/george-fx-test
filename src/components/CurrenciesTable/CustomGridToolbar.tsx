import {
  GridToolbarContainer,
  GridToolbarContainerProps,
  GridToolbarQuickFilter,
} from "@mui/x-data-grid";
import { Dispatch, SetStateAction } from "react";

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
    <GridToolbarContainer {...props} className='toolbar'>
      <GridToolbarQuickFilter
        value={quickFilterValue}
        onChange={(event) => setQuickFilterValue(event.target.value)}
        debounceMs={2000}
      />
    </GridToolbarContainer>
  );
};

export default CustomGridToolbar;
