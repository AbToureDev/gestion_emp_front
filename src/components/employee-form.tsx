"use client"

import { useActionState } from "react"
import type { Employee } from "@/lib/data"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { addEmployeeAction, updateEmployeeAction } from "@/app/actions/employees"
import Link from "next/link"

interface EmployeeFormProps {
    employee?: Employee // Optional, for edit mode
}

export function EmployeeForm({ employee }: EmployeeFormProps) {
    const isEditMode = !!employee
    const action = isEditMode ? updateEmployeeAction.bind(null, employee.id) : addEmployeeAction
    const [state, formAction] = useActionState(action, undefined)

    return (
        <Card className="mx-auto max-w-lg">
            <CardHeader className="space-y-1">
                <CardTitle className="text-2xl font-bold">{isEditMode ? "Edit Employee" : "Add Employee"}</CardTitle>
                <CardDescription>
                    {isEditMode ? "Update the employee details." : "Fill in the details to add a new employee."}
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form action={formAction} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="firstName">First Name</Label>
                            <Input id="firstName" name="firstName" placeholder="John" defaultValue={employee?.firstName} required />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="lastName">Last Name</Label>
                            <Input id="lastName" name="lastName" placeholder="Doe" defaultValue={employee?.lastName} required />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="position">Position</Label>
                        <Input
                            id="position"
                            name="position"
                            placeholder="Software Engineer"
                            defaultValue={employee?.position}
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="john.doe@example.com"
                            defaultValue={employee?.email}
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="hireDate">Hire Date</Label>
                        <Input id="hireDate" name="hireDate" type="date" defaultValue={employee?.hireDate} required />
                    </div>
                    {state?.message && <p className="text-red-500 text-sm">{state.message}</p>}
                    <div className="flex justify-end gap-2">
                        <Button type="button" variant="outline" asChild>
                            <Link href="/dashboard">Cancel</Link>
                        </Button>
                        <Button type="submit">{isEditMode ? "Save Changes" : "Add Employee"}</Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    )
}
