const getTableHeight = (filteredRows: string | any[], pageSize: number) => {
  const rowHeight = 52;
  const headerHeight = 56;
  const toolbarHeight = 44;
  const footerHeight = 53;
  const additionalHeight = headerHeight + toolbarHeight + footerHeight;
  return Math.min(filteredRows.length, pageSize) * rowHeight + additionalHeight;
};

export default getTableHeight;
