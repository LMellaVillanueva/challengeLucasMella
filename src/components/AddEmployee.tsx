import { useEffect, useState } from 'react'
import axiosURL from '../axiosConfig/axiosURL';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

export default function AddEmployee() {
  const navigate = useNavigate();
  const token = window.localStorage.getItem('token');
  const [employee, setEmployee] = useState({
    name: '',
    email: '',
    department: ''
  });

  useEffect(() => {
    if (!token) {
      navigate('/');
      toast.warning('Para acceder debes iniciar sesión');
    }
  }, [])

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmployee({
      ...employee,
      [event.target.name]: event.target.value
    })
  }

  const handleSubmit = async(): Promise<void> => {
    try {
      const { data } = await axiosURL.post(`/api/Employee`, employee,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        if (data) {
          navigate('/employees');
        }
      } catch (error) {
        console.error(error);
      }
    }

    const handleFormSubmit = (event: React.FormEvent) => {
      event.preventDefault();
      if (
        !employee.name.length ||
        !employee.email.length ||
        !employee.department.length
      ) {
        toast.error('Debes llenar todos los campos');
        return;
      }
      if (
        employee.name.length < 4 ||
        employee.department.length < 4
      ) {
        toast.error('El nombre y departamento deben tener al menos 4 carácteres');
        return;
      }
      toast.promise(handleSubmit(), {
          error: 'Ocurrió un error al añadir el/la empleado/a',
          success: 'Empleado/a agregado/a con éxito'
      })
    }

  return (
    <main className='pt-10 flex flex-col items-center gap-16 bg-gradient-to-b from-blue-100 via-indigo-600 to-blue-900 h-screen'>
      <h1 className='font-medium'>Añadir Empleado</h1>
      <form onSubmit={handleFormSubmit} className='flex flex-col justify-between w-[30vw] items-center h-96 border-2 rounded-lg p-5 text-xl bg-indigo-300'>
        <div className='flex items-center justify-between w-96'>
          <label>Nombre:</label>
          <input type="text" name='name' onChange={handleChange} className='border rounded-2xl p-1 bg-white'/>
        </div>
        <div className='flex items-center justify-between w-96'>
          <label htmlFor="">Email:</label>
          <input type="email" name='email' minLength={4} onChange={handleChange} className='border rounded-2xl p-1 bg-white'/>
        </div>
        <div className='flex items-center justify-between w-96'>
          <label htmlFor="">Departamento:</label>
          <input type="text" name='department' onChange={handleChange} className='border rounded-2xl p-1 bg-white'/>
        </div>
        <button type='submit'>Agregar</button>
        <Link to={'/employees'}><button>Volver</button></Link>
      </form>


    </main>
  )
}
