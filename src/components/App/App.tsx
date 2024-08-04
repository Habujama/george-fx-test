import { ReactComponent as Logo } from "../../assets/logo.svg";
import "./App.css";
import CurrenciesTable from "../CurrenciesTable/CurrenciesTable";

function App() {
  return (
    <div className='App'>
      <header className='App-header'>
        <Logo width='220px' height='100%' className='App-logo' />
      </header>
      <div className='App-wrapper'>
        <CurrenciesTable />
      </div>
    </div>
  );
}

export default App;
