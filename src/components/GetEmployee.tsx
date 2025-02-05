import { useEffect, useState } from 'react';
import axiosURL from '../axiosConfig/axiosURL';
import { Employee } from '../types/types'
import { Link, useParams, useNavigate } from 'react-router-dom'
import foto from '../assets/img/foto.avif';
import { toast } from 'sonner';

const GetEmployee = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = window.localStorage.getItem('token');
  const [employee, setEmployee] = useState<Employee>({
    id: '',
    name: '',
    email: '',
    department: ''
  })

  useEffect(() => {
    if (!token) {
      navigate('/');
      toast.warning('Para acceder debes iniciar sesión');
    }
  }, [])

  useEffect(() => {
    fetchEmployee();
  }, [id])

  const fetchEmployee = async() => {
    try {
      const { data } = await axiosURL.get(`api/employee/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      if (data) {
        setEmployee(data);
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <main className='pt-10 flex flex-col items-center gap-16 bg-gradient-to-b from-blue-100 via-indigo-600 to-blue-900 h-screen'>

    <article className='bg-indigo-300 flex flex-col justify-between items-center p-10 border-2 border-black rounded-xl mt-10 gap-8 scale-90'>
      <img src={foto} alt="foto_empleado" width={200} className='rounded-full' />
      <h1 className='font-medium'>Nombre emplado/a: {employee.name}</h1>
        <div className="w-5/6 border border-black"></div>
      <div className='inline-flex gap-3'>
        <span className='text-3xl'>Dirección de correo:</span><span className='text-3xl font-semibold'>{employee.email}</span>
      </div>
        <div className="w-5/6 border border-black"></div>
        <div className='inline-flex gap-3'>
          <span className='text-3xl'>Departamento de</span><span className='text-3xl font-semibold'>{employee.department}</span>
        </div>
      <Link to={'/employees'} className='text-xl'><button>Volver</button></Link>
    </article>

    </main>
  )
}

export default GetEmployee