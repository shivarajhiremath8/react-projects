import { useState } from 'react';
import { DEFAULT_CATEGORIES } from '../types';

const Settings = () => {
    const [exportUrl, setExportUrl] = useState<string | null>(null);

    const handleExport = () => {
        const data = localStorage.getItem('expense-tracker-data');
        const blob = new Blob([data || '{}'], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        setExportUrl(url);
    };

    const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const data = e.target?.result;
                if (typeof data === 'string') {
                    JSON.parse(data); // Validate JSON
                    localStorage.setItem('expense-tracker-data', data);
                    alert('Data imported successfully!');
                    window.location.reload();
                }
            } catch (error) {
                alert('Invalid file format. Please select a valid JSON file.');
            }
        };
        reader.readAsText(file);
    };

    const handleReset = () => {
        if (window.confirm('Are you sure you want to reset all data? This cannot be undone.')) {
            localStorage.setItem('expense-tracker-data', JSON.stringify({
                transactions: [],
                budgets: [],
                categories: DEFAULT_CATEGORIES
            }));
            window.location.reload();
        }
    };

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Settings</h2>

            <div className="card">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Data Management</h3>

                <div className="space-y-4">
                    <div>
                        <button
                            onClick={handleExport}
                            className="btn btn-primary"
                        >
                            Export Data
                        </button>
                        {exportUrl && (
                            <a
                                href={exportUrl}
                                download="expense-tracker-data.json"
                                className="ml-4 text-primary-600 hover:text-primary-700"
                            >
                                Download File
                            </a>
                        )}
                    </div>

                    <div>
                        <label className="block mb-2">Import Data</label>
                        <input
                            type="file"
                            accept=".json"
                            onChange={handleImport}
                            className="block w-full text-sm text-gray-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-lg file:border-0
                file:text-sm file:font-semibold
                file:bg-primary-50 file:text-primary-700
                hover:file:bg-primary-100"
                        />
                    </div>

                    <div className="pt-4 border-t border-gray-200">
                        <button
                            onClick={handleReset}
                            className="btn bg-red-600 text-white hover:bg-red-700"
                        >
                            Reset All Data
                        </button>
                        <p className="mt-2 text-sm text-gray-500">
                            Warning: This will delete all your transactions and budgets.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Settings;