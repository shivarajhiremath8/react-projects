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
import { getDashboardStats } from '../services/storage';
import { DashboardStats } from '../types';

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

const Dashboard = () => {
    const [stats, setStats] = useState<DashboardStats | null>(null);

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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="card">
                    <h3 className="text-lg font-medium text-gray-900">Total Income</h3>
                    <p className="text-3xl font-bold text-green-600">
                        ₹ {stats.totalIncome.toLocaleString('en-IN')}
                    </p>
                </div>
                <div className="card">
                    <h3 className="text-lg font-medium text-gray-900">Total Expenses</h3>
                    <p className="text-3xl font-bold text-red-600">
                        ₹ {stats.totalExpenses.toLocaleString('en-IN')}
                    </p>
                </div>
                <div className="card">
                    <h3 className="text-lg font-medium text-gray-900">Current Balance</h3>
                    <p className="text-3xl font-bold text-primary-600">
                        ₹ {stats.balance.toLocaleString('en-IN')}
                    </p>
                </div>
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="card">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">
                        Expenses by Category
                    </h3>
                    <div className="h-64">
                        <Doughnut
                            data={{
                                labels: stats.expensesByCategory.map(c => c.categoryId),
                                datasets: [
                                    {
                                        data: stats.expensesByCategory.map(c => c.total),
                                        backgroundColor: [
                                            '#EF4444',
                                            '#F59E0B',
                                            '#10B981',
                                            '#3B82F6',
                                            '#8B5CF6',
                                            '#EC4899',
                                        ],
                                    },
                                ],
                            }}
                            options={{
                                responsive: true,
                                maintainAspectRatio: false,
                            }}
                        />
                    </div>
                </div>
            </div>

            {/* Recent Transactions */}
            <div className="card">
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                    Recent Transactions
                </h3>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="text-left">
                                <th className="pb-4">Date</th>
                                <th className="pb-4">Description</th>
                                <th className="pb-4">Category</th>
                                <th className="pb-4">Amount</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {stats.recentTransactions.map(transaction => (
                                <tr key={transaction.id}>
                                    <td className="py-4">
                                        {format(new Date(transaction.date), 'MMM d, yyyy')}
                                    </td>
                                    <td className="py-4">{transaction.description}</td>
                                    <td className="py-4">{transaction.category.name}</td>
                                    <td className="py-4">
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
    );
};

export default Dashboard;