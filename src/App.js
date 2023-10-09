import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route,  Routes} from 'react-router-dom';
import RegisterPage from './page/Register';
import Login from './page/Login';
import Home from './page/Home';

function App() {
  return (
    <Router>  
      <div className='main'>
    <Routes>
    <Route path='/' exact element={<Home/>}></Route>
    <Route path='/register' exact element={<RegisterPage/>}/>
    <Route path='/login' exact element={<Login/>}></Route>
    </Routes>
    </div>
    </Router>
  );
}

export default App;
