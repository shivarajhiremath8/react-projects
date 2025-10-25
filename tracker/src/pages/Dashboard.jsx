import {
    ArcElement,
    CategoryScale,
    Chart as ChartJS,
    Legend,
    LinearScale,
    LineElement,
    PointElement,
    Title,
    Tooltip,
} from 'chart.js';
import { format } from 'date-fns';
import { useEffect, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { DEFAULT_CATEGORIES } from '../constants';
import { getDashboardStats } from '../services/storage';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    ArcElement,
    Tooltip,
    Legend
);

function Dashboard() {
    const [stats, setStats] = useState(null);

    useEffect(() => {
        const loadStats = () => {
            const data = getDashboardStats();
            setStats(data);
        };
        loadStats();
        // Reload stats every minute
        const interval = setInterval(loadStats, 60000);
        return () => clearInterval(interval);
    }, []);

    if (!stats) {
    return (
        <div className="flex items-center justify-center h-64">
            <p className="text-gray-500">Loading...</p>
        </div>
    );
}

    return (
        <div className="space-y-6">
            {/* Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                <div className="bg-white rounded-lg shadow-sm p-6">
                    <h3 className="text-base sm:text-lg font-medium text-gray-900">Total Income</h3>
                    <p className="text-2xl sm:text-3xl font-bold text-green-600 mt-2">
                        ₹ {stats.totalIncome.toLocaleString('en-IN')}
                    </p>
                </div>
                <div className="bg-white rounded-lg shadow-sm p-6">
                    <h3 className="text-base sm:text-lg font-medium text-gray-900">Total Expenses</h3>
                    <p className="text-2xl sm:text-3xl font-bold text-red-600 mt-2">
                        ₹ {stats.totalExpenses.toLocaleString('en-IN')}
                    </p>
                </div>
                <div className="bg-white rounded-lg shadow-sm p-6 sm:col-span-2 lg:col-span-1">
                    <h3 className="text-base sm:text-lg font-medium text-gray-900">Current Balance</h3>
                    <p className="text-2xl sm:text-3xl font-bold text-primary-600 mt-2">
                        ₹ {stats.balance.toLocaleString('en-IN')}
                    </p>
                </div>
            </div>            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-lg shadow-sm p-6">
                    <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-4">
                        Expenses by Category
                    </h3>
                    <div className="h-64 sm:h-72">
                        <Doughnut
                            data={{
                                labels: stats.expensesByCategory.map(
                                    c => DEFAULT_CATEGORIES.find(cat => cat.id === c.categoryId)?.name || c.categoryId
                                ),
                                datasets: [
                                    {
                                        data: stats.expensesByCategory.map(c => c.total),
                                        backgroundColor: stats.expensesByCategory.map(
                                            c => DEFAULT_CATEGORIES.find(cat => cat.id === c.categoryId)?.color || '#6B7280'
                                        ),
                                    },
                                ],
                            }}
                            options={{
                                responsive: true,
                                maintainAspectRatio: false,
                                plugins: {
                                    legend: {
                                        position: 'bottom',
                                        labels: {
                                            boxWidth: 12,
                                            padding: 15,
                                        },
                                    },
                                },
                            }}
                        />
                    </div>
                </div>
            </div>

            {/* Recent Transactions */}
            <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-4">
                    Recent Transactions
                </h3>
                <div className="overflow-x-auto -mx-6">
                    <div className="inline-block min-w-full align-middle">
                        <table className="min-w-full">
                            <thead>
                                <tr className="text-left text-sm sm:text-base">
                                    <th className="py-3 px-6">Date</th>
                                    <th className="py-3 px-6">Description</th>
                                    <th className="py-3 px-6">Category</th>
                                    <th className="py-3 px-6">Amount</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {stats.recentTransactions.map(transaction => (
                                    <tr key={transaction.id} className="text-sm sm:text-base">
                                        <td className="py-3 px-6 whitespace-nowrap">
                                            {format(new Date(transaction.date), 'MMM d, yyyy')}
                                        </td>
                                        <td className="py-3 px-6">{transaction.description}</td>
                                        <td className="py-3 px-6">{transaction.category.name}</td>
                                        <td className="py-3 px-6 whitespace-nowrap">
                                            <span
                                                className={
                                                    transaction.type === 'expense'
                                                        ? 'text-red-600'
                                                        : 'text-green-600'
                                                }
                                            >
                                                ₹ {transaction.amount.toLocaleString('en-IN')}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;