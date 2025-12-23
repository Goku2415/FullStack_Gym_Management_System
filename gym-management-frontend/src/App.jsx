import './App.css';
import Sidebar from './Components/Sidebar/sidebar';
import Dashboard from './Pages/Dashboard/dashboard';
import Home from './Pages/Home/home';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Member from './Pages/Member/member';
import GeneralUser from './Pages/GeneralUser/generalUser';
import MembersDetails from './Pages/memberDetail/memberDetail';

function App() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    let isLoggedIn = sessionStorage.getItem("isLogin");
    if (isLoggedIn) {
      setIsLogin(true);
      // navigate('/dashboard');
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
        <Route path='/specific/:page' element={<GeneralUser />} />
        {/* specific/:page is a dynamic routing for the routes that means after the specific/ the routes will be set during the run time, that is when a section will be clicked then only full route will be selected. eg: when clicked on monthly joined the full route will be specific/monthly joined..... */}
        <Route path='/member/:id' element={<MembersDetails />} />
      </Routes>
    </div>
  );
}

export default App;
