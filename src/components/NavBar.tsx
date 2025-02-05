import logo from '../assets/img/logo.png';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';

const NavBar = () => {
    const navigate = useNavigate();
    const logout = () => {
        window.localStorage.setItem('token', '');
        toast.warning('Sesión cerrada')
        return navigate('/');
      }

  return (
    <div>
         <nav className='flex p-7 justify-between items-center bg-blue-900 rounded-b-4xl h-32'>
            <Link to={'/employees'}><img src={logo} alt="LogoSCM" className='rounded-4xl' width={250}/></Link>
            <div className='flex w-1/5 justify-between'>
              <Link to={'/add_employee'}><button>Agregar Empleado</button></Link>
              <button onClick={logout}>Cerrar Sesión</button>
            </div>
        </nav>
    </div>
  )
}

export default NavBar