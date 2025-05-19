'use client'
import { signIn, signOut } from "next-auth/react"

interface Props {
  session: any
}

export default function SignUpLogin({ session }: Props) {
  if (session) {
    return (
      <>
        Signed in as {session.user?.email} <br />
        <button onClick={() => signOut()}>Sign out</button>
      </>
    )
  }

  return (
    <>
      Not signed in <br />
      <button onClick={() => signIn("github")}>Sign in with GitHub</button>
    </>
  )
}