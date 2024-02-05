import { useRoutes } from 'react-router-dom';
import { TableRoute } from '../features/table/routes/TableRoute';

export const AppRoutes = () => {
  const commonRoutes = [{ path: '/*', element: <TableRoute /> }];
  const element = useRoutes([
    ...commonRoutes,
  ]);

  return <>{element}</>;
};
