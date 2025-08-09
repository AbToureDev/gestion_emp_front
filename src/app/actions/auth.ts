"use server"

import { redirect } from "next/navigation"
import { createSession, deleteSession, ADMIN_EMAIL, ADMIN_PASSWORD } from "@/lib/session"

export async function login(prevState: { message: string } | undefined, formData: FormData) {
    const email = formData.get("email") as string
    const password = formData.get("password") as string

    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
        await createSession(email)
        redirect("/dashboard")
    } else {
        return { message: "Invalid credentials." }
    }
}

export async function logout() {
    await deleteSession()
    redirect("/login")
}