"use client"
import { useActionState } from "react"
import { login } from "@/app/actions/auth"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function LoginForm() {
    const [state, formAction] = useActionState(login, undefined);
    return (
        <Card className="mx-auto max-w-sm ">
            <CardHeader className="space-y-1">
                <CardTitle className="text-2xl font-bold">Admin Login</CardTitle>
                <CardDescription>Saisissez votre adresse électronique et votre mot de passe pour accéder au système de gestion des employés.
                    email par defaut  est :admin@example.com
                    password par defaut est : password
                    .</CardDescription>
            </CardHeader>
            <CardContent>
                <form action={formAction}  className="spacey-4">
                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" name="email" type="email" placeholder="admin@example.com" required />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="password">Password</Label>
                        <Input id="password" name="password" type="password" required />
                    </div>
                    {state?.message && <p className="text-red-500 text-sm">{state.message}</p>}
                    <Button type="submit" className="w-full">
                        Login
                    </Button>
                </form>
            </CardContent>
        </Card>
    )
}
