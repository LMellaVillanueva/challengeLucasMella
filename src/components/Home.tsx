import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { getEmployeesAPI } from "../redux/employeeSlice";
import { Link, useNavigate } from "react-router-dom";
import axiosURL from "../axiosConfig/axiosURL";
import { toast } from "sonner";

const Home = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const allEmployees = useAppSelector(state => state.Employee.allEmployees);  
    const token = window.localStorage.getItem('token');

  useEffect(() => {
    if (!token) {
      navigate('/');
      toast.warning('Para acceder debes iniciar sesión');
    }
  }, [])

  useEffect(() => {
    const fetchEmployees = async() => {
        await dispatch(getEmployeesAPI());
    }
    fetchEmployees();
  }, [allEmployees]);

  const deleteEmployee = async(id: string) => {
    try {
       await axiosURL.delete(`/api/employee/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
    } catch (error) {
      console.error(error);
    }
  }



  return (
    <main className="flex flex-col gap-10 bg-gradient-to-b from-blue-100 via-indigo-500 to-blue-900 min-h-screen">

      {allEmployees.length && <h1 className="font-medium text-black py-8">Empleados</h1>}
    <div className="flex flex-wrap pt-0 p-10 gap-6 justify-center">
      {allEmployees.length ? (allEmployees.map((employee) => (
        <div key={employee.id} className="border-2 rounded-2xl flex flex-col justify-between items-center p-3 w-fit h-96 max-w-80 break-words hover:shadow-xl hover:shadow-black transition-all hover:scale-105" >
          <h3 className="font-bold">{employee.name}</h3>
          <div className="w-5/6 border border-dashed border-black"></div>
          <p>Correo: {employee.email}</p>
          <div className="w-5/6 border border-dashed border-black"></div>
          <p>Departamento de {employee.department}</p>
          <div className="w-5/6 border border-dashed border-black"></div>
          <Link to={`/employee/${employee.id}`}><button className="w-48">Ver Perfil</button></Link>
          <Link to={`/update_employee/${employee.id}`}><button className="w-48">Actualizar Empleado</button></Link>
          <div>
            <button className="w-48" onClick={() => {
              toast.promise(deleteEmployee(employee.id), {
                error: 'Ocurrió un error al eliminar el/la empleado/a',
                success: 'Empleado/a eliminado/a con éxito'
              })
            }}>Eliminar Empleado</button>
          </div>
        </div>
      ))) : (
        <h2 className="font-semibold text-black font-serif">Empleados no registrados</h2>
      )}
      </div>
    </main>
  );
}

export default Home;
