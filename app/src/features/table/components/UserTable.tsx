import {
  useState,
  useEffect,
  useMemo,
} from 'react';

import dayjs from 'dayjs';

import {
  type MRT_ColumnDef,
  useMaterialReactTable,
  MaterialReactTable,
  MRT_ColumnFiltersState,
} from 'material-react-table';

import { FilterFn } from '@tanstack/table-core/build/lib/features/Filters';

import dateFilter from '../filters/dateFilter';
import CustomDatePicker from './CustomDatePicker';


interface User {
  name: string;
  age: number;
  birthday: string;
}


const makeData = (count: number) => {
  const data: User[] = [];
  for (let i = 0; i < count; i++) {
    const rdmName = ['田中', '佐藤', '鈴木', '高橋'][Math.floor(Math.random() * 4)];
    const rdmAge = Math.floor(Math.random() * 100);
    const rdmBirthday = dayjs().year(2024).month(Math.floor(Math.random() * 12)).date(Math.floor(Math.random() * 28) + 1);
    data.push({
      name: rdmName,
      age: rdmAge,
      birthday: rdmBirthday.format('YYYY/MM/DD'),
    });
  }
  return data;
}

export const UserTable = () => {
  const columns = useMemo<MRT_ColumnDef<User>[]>(
    () => [
      {
        accessorKey: 'name',
        header: '名前',
        minSize: 75,
        maxSize: 150,
        size: 100,
        enableSorting: false, // ソートを無効
        enableColumnActions: false, // : のカラムアクションを無効
        enableColumnFilter: false, // カラムのフィルター表示を無効
      },
      {
        accessorKey: 'age',
        header: '年齢',
        minSize: 75,
        maxSize: 150,
        size: 100,
        enableSorting: false, // ソートを無効
        enableColumnActions: false, // : のカラムアクションを無効
        enableColumnFilter: false, // カラムのフィルター表示を無効
      },
      {
        accessorKey: 'birthday',
        header: '誕生日',
        minSize: 75,
        maxSize: 400,
        size: 125,
        enableSorting: false, // ソートを無効
        enableColumnActions: false, // : のカラムアクションを無効
        enableColumnFilter: false, // カラムのフィルター表示を無効
        filterFn: 'dateFilter',
      },
    ],
    [],
  );
  const [data, setData] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setData(makeData(10));
      setIsLoading(false);
    }
  }, []);
  const [columnFilters, setColumnFilters] = useState<MRT_ColumnFiltersState>([])
  const [globalFilter, setGlobalFilter] = useState('')
  
  const table = useMaterialReactTable({
    columns,
    data,
    initialState: {
      showColumnFilters: true,
      showGlobalFilter: true,
    },
    enableColumnResizing: true, // 列幅変更
    enableColumnFilters: true, // 列フィルター
    enableRowSelection: false, // 行のチェックボックス
    enableFilterMatchHighlighting: false, // フィルターのハイライト
    enableColumnFilterModes: true, // 列フィルターモード
    enableColumnDragging: false, // 列ドラッグ
    enableColumnOrdering: false, // 列並び替え
    enableColumnPinning: true, // 列固定
    enableColumnActions: false, // 列アクション
    filterFns: {
      // 日付のフィルター処理
      'dateFilter': dateFilter as FilterFn<any>,
    },
    state: {
      columnFilters,
      globalFilter,
      isLoading
    },
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
  });
  const header = table.getHeaderGroups()[0]
  const birthdayColumn = header.headers[2].column  // 誕生日カラム

  const [startDateFilterValue, setStartDateFilterValue] = useState<string | null>(dayjs().year(2024).month(0).date(1).format("YYYY/MM/DD"));
  const [endDateFilterValue, setEndDateFilterValue] = useState<string | null>(dayjs().year(2024).month(1).date(-1).format("YYYY/MM/DD"));

  return (
    <div className="flex flex-col justify-center items-center w-full min-h-screen">
      <CustomDatePicker
        value={dayjs(startDateFilterValue).format("YYYY-MM-DD") ?? ''}
        onChange={(value: string) => {
          birthdayColumn.setFilterValue((old: [string, string, string, string]) => [value, old?.[1], old?.[2], old?.[3]])
          setStartDateFilterValue(value);
        }}
        label="開始日"
        className="w-40"
      />
      <CustomDatePicker
        value={dayjs(endDateFilterValue).format("YYYY-MM-DD") ?? ''}
        onChange={(value: string) => {
          birthdayColumn.setFilterValue((old: [string, string, string, string]) => [old?.[0], old?.[1], value, old?.[3]])
          setEndDateFilterValue(value);
        }}
        label="終了日"
        className="w-40"
      />
      <div className="w-5/6">
        <MaterialReactTable table={table} />
      </div>
    </div>
  );
};