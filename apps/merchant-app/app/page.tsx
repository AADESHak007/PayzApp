import { getServerSession, } from "next-auth"

import SignUpLogin from "./components/SignUpLogin"
import { authOptions } from "../lib/auth"

export default async function Component() {
  const session = await getServerSession(authOptions)

  return <SignUpLogin session={session} />
}