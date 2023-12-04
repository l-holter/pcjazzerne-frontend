import PocketBase from "pocketbase";

export const pb = new PocketBase(process.env.NEXT_PUBLIC_PB_URL);

export async function loginWithGoogle() {
  const authData = await pb.collection('users').authWithOAuth2({ provider: 'google' });
  return authData
}

