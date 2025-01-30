import './styles/App.css';
import AppPage from './containers/AppPage/AppPage'
import Header from './containers/Header/Header'


const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <Header />
      </header>
      <AppPage />
    </div>
  );
}

export default App;
