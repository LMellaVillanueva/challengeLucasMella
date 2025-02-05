import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Employee } from '../types/types';
import axiosURL from '../axiosConfig/axiosURL';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const UpdateEmployee = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const token = window.localStorage.getItem('token');
  const [employee, setEmployee] = useState<Employee>({
      id: '',
      name: '',
      email: '',
      department: ''
  })
  const [sameInfo, setSameInfo] = useState<Employee>({
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
            setSameInfo(data);
          }
        } catch (error) {
          console.error(error);
        }
      }

      const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmployee({
          ...employee,
          [event.target.name]: event.target.value
        })
      }

      const handleSubmit = async(): Promise<void> => {
        try {
          const { data } = await axiosURL.put(`/api/Employee/${id}`, employee,
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
            employee.name === sameInfo.name &&
            employee.email === sameInfo.email &&
            employee.department === sameInfo.department
          ) {
            toast.error('No puedes actualizar la información con los mismos datos');
            return;
          }
          toast.promise(handleSubmit(), {
            error: 'Ocurrió un error al actualizar información de empleado/a',
            success: 'Información actualizada con éxito'
          })
        }

  return (
    <main className='pt-10 flex flex-col items-center gap-16 bg-gradient-to-b from-blue-100 via-indigo-600 to-blue-900 h-screen'>

    <h1 className='font-medium'>Actualizar información</h1>
    <form onSubmit={handleFormSubmit} className='flex flex-col justify-between w-[30vw] items-center h-96 border-2 rounded-lg p-5 text-xl bg-indigo-300'>
        <div className='flex items-center justify-between w-96'>
          <label>Nombre:</label>
          <input type="text" name='name' onChange={handleChange} value={employee.name} className='border rounded-2xl p-1 bg-white'/>
        </div>
        <div className='flex items-center justify-between w-96'>
          <label htmlFor="">Email:</label>
          <input type="email" name='email' onChange={handleChange} value={employee.email} className='border rounded-2xl p-1 bg-white'/>
        </div>
        <div className='flex items-center justify-between w-96'>
          <label htmlFor="">Departamento:</label>
          <input type="text" name='department' onChange={handleChange} value={employee.department} className='border rounded-2xl p-1 bg-white'/>
        </div>
        <button type='submit'>Actualizar</button>
        <Link to={'/employees'}><button>Volver</button></Link>
      </form>


    </main>
  )
}

export default UpdateEmployee