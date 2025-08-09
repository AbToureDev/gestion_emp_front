import { isAuthenticatedAdmin } from "@/lib/session"
import { redirect } from "next/navigation"
import { EmployeeForm } from "@/components/employee-form"
import { getEmployeeByIdAction } from "@/app/actions/employees"

interface EditEmployeePageProps {
    params: { id: string }
}

export default async function EditEmployeePage({ params }: EditEmployeePageProps) {
    const isAuthenticated = await isAuthenticatedAdmin()
    if (!isAuthenticated) {
        redirect("/login")
    }

    const employee = await getEmployeeByIdAction(params.id)

    if (!employee) {
        // Redirect to dashboard if employee not found
        redirect("/dashboard")
    }

    return (
        <div className="flex items-center justify-center min-h-screen p-4 md:p-6 lg:p-8">
            <EmployeeForm employee={employee} />
        </div>
    )
}
