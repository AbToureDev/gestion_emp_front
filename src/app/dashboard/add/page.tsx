import { isAuthenticatedAdmin } from "@/lib/session"
import { redirect } from "next/navigation"
import { EmployeeForm } from "@/components/employee-form"

export default async function AddEmployeePage() {
    const isAuthenticated = await isAuthenticatedAdmin()
    if (!isAuthenticated) {
        redirect("/login")
    }

    return (
        <div className="flex items-center justify-center min-h-screen p-4 md:p-6 lg:p-8">
            <EmployeeForm />
        </div>
    )
}
