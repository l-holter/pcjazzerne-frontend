"use client"
import {
  createContext,
  FC,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { useRouter } from "next/router";
import { pb } from "../lib/pocketbase";
import type { AuthProviderInfo, RecordModel as PBRecord } from "pocketbase";

interface PBUser {
  id: string;
  name: string;
  email: string;
  username: string;
  avatarUrl: string;
}

interface AuthContextType {
  user: PBUser | null;
  googleSignIn: () => void;
  setUserData: (user: PBRecord) => void;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

const AuthWrapper: FC<{ children: ReactNode }> = ({ children }) => {

  const [user, setUser] = useState<PBUser | null>(null);

  useEffect(() => {
    if (pb.authStore.model) setUserData(pb.authStore.model as PBRecord);
  }, []);

  const setUserData = (pbUser: PBRecord) => {
    const { id, name, email, username, avatarUrl } = pbUser;
    setUser({ id, name, email, username, avatarUrl });
  };

  const googleSignIn = () => {
    return new Promise((resolve, reject) => {
      signOut();
  
      pb.collection("users")
        .authWithOAuth2({ provider: 'google' })
        .then(async (response) => {
          const user = await pb.collection("users").getOne(response.record.id);
  
          // Skip profile updation if user already exists or user data from OAuth providers haven't changed
          if (
            user.name &&
            user.avatarUrl &&
            user.name === response.meta?.name &&
            user.avatarUrl === response.meta?.avatarUrl
          ) {
            setUserData(user);
            resolve(user); // Resolve with user data
          } else {
            pb.collection("users")
              .update(response.record.id, {
                name: response.meta?.name,
                avatarUrl: response.meta?.avatarUrl,
              })
              .then((res) => {
                setUserData(res);
                resolve(res); // Resolve with updated user data
              })
              .catch((err) => {
                console.error(err);
                reject(err); // Reject with the error
              });
          }
        })
        .catch((err) => {
          console.error(err);
          reject(err); // Reject with the error
        });
    });
  };

  const signOut = () => {
    setUser(null);
    pb.authStore.clear();
  };

  return (
    <AuthContext.Provider
      value={{ user, googleSignIn, setUserData, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const usePBAuth = () => useContext(AuthContext) as AuthContextType;
export default AuthWrapper;