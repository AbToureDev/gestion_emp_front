import { v4 as uuidv4 } from "uuid"

export interface Employee {
    id: string
    firstName: string
    lastName: string
    position: string
    email: string
    hireDate: string // YYYY-MM-DD format
}

let employees: Employee[] = [
    {
        id: uuidv4(),
        firstName: "Alice",
        lastName: "Smith",
        position: "Software Engineer",
        email: "alice.smith@example.com",
        hireDate: "2022-01-15",
    },
    {
        id: uuidv4(),
        firstName: "Bob",
        lastName: "Johnson",
        position: "Product Manager",
        email: "bob.johnson@example.com",
        hireDate: "2021-07-01",
    },
    {
        id: uuidv4(),
        firstName: "Charlie",
        lastName: "Brown",
        position: "UX Designer",
        email: "charlie.brown@example.com",
        hireDate: "2023-03-10",
    },
]

export async function getEmployees(): Promise<Employee[]> {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 500))
    return employees
}

export async function getEmployeeById(id: string): Promise<Employee | undefined> {
    await new Promise((resolve) => setTimeout(resolve, 200))
    return employees.find((emp) => emp.id === id)
}

export async function addEmployee(employee: Omit<Employee, "id">): Promise<Employee> {
    await new Promise((resolve) => setTimeout(resolve, 500))
    const newEmployee = { id: uuidv4(), ...employee }
    employees.push(newEmployee)
    return newEmployee
}

export async function updateEmployee(
    id: string,
    updatedFields: Partial<Omit<Employee, "id">>,
): Promise<Employee | undefined> {
    await new Promise((resolve) => setTimeout(resolve, 500))
    const index = employees.findIndex((emp) => emp.id === id)
    if (index !== -1) {
        employees[index] = { ...employees[index], ...updatedFields }
        return employees[index]
    }
    return undefined
}

export async function deleteEmployee(id: string): Promise<boolean> {
    await new Promise((resolve) => setTimeout(resolve, 500))
    const initialLength = employees.length
    employees = employees.filter((emp) => emp.id !== id)
    return employees.length < initialLength
}
