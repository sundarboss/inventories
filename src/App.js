import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import Menubar from './components/Menubar';
import Home from './pages/Home';
import Types from './pages/Types';
import Random from './pages/Random';

function App() {
  return (
    <div className="App">
      <Router>
        <Menubar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/types" element={<Types />} />
          <Route path="/type/:category" element={<Random />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
