import { v4 as uuidv4 } from "uuid"
import {getSession} from "@/lib/session";
import {redirect} from "next/navigation";

export interface Employee {
    id: string
    firstName: string
    lastName: string
    poste: string
    Employed_date: string // YYYY-MM-DD format
    email: string
}
const NESTJS_API_URL = "http://localhost:3000"
async function fetchWithAuth(url: string, options?: RequestInit) {
    const token = await getSession()
    if (!token) {
        // If no token, redirect to login. This should ideally be handled by Server Actions.
        // For direct usage in Server Components, ensure authentication check happens before.
        redirect("/login")
    }

    // const headers = {
    //     "Content-Type": "application/json",
    //     Authorization: `Bearer ${token}`,
    //     ...options?.headers,
    // }

    const response = await fetch(`${NESTJS_API_URL}${url}`, {
        ...options
    })

    if (!response.ok) {
        if (response.status === 401 || response.status === 403) {
            // Handle unauthorized/forbidden access, e.g., redirect to login
            redirect("/login")
        }
        const errorData = await response.json().catch(() => ({ message: "An unknown error occurred" }))
        throw new Error(errorData.message || `API Error: ${response.status} ${response.statusText}`)
    }

    return response.json()
}

export async function getEmployees(): Promise<Employee[]> {
    return fetchWithAuth("/employer")
}

export async function getEmployeeById(id: string): Promise<Employee | undefined> {
    try {
        return await fetchWithAuth(`/employer/${id}`)
    } catch (error) {
        // Handle case where employee is not found (e.g., 404)
        console.error(`Employee with ID ${id} not found:`, error)
        return undefined
    }
}

export async function addEmployee(employee: Omit<Employee, "id">): Promise<Employee> {
    return fetchWithAuth("/employer", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            firstName: employee.firstName,
            lastName: employee.lastName,
            email: employee.email,
            poste: employee.poste,
            Employed_date: employee.Employed_date
        })
    })
}

export async function updateEmployee(id: string, updatedFields: Partial<Omit<Employee, "id">>): Promise<Employee> {
    return fetchWithAuth(`/employer/${id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(updatedFields)
    })
}

export async function deleteEmployee(id: string): Promise<void> {
    await fetchWithAuth(`/employer/${id}`, {
        method: "DELETE",
    })
}
