'use client'
import { signIn, signOut } from "next-auth/react"
import { useState } from "react";

interface Props {
  session: any
}

function handleLogout() {
  signOut();
}

export default function SignUpLogin({ session }: Props) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const result = await signIn("credentials", {
      redirect: false,
      email,
      name,
      password
    });
    if (result?.error) setError(result.error);
  };

  if (session) {
    return (
      <div className="flex flex-col items-center justify-center">
        Signed in as {session.user?.email} <br />
        <button onClick={handleLogout}>Sign out</button>
      </div>
    );
  }

  return (
    <div className="p-1 h-full w-screen ">
      <main className="h-full w-full bg-blue-200">
        <form onSubmit={handleSubmit} className="flex flex-col gap-2 max-w-xs mx-auto mt-10 p-4 bg-white rounded shadow">
          <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required className="p-2 border rounded" />
          <input type="text" placeholder="Name (optional for login)" value={name} onChange={e => setName(e.target.value)} className="p-2 border rounded" />
          <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required className="p-2 border rounded" />
          <button type="submit" className="bg-blue-500 text-white p-2 rounded">Sign In / Register</button>
          {error && <div className="text-red-500 text-xs">{error}</div>}
        </form>
      </main>
    </div>
  );
}