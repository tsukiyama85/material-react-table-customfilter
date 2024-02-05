import * as React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import 'dayjs/locale/ja';


type AppProviderProps = {
  children: React.ReactNode;
};

export const AppProvider = ({ children }: AppProviderProps) => {
  return (
    <React.Suspense
      fallback={
        <div className="flex items-center justify-center w-screen h-screen">
        </div>
      }>
      <LocalizationProvider
        dateAdapter={AdapterDayjs}
        adapterLocale="ja-JP"
        dateFormats={{ monthAndYear: 'YYYY年 MM月' }}
        localeText={{
          previousMonth: '前月',
          nextMonth: '次月',
        }}
      >
      <Router>{children}</Router>
      </LocalizationProvider>
    </React.Suspense>
  );
};
