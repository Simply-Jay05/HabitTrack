import {
  useContext,
  createContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { auth } from "../config/firebase";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  updatePassword,
  User,
  updateEmail,
} from "firebase/auth";
import { email } from "zod";

type AuthContextType = {
  user: User | null;
  loading: boolean;
  Login: (email: string, password: string) => Promise<void>;
  Signup: (email: string, password: string, fullName: string) => Promise<void>;
  changePassword: (newPassword: string) => Promise<void>;
  changeEmail: (newEmail: string) => Promise<void>;
  Logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

type AuthProviderProp = {
  children: ReactNode;
};

export const AuthProvider = ({ children }: AuthProviderProp) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const Login = async (email: string, password: string) => {
    setLoading(true);
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);

      if (result) {
        setUser(result.user);
        console.log("LOGIN SUCEESSFUL", result.user);
      }

      setLoading(false);
    } catch (error) {
      console.error("ERROR LOGINING IN", error);
      setLoading(false);
    }
  };

  const Signup = async (email: string, password: string, fullName: string) => {
    // Signup code
    setLoading(true);
    // @Johndoe01
    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );

      if (result) {
        await updateProfile(result.user, {
          displayName: fullName,
          photoURL: null,
        });
        console.log("SIGNUP SUCEESSFUL", result.user);
      }

      setLoading(false);
    } catch (error) {
      console.error("ERROR SIGNING UP", error);
      setLoading(false);
    }
  };

  const Logout = async () => {
    setLoading(true);
    try {
      await signOut(auth);
      console.log("LOGOUT SUCCESSFULLY");
    } catch (error) {
      console.error("ERROR LOGING OUT", error);
    } finally {
      setLoading(false);
    }
  };

  const changePassword = async (newPassword: string) => {
    setLoading(true);

    const user = auth.currentUser;

    if (!user) return;

    try {
      await updatePassword(user, newPassword);
      console.log("CHANGED PASSWORD SUCCESSFULLY");
    } catch (error) {
      console.error("ERROR CHANGING PASSWORD", error);
    } finally {
      setLoading(false);
    }
  };

  const changeEmail = async (newEmail: string) => {
    setLoading(true);

    const user = auth.currentUser;

    if (!user) return;

    try {
      await updateEmail(user, newEmail);
      console.log("CHANGED EMAIL SUCCESSFULLY");
    } catch (error) {
      console.error("ERROR CHANGING EMAIL", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        Login,
        Signup,
        changeEmail,
        changePassword,
        Logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
};
