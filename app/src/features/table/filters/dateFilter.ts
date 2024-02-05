import { MRT_FilterFn } from "material-react-table";

const dateFilter: MRT_FilterFn<any> = (
  row,
  columnId,
  filterValue,
) => {
  const rowValueDate: Date = row.getValue(columnId);

  const filterStartDate = filterValue[0];
  const filterEndDate = filterValue[2];

  if (filterStartDate && filterEndDate) {
    // 期間の開始・終了が指定されている場合
    const isValid = rowValueDate >= filterStartDate && rowValueDate <= filterEndDate;
    return isValid;
  } else if (filterStartDate && !filterEndDate) {
    // 期間の開始が指定されている場合
    const isValid = rowValueDate >= filterStartDate;
    return isValid;
  } else if (!filterStartDate && filterEndDate) {
    // 期間の終了が指定されている場合
    const isValid = rowValueDate <= filterEndDate;
    return isValid;
  } else {
    // 期間が指定されていない場合
    return true;
  }
}

export default dateFilter;