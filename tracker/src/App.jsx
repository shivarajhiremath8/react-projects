import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';

function App() {
    return (
        <div className="min-h-screen bg-gray-50 md:flex">
            <Sidebar />
            <div className="flex-1 flex flex-col min-h-screen">
                <Navbar />
                <main className="flex-1 overflow-y-auto p-4">
                    <div className="container mx-auto px-4 sm:px-6 md:px-8">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    );
}

export default App;