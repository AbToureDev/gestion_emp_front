import { isAuthenticatedAdmin } from "@/lib/session"
import { logout } from "@/app/actions/auth"
import { redirect } from "next/navigation"
import { getEmployeesAction } from "@/app/actions/employees"
import { EmployeeTable } from "@/components/employee-table"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default async function DashboardPage() {
    const isAuthenticated = await isAuthenticatedAdmin()
    if (!isAuthenticated) {
        redirect("/login")
    }

    const employees = await getEmployeesAction()

    return (
        <div className="flex flex-col min-h-screen p-4 md:p-6 lg:p-8">
            <header className="flex items-center justify-between pb-4 border-b mb-6">
                <h1 className="text-3xl font-bold">Employee Management</h1>
                <form action={logout}>
                    <Button className='bg-red-500 font-bold text-white' variant="outline">Logout</Button>
                </form>
            </header>
            <main className="flex-1 space-y-6">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-2xl font-bold">Employees</CardTitle>
                        <Link href="/dashboard/add">
                            <Button className='bg-green-400 font-bold text-white'>Add Employee</Button>
                        </Link>
                    </CardHeader>
                    <CardContent>
                        <EmployeeTable employees={employees} />
                    </CardContent>
                </Card>
            </main>
        </div>
    )
}
