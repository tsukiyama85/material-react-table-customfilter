import { Route, Routes } from 'react-router-dom';
import { TableRoute } from './TableRoute';

export const TableRoutes = () => {
  return (
    <Routes>
      <Route path="/*" element={<TableRoute />} />
    </Routes>
  );
};