import { Routes, Route, Outlet } from 'react-router-dom';
import Home from '../App';
import Cashflow from '../pages/Cashflow';
import Environments from '../pages/auxiliary-records/Environments';
import Wallets from '../pages/auxiliary-records/Wallets';
import Dashboard from '../pages/Dashboard';
import User from '../pages/user/User';
import Header from '../components/Header';
import { UserProvider } from '../context/UserContext';

const Layout = () => (
    <UserProvider>
        <Header />
        <Outlet />
    </UserProvider>
);

const AppRoutes = () => (
    <Routes>
        <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="cashflow" element={<Cashflow />} />
            <Route path="auxiliary-records/environments" element={<Environments />} />
            <Route path="auxiliary-records/wallets" element={<Wallets />} />
            <Route path="user/data" element={<User />} />
        </Route>
    </Routes>
);

export default AppRoutes;
