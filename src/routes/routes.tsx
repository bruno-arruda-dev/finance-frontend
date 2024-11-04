import { Routes, Route } from 'react-router-dom';
import Home from '../App';
import Cashflow from '../pages/Cashflow';
import Environments from '../pages/auxiliary-records/Environments';
import Wallets from '../pages/auxiliary-records/Wallets';
import Dashboard from '../pages/Dashboard';
import User from '../pages/user/User';

const AppRoutes = () => (
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/cashflow" element={<Cashflow />} />
        <Route path="/auxiliary-records/environments" element={<Environments />} />
        <Route path="/auxiliary-records/wallets" element={<Wallets />} />
        <Route path="/user/data" element={<User />} />
    </Routes>
);

export default AppRoutes;
