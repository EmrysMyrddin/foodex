import './App.css';
import Header from './components/header/Header';
import { Provider } from 'urql';
import Navigation from './components/navigation/Navigation';
import { BrowserRouter as Router, Route, Outlet, Routes } from 'react-router-dom'
import './Theme/foodex-colors.css';
import IntlProvider from './translation/IntlProvider';
import { client } from './data/client';
import Ingredients from './components/ingredients/Ingredients';
import Login from './components/login/Login';
import Ingredient from './components/ingredient/Ingredient';
import "antd/dist/antd.css";

function App() {
  return (
    <Provider value={client}>
      <IntlProvider>
        <div className="app">
          <Router>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/" element={<Layout />} >
                <Route path="ingredients/:id" element={<Ingredient />} />
                <Route path="ingredients"  element={<Ingredients />}/>
              </Route>
            </Routes>
          </Router>
        </div>
      </IntlProvider>
    </Provider>
  );
}

function Layout() {
  return (
    <div>
      <header className="app-header">
        <Header />
      </header>
      <div>
        <Outlet />
      </div>
      <Navigation/>
    </div>
  )
}

export default App;
