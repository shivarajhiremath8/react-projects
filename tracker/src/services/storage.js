const STORAGE_KEY = 'expense-tracker-data';

const getStorageData = () => {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) {
        return { transactions: [], budgets: [], categories: [] };
    }
    return JSON.parse(data);
};

const saveStorageData = (data) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};

export const addTransaction = (transaction) => {
    const data = getStorageData();
    const newTransaction = {
        ...transaction,
        id: crypto.randomUUID(),
    };
    data.transactions.push(newTransaction);
    saveStorageData(data);
    return newTransaction;
};

export const getTransactions = () => {
    return getStorageData().transactions;
};

export const deleteTransaction = (id) => {
    const data = getStorageData();
    data.transactions = data.transactions.filter(t => t.id !== id);
    saveStorageData(data);
};

export const updateTransaction = (id, transaction) => {
    const data = getStorageData();
    data.transactions = data.transactions.map(t =>
        t.id === id ? { ...t, ...transaction } : t
    );
    saveStorageData(data);
};

export const getDashboardStats = () => {
    const transactions = getTransactions();
    const totalExpenses = transactions
        .filter(t => t.type === 'expense')
        .reduce((sum, t) => sum + t.amount, 0);
    const totalIncome = transactions
        .filter(t => t.type === 'income')
        .reduce((sum, t) => sum + t.amount, 0);

    const expensesByCategory = transactions
        .filter(t => t.type === 'expense')
        .reduce((acc, t) => {
            const categoryId = t.category.id;
            const existing = acc.find(c => c.categoryId === categoryId);
            if (existing) {
                existing.total += t.amount;
            } else {
                acc.push({ categoryId, total: t.amount });
            }
            return acc;
        }, []);

    return {
        totalExpenses,
        totalIncome,
        balance: totalIncome - totalExpenses,
        expensesByCategory,
        recentTransactions: transactions.slice(-5).reverse(),
    };
};

export const addBudget = (budget) => {
    const data = getStorageData();
    const newBudget = {
        ...budget,
        id: crypto.randomUUID(),
    };
    data.budgets.push(newBudget);
    saveStorageData(data);
    return newBudget;
};

export const getBudgets = () => {
    return getStorageData().budgets;
};

export const deleteBudget = (id) => {
    const data = getStorageData();
    data.budgets = data.budgets.filter(b => b.id !== id);
    saveStorageData(data);
};

export const updateBudget = (id, budget) => {
    const data = getStorageData();
    data.budgets = data.budgets.map(b =>
        b.id === id ? { ...b, ...budget } : b
    );
    saveStorageData(data);
};

export const getBudgetProgress = (budget) => {
    const transactions = getTransactions();
    const now = new Date();
    const startOfPeriod = budget.period === 'monthly'
        ? new Date(now.getFullYear(), now.getMonth(), 1)
        : new Date(now.setDate(now.getDate() - now.getDay()));

    const total = transactions
        .filter(t =>
            t.type === 'expense' &&
            t.category.id === budget.categoryId &&
            new Date(t.date) >= startOfPeriod
        )
        .reduce((sum, t) => sum + t.amount, 0);

    return total / budget.amount * 100;
};