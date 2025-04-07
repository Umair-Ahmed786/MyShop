import './App.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Navbar from './components/Navbar';
// import AlertProvider from './context/alert/AlertContext'; // Import AlertProvider
import Alert_component from './components/Alert'; // Import Alert Component
import About from './components/About';
import Sales from './components/Sales';
import Items from './components/Items';


import { SalesProvider } from './context/sales/SalesContext';
import { ItemsProvider } from './context/Items/ItemsContext';
import {AlertProvider} from './context/alert/AlertContext';


import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import MonthlySales from './components/MonthlySales';
// import Login from './components/Login';
// import Signup from './components/Signup';

function App() {
  return (
    <>
      <AlertProvider>
        <ItemsProvider>
        <SalesProvider>
          <Router>
            {/* Navbar should be inside Router for links to work */}
            <Navbar />
            <Alert_component />
            <div className="container">


              <Routes>
                <Route exact path="/" element={<Items />} />
                {/* <Route exact path="/about" element={<About />} /> */}
                <Route exact path="/sales" element={<Sales />} />
                <Route exact path="/items" element={<Items />} />
                <Route exact path="/monthlysales" element={<MonthlySales />} />
              </Routes>

            </div>
          </Router>

          </SalesProvider>
        </ItemsProvider>
      </AlertProvider>
    </>
  );
}

export default App;
