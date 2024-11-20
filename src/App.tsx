import { ErrorBoundary } from 'react-error-boundary';
import { useEffect,useState } from'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Loading from '@components/Loading';
import { getToken } from './api/config';
import ErrorPage from '@components/ErrorPage';

function App() {
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  useEffect(() => {
    Object.defineProperty(window, 'ajaxStatus', {
      // getter 方法
      get: function () {
        return this._ajaxStatus; // 返回真实值
      },
      // setter 方法
      set: function (value) {
        this._ajaxStatus = value; // 设置真实值
        setLoading(value !== 'resolved');
      },
    });
  }, []);

  useEffect(() => {
    const pathname = location.pathname;
    if (pathname === '/') {
      navigate('/login');
      return;
    } 
    const token = getToken();
    if (!token) navigate(`/login?goto=${encodeURIComponent(location.pathname)}`);

  }, [navigate]);
  return (
    <ErrorBoundary fallback={<ErrorPage/>}>
      {loading && <Loading/>}
      <Outlet/>
    </ErrorBoundary>
  )
}

export default App


