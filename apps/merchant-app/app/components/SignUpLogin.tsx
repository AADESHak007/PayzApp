'use client'
import { signIn, signOut } from "next-auth/react"

interface Props {
  session: any
}

function handleLogout() {
  signOut();
}

export default function SignUpLogin({ session }: Props) {
  if (session) {
    return (
      <div className="flex flex-col items-center justify-center">
        Signed in as {session.user?.email} <br />
        <button onClick={handleLogout}>Sign out</button>
      </div>
    )
  }

  return (
    <div className="p-1 h-full w-screen ">
      <main className="h-full w-full bg-blue-200">
        <h1></h1> 
         <button onClick={() => signIn("github")}>Sign in with GitHub</button>
      </main>
    </div>
  )
}