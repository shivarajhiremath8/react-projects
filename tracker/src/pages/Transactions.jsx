import { format } from 'date-fns';
import { useEffect, useState } from 'react';
import { deleteTransaction, getTransactions } from '../services/storage';

function Transactions() {
    const [transactions, setTransactions] = useState([]);
    const [filter, setFilter] = useState('all'); // all, income, expense

    useEffect(() => {
        loadTransactions();
    }, []);

    const loadTransactions = () => {
        const allTransactions = getTransactions();
        setTransactions(allTransactions);
    };

    const handleDelete = (id) => {
        deleteTransaction(id);
        loadTransactions();
    };

    const filteredTransactions = transactions.filter(transaction => {
        if (filter === 'all') return true;
        return transaction.type === filter;
    });

    return (
        <div className="space-y-6">
            <div className="card">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-lg font-medium text-gray-900">Transactions</h2>
                    <div className="flex space-x-2">
                        <button
                            className={`px-4 py-2 rounded-md ${filter === 'all'
                                    ? 'bg-primary-600 text-white'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                            onClick={() => setFilter('all')}
                        >
                            All
                        </button>
                        <button
                            className={`px-4 py-2 rounded-md ${filter === 'income'
                                    ? 'bg-primary-600 text-white'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                            onClick={() => setFilter('income')}
                        >
                            Income
                        </button>
                        <button
                            className={`px-4 py-2 rounded-md ${filter === 'expense'
                                    ? 'bg-primary-600 text-white'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                            onClick={() => setFilter('expense')}
                        >
                            Expenses
                        </button>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="text-left border-b border-gray-200">
                                <th className="pb-4">Date</th>
                                <th className="pb-4">Description</th>
                                <th className="pb-4">Category</th>
                                <th className="pb-4">Amount</th>
                                <th className="pb-4">Type</th>
                                <th className="pb-4">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {filteredTransactions.map(transaction => (
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
                                    <td className="py-4">
                                        <span
                                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${transaction.type === 'expense'
                                                    ? 'bg-red-100 text-red-800'
                                                    : 'bg-green-100 text-green-800'
                                                }`}
                                        >
                                            {transaction.type}
                                        </span>
                                    </td>
                                    <td className="py-4">
                                        <button
                                            onClick={() => handleDelete(transaction.id)}
                                            className="text-red-600 hover:text-red-900"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {filteredTransactions.length === 0 && (
                    <div className="text-center py-4 text-gray-500">
                        No transactions found
                    </div>
                )}
            </div>
        </div>
    );
}

export default Transactions;