import dayjs from "dayjs";
import { MRT_FilterFn } from "material-react-table";

const datetimeFilter: MRT_FilterFn<any> = (
  row,
  columnId,
  filterValue,
) => {
  const rowValueDate = dayjs(row.getValue(columnId));

  const filterStartDate = filterValue[0]; // 開始日
  const filterStartTime = filterValue[1]; // 開始時刻
  const filterEndDate = filterValue[2]; // 終了日
  const filterEndTime = filterValue[3]; // 終了時刻

  // datetimeに変換
  const filterStartDatetime = dayjs(`${filterStartDate} ${filterStartTime}`);
  const filterEndDatetime = dayjs(`${filterEndDate} ${filterEndTime}`);

  // unixtimeに変換
  const rowValueUnixtime = rowValueDate.unix();
  const filterStartUnixtime = filterStartDatetime.unix();
  const filterEndUnixtime = filterEndDatetime.unix();

  if(filterStartDatetime && filterStartTime && filterEndDate && filterEndTime) {
    // 期間の開始・終了が指定されている場合
    const isValid = rowValueUnixtime >= filterStartUnixtime && rowValueUnixtime <= filterEndUnixtime;
    return isValid;
  } else if (filterStartDatetime && filterStartTime && !filterEndDate && !filterEndTime) {
    // 期間の開始が指定されている場合
    const isValid = rowValueUnixtime >= filterStartUnixtime;
    return isValid;
  } else if (!filterStartDatetime && !filterStartTime && filterEndDate && filterEndTime) {
    // 期間の終了が指定されている場合
    const isValid = rowValueUnixtime <= filterEndUnixtime;
    return isValid;
  } else {
    // 期間が指定されていない場合
    return true;
  }
}

export default datetimeFilter;