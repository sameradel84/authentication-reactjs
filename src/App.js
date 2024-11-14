import Register from './componenets/Auth/Register';
import Login from './componenets/Auth/Login';
// import './App.css';
import {BrowserRouter as Router ,Routes,Route} from 'react-router-dom'
import Dashboard from './componenets/Dashboard';
import './styles.css';

function App() {
  return (
    
      <Router>
        <Routes>
          <Route path='/auth/login' element={ <Login/>} />
          <Route path='/auth/register' element={<Register />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path="*" element={<Login />} />
       
        </Routes>
      </Router>
   
   
  );
}

export default App;
