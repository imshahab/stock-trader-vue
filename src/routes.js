import HomePage from "./components/HomePage.vue"
import PortfolioPage from "./components/portfolio/PortfolioPage.vue"
import StocksPage from "./components/stocks/StocksPage.vue"
import LoginPage from "./components/LoginPage.vue"
import RegisterPage from "./components/RegisterPage.vue"

export const routes = [
    {
        path: "/",
        name: "Home",
        component: HomePage,
        meta: { title: "Stock Trader" },
    },
    {
        path: "/login",
        name: "Login",
        component: LoginPage,
        meta: { title: "Stock Trader | Login", requiresGuest: true },
    },
    {
        path: "/register",
        name: "Register",
        component: RegisterPage,
        meta: { title: "Stock Trader | Register", requiresGuest: true },
    },
    {
        path: "/portfolio",
        name: "Portfolio",
        component: PortfolioPage,
        meta: { title: "Stock Trader | Portfolio", requiresAuth: true },
    },
    {
        path: "/stocks",
        name: "Stocks",
        component: StocksPage,
        meta: { title: "Stock Trader | Stocks", requiresAuth: true },
    },
]
