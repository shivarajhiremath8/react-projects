import { TrashIcon } from '@heroicons/react/24/outline';
import { format } from 'date-fns';
import { useEffect, useState } from 'react';
import { deleteTransaction, getTransactions } from '../services/storage';
import { Transaction } from '../types';

const Transactions = () => {
    const [transactions, setTransactions] = useState<Transaction[]>([]);

    useEffect(() => {
        const loadTransactions = () => {
            const data = getTransactions();
            setTransactions(data);
        };
        loadTransactions();
    }, []);

    const handleDelete = (id: string) => {
        deleteTransaction(id);
        setTransactions(prev => prev.filter(t => t.id !== id));
    };

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Transactions</h2>

            <div className="card">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="text-left">
                                <th className="pb-4">Date</th>
                                <th className="pb-4">Description</th>
                                <th className="pb-4">Category</th>
                                <th className="pb-4">Amount</th>
                                <th className="pb-4">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {transactions.map(transaction => (
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
                                        <button
                                            onClick={() => handleDelete(transaction.id)}
                                            className="text-red-600 hover:text-red-800"
                                            title="Delete transaction"
                                        >
                                            <TrashIcon className="w-5 h-5" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            {transactions.length === 0 && (
                                <tr>
                                    <td colSpan={5} className="py-4 text-center text-gray-500">
                                        No transactions found
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Transactions;