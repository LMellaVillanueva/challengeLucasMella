import './App.css'
import { Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import AddEmployee from './components/AddEmployee';
import GetEmployee from './components/GetEmployee';
import UpdateEmployee from './components/UpdateEmployee';
import Login from './components/Login';
import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Toaster } from 'sonner';
import NavBar from './components/NavBar';

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const token = window.localStorage.getItem('token');

  useEffect(() => {
    if (!token) {
      navigate('/');
    }
  }, [])

  return (
    <main>
      {location.pathname !== '/' && <NavBar/>}
      <Toaster position='top-center' toastOptions={{
        classNames: {title: 'text-[1.2rem]', icon: 'text-[1.5rem]'}
      }}/>
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/employees' element={<Home/>}/>
        <Route path='/add_employee' element={<AddEmployee/>}/>
        <Route path='/employee/:id' element={<GetEmployee/>}/>
        <Route path='/update_employee/:id' element={<UpdateEmployee/>}/>
      </Routes>
    </main>
  )
}

export default App;
