import './App.css';
import Sidebar from './Components/Sidebar/sidebar';
import Dashboard from './Pages/Dashboard/dashboard';
import Home from './Pages/Home/home';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Member from './Pages/Member/member';

function App() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    let isLoggedIn = sessionStorage.getItem("isLogin");
    if (isLoggedIn) {
      setIsLogin(true);
      navigate('/dashboard');
    } 
    else {
      setIsLogin(false);
      navigate('/');
    }
  }, [sessionStorage.getItem("isLogin")]); 

  return (
    <div className="flex">
      {
        isLogin && <Sidebar />
      }

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/member' element={<Member />} />
      </Routes>
    </div>
  );
}

export default App;
