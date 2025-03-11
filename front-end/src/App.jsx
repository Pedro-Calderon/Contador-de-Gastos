import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './Views/HomePage';
import Gastos from './Views/Gastos';


function App() {
 return (
   <Router>
     <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/gastos" element={<Gastos />} />
      </Routes>
   </Router>
 )
}

export default App
