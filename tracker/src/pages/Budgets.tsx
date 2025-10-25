import { TrashIcon } from '@heroicons/react/24/outline';
import { useEffect, useState } from 'react';
import { deleteBudget, getBudgetProgress, getBudgets } from '../services/storage';
import { Budget } from '../types';

const Budgets = () => {
    const [budgets, setBudgets] = useState<Budget[]>([]);

    useEffect(() => {
        const loadBudgets = () => {
            const data = getBudgets();
            setBudgets(data);
        };
        loadBudgets();
    }, []);

    const handleDelete = (id: string) => {
        deleteBudget(id);
        setBudgets(prev => prev.filter(b => b.id !== id));
    };

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Budget Tracking</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {budgets.map(budget => {
                    const progress = getBudgetProgress(budget);
                    return (
                        <div key={budget.id} className="card">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-lg font-medium text-gray-900">
                                    {budget.categoryId}
                                </h3>
                                <button
                                    onClick={() => handleDelete(budget.id)}
                                    className="text-red-600 hover:text-red-800"
                                    title="Delete budget"
                                >
                                    <TrashIcon className="w-5 h-5" />
                                </button>
                            </div>
                            <div className="mb-2">
                                <div className="flex justify-between text-sm text-gray-600 mb-1">
                                    <span>Progress</span>
                                    <span>{Math.round(progress)}%</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                    <div
                                        className={`h-2 rounded-full ${progress > 100
                                                ? 'bg-red-600'
                                                : progress > 80
                                                    ? 'bg-yellow-500'
                                                    : 'bg-green-500'
                                            }`}
                                        style={{ width: `${Math.min(progress, 100)}%` }}
                                    ></div>
                                </div>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-600">Spent</span>
                                <span className="font-medium">
                                    ₹{((progress / 100) * budget.amount).toLocaleString('en-IN')} / ₹
                                    {budget.amount.toLocaleString('en-IN')}
                                </span>
                            </div>
                            <div className="mt-2 text-sm text-gray-600">
                                {budget.period.charAt(0).toUpperCase() + budget.period.slice(1)}{' '}
                                budget
                            </div>
                        </div>
                    );
                })}
                {budgets.length === 0 && (
                    <div className="col-span-2 card text-center text-gray-500">
                        No budgets set. Create one to start tracking your spending.
                    </div>
                )}
            </div>
        </div>
    );
};

export default Budgets;