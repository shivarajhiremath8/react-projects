import {
    ChartPieIcon,
    Cog6ToothIcon,
    HomeIcon,
    ListBulletIcon,
    XMarkIcon,
} from '@heroicons/react/24/outline';
import { NavLink } from 'react-router-dom';
import { useState, useEffect } from 'react';

const navItems = [
    { path: '/', label: 'Dashboard', icon: HomeIcon },
    { path: '/transactions', label: 'Transactions', icon: ListBulletIcon },
    { path: '/budgets', label: 'Budgets', icon: ChartPieIcon },
    { path: '/settings', label: 'Settings', icon: Cog6ToothIcon },
];

function Sidebar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
            if (window.innerWidth >= 768) {
                setIsMobileMenuOpen(false);
            }
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const closeMobileMenu = () => {
        if (isMobile) {
            setIsMobileMenuOpen(false);
        }
    };

    return (
        <>
            {/* Mobile menu button */}
            {isMobile && (
                <button
                    className="fixed top-4 left-4 z-50 p-2 rounded-md bg-white shadow-md"
                    onClick={toggleMobileMenu}
                >
                    <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 6h16M4 12h16M4 18h16"
                        />
                    </svg>
                </button>
            )}

            {/* Sidebar */}
            <aside
                className={`${
                    isMobile
                        ? 'fixed inset-y-0 left-0 z-40 transform transition-transform duration-300 ease-in-out'
                        : 'relative'
                } ${
                    isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
                } w-64 bg-white border-r border-gray-200`}
            >
                <div className="h-full flex flex-col">
                    <div className="flex items-center justify-between h-16 border-b border-gray-200 px-4">
                        <h1 className="text-xl font-bold text-primary-600">Expense Tracker</h1>
                        {isMobile && (
                            <button
                                className="p-2 rounded-md hover:bg-gray-100"
                                onClick={toggleMobileMenu}
                            >
                                <XMarkIcon className="w-6 h-6" />
                            </button>
                        )}
                    </div>
                    <nav className="flex-1 p-4 space-y-1">
                    {navItems.map(({ path, label, icon: Icon }) => (
                        <NavLink
                            key={path}
                            to={path}
                            onClick={closeMobileMenu}
                            className={({ isActive }) =>
                                `flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg ${
                                    isActive ? 'bg-gray-100' : ''
                                }`
                            }
                        >
                            <Icon className="w-5 h-5 mr-3" />
                            <span>{label}</span>
                        </NavLink>
                    ))}
                </nav>
            </div>
        </aside>
        
        {/* Overlay */}
        {isMobile && isMobileMenuOpen && (
            <div
                className="fixed inset-0 bg-black bg-opacity-50 z-30"
                onClick={toggleMobileMenu}
            ></div>
        )}
        </>
    );
}

export default Sidebar;