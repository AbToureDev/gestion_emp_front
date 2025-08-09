"use server"

import { redirect } from "next/navigation"
import { createSession, deleteSession, ADMIN_EMAIL, ADMIN_PASSWORD } from "@/lib/session"
export async function login(prevState: { message: string } | undefined, formData: FormData) {
    const email = formData.get("email") as string
    const password = formData.get("password") as string

    // axios.post('http://localhost:3000/auth/login', {
    //     email: email,
    //     password: password
    // })
    //     .then(async response => {
    //         console.log('la response', response.data.access_token);
    //         if (response.data.access_token) {
    //             await createSession(email)
    //             redirect("/dashboard")
    //         }
    //         redirect("/dashboard")
    //         // if (data.a)
    //     })
    //     .catch(async error => {
    //         if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
    //             await createSession(email);
    //
    //             redirect("/dashboard");
    //         } else {
    //             return {message: "Invalid credentials."}
    //         }
    //     })
    // console.log('login', email)
    // console.log('password', password)
    //
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
        await createSession(email)
        redirect("/dashboard")
    } else {
        return { message: "Veuilllez Verifier votre email et le password."}
    }
}

export async function logout() {
    await deleteSession()
    redirect("/login")
}