import { cookies } from "next/headers"

const SESSION_NAME = "admin_session"
export const ADMIN_EMAIL = "admin@example.com"
export const ADMIN_PASSWORD = "password" // In a real application, hash this password!


export async function createSession(accessToken: string) {
    cookies().set(SESSION_NAME, accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60 * 24, // 1 day
        path: "/",
    })
}

export async function getSession(): Promise<string | undefined> {
    return cookies().get(SESSION_NAME)?.value
}

export async function deleteSession() {
    cookies().delete(SESSION_NAME)
}

export async function isAuthenticatedAdmin(): Promise<boolean> {
    const token = await getSession()
    // For a real application, you would validate the JWT here (e.g., check expiration)
    // For simplicity, we just check if a token exists.
    return !!token
}

// export async function createSession(email: string) {
//     const sessionData = JSON.stringify({ email, isAuthenticated: true })
//     cookies().set(SESSION_NAME, sessionData, {
//         httpOnly: true,
//         secure: process.env.NODE_ENV === "production",
//         maxAge: 60 * 60 * 24, // 1 day
//         path: "/",
//     })
// }
//
// export async function getSession() {
//     const session = (await cookies()).get(SESSION_NAME)?.value
//     if (session) {
//         try {
//             return JSON.parse(session)
//         } catch (e) {
//             console.error("Failed to parse session cookie:", e)
//             return null
//         }
//     }
//     return null
// }
//
// export async function deleteSession() {
//     (await cookies()).delete(SESSION_NAME)
// }
//
// export async function isAuthenticatedAdmin() {
//     const session = await getSession()
//     return session && session.isAuthenticated && session.email === ADMIN_EMAIL
// }
