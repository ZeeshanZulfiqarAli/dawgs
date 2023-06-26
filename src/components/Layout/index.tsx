import Header from '../Header';
import { Outlet } from 'react-router-dom';
import useNetworkIndicator from '../../hooks/useNetworkIndicator';

const Layout = () => {
  useNetworkIndicator();

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <Outlet />
    </div>
  );
};

export default Layout;
