import './App.css';
import Header from './components/header/Header';
import { Provider } from 'urql';
import Navigation from './components/navigation/Navigation';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import './Theme/foodex-colors.css';
import IntlProvider from './translation/IntlProvider';
import { client } from './data/client';
import Ingredients from './components/ingredients/Ingredients';
import { createBrowserHistory } from "history";
import Login from './components/login/Login';
import Ingredient from './components/ingredient/Ingredient';

function App() {
  const isAuthenticated = localStorage.token
  console.log('isAuthenticated : ', isAuthenticated)
  return (
    <Provider value={client}>
      <IntlProvider>
        <div className="app">
          <Router>
            <Switch>
              <Route path="/login">
                <Login />
              </Route>
              {!isAuthenticated && <Redirect to="/login"/>}
              <Route path="/">
                <Authenticated/>
              </Route>
              </Switch>
          </Router>
        </div>
      </IntlProvider>
    </Provider>
  );
}

function Authenticated() {
  return (
    <>
      <header className="app-header">
        <Header />
      </header>
      <Switch>
        <Route path="/ingredients/:id">
          <Ingredient />
        </Route>
        <Route path="/ingredients">
          <Ingredients />
        </Route>
        <Route path="/recipes">
        </Route>
      </Switch>
      <Navigation/>
    </>
  )
}

export default App;
