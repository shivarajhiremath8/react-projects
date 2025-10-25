import {
    ChartPieIcon,
    Cog6ToothIcon,
    HomeIcon,
    ListBulletIcon,
} from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';

const navItems = [
    { path: '/', label: 'Dashboard', icon: HomeIcon },
    { path: '/transactions', label: 'Transactions', icon: ListBulletIcon },
    { path: '/budgets', label: 'Budgets', icon: ChartPieIcon },
    { path: '/settings', label: 'Settings', icon: Cog6ToothIcon },
];

const Sidebar = () => {
    return (
        <aside className="w-64 bg-white border-r border-gray-200">
            <div className="h-full flex flex-col">
                <div className="flex items-center justify-center h-16 border-b border-gray-200">
                    <h1 className="text-xl font-bold text-primary-600">Expense Tracker</h1>
                </div>
                <nav className="flex-1 p-4 space-y-1">
                    {navItems.map(({ path, label, icon: Icon }) => (
                        <Link
                            key={path}
                            to={path}
                            className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
                        >
                            <Icon className="w-5 h-5 mr-3" />
                            <span>{label}</span>
                        </Link>
                    ))}
                </nav>
            </div>
        </aside>
    );
};

export default Sidebar;