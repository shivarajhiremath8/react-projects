function Settings() {
    return (
        <div className="space-y-6">
            <div className="card">
                <h2 className="text-lg font-medium text-gray-900 mb-4">Settings</h2>

                {/* Profile Settings */}
                <div className="mb-6">
                    <h3 className="text-md font-medium text-gray-700 mb-3">Profile</h3>
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                                placeholder="Your name"
                            />
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                                placeholder="your.email@example.com"
                            />
                        </div>
                    </div>
                </div>

                {/* Preferences */}
                <div className="mb-6">
                    <h3 className="text-md font-medium text-gray-700 mb-3">Preferences</h3>
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="currency" className="block text-sm font-medium text-gray-700">
                                Currency
                            </label>
                            <select
                                id="currency"
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                            >
                                <option value="INR">Indian Rupee (₹)</option>
                                <option value="USD">US Dollar ($)</option>
                                <option value="EUR">Euro (€)</option>
                                <option value="GBP">British Pound (£)</option>
                            </select>
                        </div>
                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                id="notifications"
                                className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                            />
                            <label htmlFor="notifications" className="ml-2 block text-sm text-gray-700">
                                Enable notifications
                            </label>
                        </div>
                    </div>
                </div>

                {/* Save Button */}
                <div className="flex justify-end">
                    <button
                        type="button"
                        className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                    >
                        Save Changes
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Settings;