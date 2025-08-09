"use server"

import { isAuthenticatedAdmin } from "@/lib/session"
import { redirect } from "next/navigation"
import { getEmployees, addEmployee, getEmployeeById, updateEmployee, deleteEmployee, type Employee } from "@/lib/data"
import { revalidatePath } from "next/cache"

async function checkAuthAndRedirect() {
    const isAuthenticated = await isAuthenticatedAdmin()
    if (!isAuthenticated) {
        redirect("/login")
    }
}

export async function getEmployeesAction(): Promise<Employee[]> {
    await checkAuthAndRedirect()
    return getEmployees()
}

export async function getEmployeeByIdAction(id: string): Promise<Employee | undefined> {
    await checkAuthAndRedirect()
    return getEmployeeById(id)
}

export async function addEmployeeAction(prevState: { message: string } | undefined, formData: FormData) {
    await checkAuthAndRedirect()

    const firstName = formData.get("firstName") as string
    const lastName = formData.get("lastName") as string
    const position = formData.get("position") as string
    const email = formData.get("email") as string
    const hireDate = formData.get("hireDate") as string

    if (!firstName || !lastName || !position || !email || !hireDate) {
        return { message: "All fields are required." }
    }

    try {
        await addEmployee({ firstName, lastName, position, email, hireDate })
        revalidatePath("/dashboard")
        redirect("/dashboard")
    } catch (error) {
        console.error("Error adding employee:", error)
        return { message: "Failed to add employee." }
    }
}

export async function updateEmployeeAction(id: string, prevState: { message: string } | undefined, formData: FormData) {
    await checkAuthAndRedirect()

    const firstName = formData.get("firstName") as string
    const lastName = formData.get("lastName") as string
    const position = formData.get("position") as string
    const email = formData.get("email") as string
    const hireDate = formData.get("hireDate") as string

    if (!firstName || !lastName || !position || !email || !hireDate) {
        return { message: "All fields are required." }
    }

    try {
        await updateEmployee(id, { firstName, lastName, position, email, hireDate })
        revalidatePath("/dashboard")
        redirect("/dashboard")
    } catch (error) {
        console.error("Error updating employee:", error)
        return { message: "Failed to update employee." }
    }
}

export async function deleteEmployeeAction(id: string) {
    await checkAuthAndRedirect()
    try {
        await deleteEmployee(id)
        revalidatePath("/dashboard")
    } catch (error) {
        console.error("Error deleting employee:", error)
    }
}
