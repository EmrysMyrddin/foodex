import "./App.css"
import Header from "./components/header/Header"
import { Provider } from "urql"
import Navigation from "./components/navigation/Navigation"
import { BrowserRouter as Router, Route, Outlet, Routes, Navigate } from "react-router-dom"
import "./Theme/foodex-colors.css"
import IntlProvider from "./translation/IntlProvider"
import { client } from "./data/client"
import Ingredients from "./components/ingredients/Ingredients"
import Login from "./components/login/Login"
import Ingredient from "./components/ingredient/Ingredient"
import "antd/dist/antd.css"
import "./dist/output.css"
import Recipes from "./components/recipes/Recipes"
import Recipe from "./components/repice/Recipe"
import ShoppingLists from "./components/shopping-lists/ShoppingLists"
import ShoppingList from "./components/shopping-list/ShoppingList"
import Account from "./components/account/Account"

function App() {
  return (
    <Provider value={client}>
      <IntlProvider>
        <div className="app">
          <Router>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route
                path="/"
                element={localStorage.token ? <Navigate to="/recipes" replace /> : <Navigate to="/login" replace />}
              />
              <Route path="/" element={<Layout />}>
                <Route path="account" element={<Account />} />
                <Route path="ingredients/:id" element={<Ingredient />} />
                <Route path="ingredients" element={<Ingredients />} />
                <Route path="recipes/:id" element={<Recipe />} />
                <Route path="recipes" element={<Recipes />} />
                <Route path="shopping-lists/:id" element={<ShoppingList />} />
                <Route path="shopping-lists" element={<ShoppingLists />} />
              </Route>
            </Routes>
          </Router>
        </div>
      </IntlProvider>
    </Provider>
  )
}

function Layout() {
  return (
    <div>
      <header className="app-header">
        <Header />
      </header>
      <div className="app-body">
        <Outlet />
      </div>
      <Navigation />
    </div>
  )
}

export default App
