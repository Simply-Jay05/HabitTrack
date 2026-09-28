import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { User } from "firebase/auth";

type UserContextType = {
  user: User | null;
  setUser: (user: User) => void;
  loading: boolean;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

type UserProviderProp = {
  children: ReactNode;
};

export const UserProvider = ({ children }: UserProviderProp) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);

  return (
    <UserContext.Provider value={{ user, loading, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("useUser must be insider UserContextProvider");
  }

  return context;
};
