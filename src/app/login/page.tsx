import { redirect } from "next/navigation"
import {isAuthenticatedAdmin} from "@/lib/session";
import {LoginForm} from "@/components/login-form";

export default async function LoginPage() {
    const isAuthenticated = await isAuthenticatedAdmin()
    if (isAuthenticated) {
        redirect("/dashboard")
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-950">
            <LoginForm />
        </div>
    )
}
