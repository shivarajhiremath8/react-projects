import { PlusIcon } from '@heroicons/react/24/outline';

const Navbar = () => {
    return (
        <nav className="h-16 border-b border-gray-200 bg-white px-4">
            <div className="h-full flex items-center justify-between">
                <div className="flex items-center">
                    <span className="text-lg font-medium">Welcome back!</span>
                </div>
                <button
                    className="btn btn-primary flex items-center"
                    onClick={() => alert('Add transaction functionality coming soon!')}
                >
                    <PlusIcon className="w-5 h-5 mr-2" />
                    Add Transaction
                </button>
            </div>
        </nav>
    );
};

export default Navbar;