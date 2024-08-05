import { ReactComponent as Logo } from "../../assets/logo.svg";
import "./App.css";
import CurrenciesTable from "../CurrenciesTable/CurrenciesTable";

function App() {
  return (
    <div className='App'>
      <header className='App-header' data-testid='app-header'>
        <Logo
          width='220px'
          height='100%'
          className='App-logo'
          data-testid='app-logo'
        />
      </header>
      <div className='App-wrapper' data-testid='app-content-wrapper'>
        <CurrenciesTable />
      </div>
    </div>
  );
}

export default App;
