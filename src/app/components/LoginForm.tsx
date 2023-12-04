'use client'
import { loginWithGoogle } from "@/app/lib/pocketbase";

export default function LoginForm() {
  return (
    <button onClick={() => loginWithGoogle()}>
      Login with Google ⚽️
    </button>
  )
}