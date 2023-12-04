'use client'
import { loginWithGoogle, setUserData, pb } from "@/app/lib/pocketbase";

export async function getUsername() {
  console.log("HERE IS THE USERNAME")
  console.log(pb.authStore.isValid)
  console.log(pb.authStore.token)
  console.log(pb.authStore.model)
}

export async function login() {
  loginWithGoogle()
  .then((record) => {
    // Update user data after login if available
    if (record.meta 
      && record.meta.name 
      && record.meta.email 
      && record.meta.avatarUrl) {
        const username = record.meta.name
        const email = record.meta.email
        const avatar = record.meta.avatarUrl

        setUserData(record.record.id, username, email, avatar)
        console.log("Sucessfully updated user")
      }
  })
  .catch((err) => {
    console.log(err)
  })
}

export default function LoginForm() {
  return (
    <div>
      <button onClick={() => login()}>
        Login with Google ⚽️
      </button>

    </div>
  )
}