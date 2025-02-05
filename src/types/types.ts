export type Employee = {
    id: string,
    name: string,
    email: string,
    department: string
}

export type EmployeeList = Employee[];

export type EmployeeState = {
    allEmployees: EmployeeList
}