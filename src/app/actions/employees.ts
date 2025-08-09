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
    try {
        return await getEmployees()
    } catch (error) {
        console.error("Error fetching employees:", error)
        // Optionally, handle specific errors or return an empty array
        return []
    }
}

export async function getEmployeeByIdAction(id: string): Promise<Employee | undefined> {
    await checkAuthAndRedirect()
    try {
        return await getEmployeeById(id)
    } catch (error) {
        console.error(`Error fetching employee ${id}:`, error)
        return undefined
    }
}

export async function addEmployeeAction(prevState: { message: string } | undefined, formData: FormData) {
    await checkAuthAndRedirect()
    const firstName = formData.get("firstName") as string
    const lastName = formData.get("lastName") as string
    const poste = formData.get("poste") as string
    const email = formData.get("email") as string
    const Employed_date = formData.get("Employed_date") as string

    if (!firstName || !lastName || !poste || !email || !Employed_date) {
        return { message: "All fields are required." }
    }

    try {
        await addEmployee({ firstName, lastName, email, poste, Employed_date })
        revalidatePath("/dashboard")
        redirect("/dashboard")
        return { message: "Ajouter avec succes." }
    } catch (error: any) {
        console.error("Error adding employee:", error)
        return { message: error.message || "Failed to add employee." }
    }
}

export async function updateEmployeeAction(id: string, prevState: { message: string } | undefined, formData: FormData) {
    await checkAuthAndRedirect()

    const firstName = formData.get("firstName") as string
    const lastName = formData.get("lastName") as string
    const poste = formData.get("poste") as string
    const email = formData.get("email") as string
    const Employed_date = formData.get("Employed_date") as string

    if (!firstName || !lastName || !poste || !email || !Employed_date) {
        return { message: "All fields are required." }
    }



    try {
        await updateEmployee(id, { firstName, lastName, poste, email, Employed_date })
        revalidatePath("/dashboard")
        redirect("/dashboard")
        return { message: "Mise a jour succes." }

    } catch (error: any) {
        console.error("Error updating employee:", error)
        return { message: error.message || "Failed to update employee." }
    }
}

export async function deleteEmployeeAction(id: string) {
    await checkAuthAndRedirect()
    try {
        await deleteEmployee(id)
        revalidatePath("/dashboard")
    } catch (error: any) {
        console.error("Error deleting employee:", error)
        // You might want to return an error message to the client if needed
    }
}
