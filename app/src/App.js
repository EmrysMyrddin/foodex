import './App.css';
import Header from './components/header/Header';
import Navigation from './components/navigation/Navigation';
import './components/Theme/foodex-colors.css';
import IntlProvider from './translation/IntlProvider';

function App() {
  return (
    <IntlProvider>
      <div className="app">
        <header className="app-header">
          <Header />
        </header>
        <p>Coucou !!</p>
        <Navigation/>
      </div>
    </IntlProvider>
  );
}

export default App;
