import React, { useEffect, useState } from 'react'
import axiosURL from '../axiosConfig/axiosURL';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/img/logo.png';
import landing from '../assets/videos/landing.mp4';
import { toast } from 'sonner';

const Login = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState({ username: '', password: '' });

    useEffect(() => {
        window.localStorage.setItem('token', '');
    }, [])

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUser({
            ...user,
            [event.target.name]: event.target.value
        })
    }

    const handleSubmit = async(event: React.FormEvent): Promise<void> => {
        event.preventDefault();
        try {
            const { data } = await axiosURL.post(`/api/auth/login`, user);
            if (data) {
                window.localStorage.setItem('token', data.token);
                navigate('/employees');
                toast.success('Sesión iniciada')
            } 
        } catch (error) {
            toast.error('Nombre de usuario y/o contraseña incorrecta/s');
            console.error(error);
        }
    }

  return (
    <main className='flex flex-col gap-28 text-white'>

        <video src={landing} autoPlay loop muted className='absolute top-0 left-0 w-full h-full object-cover -z-10'></video>

    <nav className='flex p-7 justify-between bg-blue-900 rounded-b-4xl'>
        <div className='font-roboto'>
            <h1>Bienvenido/a</h1>
            <h2>al sistema de gestión de empleados</h2>
        </div>
        <img src={logo} alt="LogoSCM" className='rounded-4xl' width={350}/>
    </nav>

    <div className='justify-items-center'>
        <form onSubmit={handleSubmit} className='flex flex-col justify-between w-[30vw] items-center h-72 border-2 rounded-lg p-5 text-xl bg-blue-900/95'>
            <h2>Inicio de Sesión</h2>
            <div className='flex items-center justify-between w-96'>
                <label>Usuario:</label>
                <input onChange={handleChange} name='username' minLength={3} type="text" className='border rounded-2xl p-1'/>
            </div>
            <div className='flex items-center justify-between w-96'>
                <label>Contraseña: </label>
                <input onChange={handleChange} name='password' minLength={3} type="password" className='border rounded-2xl p-1'/>
            </div>
            <button type='submit' className='text-black'>Iniciar Sesión</button>
        </form>
    </div>

    </main>
  )
}

export default Login