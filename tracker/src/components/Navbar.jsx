import { PlusIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import { DEFAULT_CATEGORIES } from '../constants';
import { addTransaction } from '../services/storage';

function Navbar() {
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        description: '',
        amount: '',
        type: 'expense',
        category: DEFAULT_CATEGORIES[0].id,
        date: new Date().toISOString().split('T')[0]
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        const transaction = {
            ...formData,
            amount: parseFloat(formData.amount),
            category: DEFAULT_CATEGORIES.find(c => c.id === formData.category),
            date: new Date(formData.date).toISOString()
        };
        addTransaction(transaction);
        setShowForm(false);
        setFormData({
            description: '',
            amount: '',
            type: 'expense',
            category: DEFAULT_CATEGORIES[0].id,
            date: new Date().toISOString().split('T')[0]
        });
        window.location.reload(); // Refresh to show new transaction
    };

    return (
        <nav className="h-16 border-b border-gray-200 bg-white px-4">
            <div className="h-full flex items-center justify-between">
                <div className="flex items-center">
                    <span className="text-lg font-medium">Welcome back!</span>
                </div>
                <button
                    className="btn btn-primary flex items-center"
                    onClick={() => setShowForm(true)}
                >
                    <PlusIcon className="w-5 h-5 mr-2" />
                    Add Transaction
                </button>
            </div>

            {showForm && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-lg p-6 w-full max-w-md">
                        <h2 className="text-xl font-bold mb-4">Add Transaction</h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Description</label>
                                <input
                                    type="text"
                                    required
                                    className="input"
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Amount</label>
                                <input
                                    type="number"
                                    required
                                    min="0"
                                    step="0.01"
                                    className="input"
                                    value={formData.amount}
                                    onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Type</label>
                                <select
                                    className="input"
                                    value={formData.type}
                                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                                >
                                    <option value="expense">Expense</option>
                                    <option value="income">Income</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Category</label>
                                <select
                                    className="input"
                                    value={formData.category}
                                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                >
                                    {DEFAULT_CATEGORIES.filter(c =>
                                        formData.type === 'income' ? c.id === 'income' : c.id !== 'income'
                                    ).map(category => (
                                        <option key={category.id} value={category.id}>
                                            {category.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Date</label>
                                <input
                                    type="date"
                                    required
                                    className="input"
                                    value={formData.date}
                                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                />
                            </div>
                            <div className="flex justify-end space-x-3">
                                <button
                                    type="button"
                                    className="btn bg-gray-100 text-gray-700 hover:bg-gray-200"
                                    onClick={() => setShowForm(false)}
                                >
                                    Cancel
                                </button>
                                <button type="submit" className="btn btn-primary">
                                    Add Transaction
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </nav>
    );
}

export default Navbar;