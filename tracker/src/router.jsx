import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Budgets from "./pages/Budgets";
import Dashboard from "./pages/Dashboard";
import Settings from "./pages/Settings";
import Transactions from "./pages/Transactions";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                path: '/',
                element: <Dashboard />,
            },
            {
                path: '/transactions',
                element: <Transactions />,
            },
            {
                path: '/budgets',
                element: <Budgets />,
            },
            {
                path: '/settings',
                element: <Settings />,
            },
        ],
    },
]);