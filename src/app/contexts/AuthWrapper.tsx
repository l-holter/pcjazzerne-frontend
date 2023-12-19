'use client'
import {
  createContext,
  FC,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { pb } from "../lib/pocketbase";
import type { RecordModel as PBRecord } from "pocketbase";
import { useRouter } from "next/navigation";

interface PBUser {
  id: string;
  name: string;
  email: string;
  username: string;
  avatarUrl: string;
}

interface AuthContextType {
  user: PBUser | null;
  isAuthorized: boolean;
  googleSignIn: () => void;
  setUserData: (user: PBRecord) => void;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

const AuthWrapper: FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<PBUser | null>(null);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const initializeAuth = async () => {
      if (pb.authStore.model) {
        await setUserData(pb.authStore.model as PBRecord);
      }
      setIsAuthorized(true);
    };

    initializeAuth();
  }, []);

  const signOut = () => {
    return new Promise<void>((resolve) => {
      setUser(null);
      setIsAuthorized(false);
      pb.authStore.clear();
      resolve();
      router.push('/login')
    });
  };

  const setUserData = (pbUser: PBRecord) => {
    const { id, name, email, username, avatarUrl } = pbUser;
    setUser({ id, name, email, username, avatarUrl });
    setIsAuthorized(true); // add this line
  };
  
  const googleSignIn = async () => {
    await signOut();
  
    try {
      const response = await pb.collection("users").authWithOAuth2({ provider: 'google' });
      const user = await pb.collection("users").getOne(response.record.id);
  
      if (user.name && user.avatarUrl && user.name === response.meta?.name && user.avatarUrl === response.meta?.avatarUrl) {
        setUserData(user);
        return user;
      }
      else {
        const updatedUser = await pb.collection("users").update(response.record.id, {
          name: response.meta?.name,
          avatarUrl: response.meta?.avatarUrl,
        });
        setUserData(updatedUser);
        return updatedUser;
      }
    }
    catch (err) {
      console.error(err);
      throw err;
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, googleSignIn, setUserData, signOut, isAuthorized }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const usePBAuth = () => useContext(AuthContext) as AuthContextType;
export default AuthWrapper;