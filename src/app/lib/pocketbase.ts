import PocketBase from "pocketbase";

export const pb = new PocketBase("https://pb.hjelmtvedt.io");

export async function loginWithGoogle() {
  const authData = await pb.collection('users').authWithOAuth2({ 
    provider: 'google'
  });
  return authData
}

export async function setUserData(recordID: string, name: string, email: string, avatarUrl: string) {
  const data = {
    name: name,
    email: email,
    avatarUrl: avatarUrl
  }

  const record = await pb.collection('users').update(recordID, data);
  return record
}

export async function getUser() {
  console.log(pb.authStore.model)
  //return pb.authStore.model
}



