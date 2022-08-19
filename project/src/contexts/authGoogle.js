import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { Navigate } from "react-router";
import { app } from "../services/firebaseConfig";

const provider = new GoogleAuthProvider();

export const AuthGoogleContext = createContext({});

export const AuthGoogleProvider = ({ children }) => {
  const auth = getAuth(app);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loadStorageAuth = () => {
      const sessionToken = sessionStorage.getItem("@AuthFirebase:token");
      const sessionUser = sessionStorage.getItem("@AuthFirebase:user");

      if (sessionToken && sessionUser) {
        setUser(sessionUser);
      }
    };
    loadStorageAuth();
  });

  const signInGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
        setUser(user);
        sessionStorage.setItem("@AuthFirebase:token", token);
        sessionStorage.setItem("@AuthFirebase:user", JSON.stringify(user));
        // ...
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const signOut = () => {
    sessionStorage.clear();
    setUser(null);

    return <Navigate to="/" />;
  };

  return (
    <AuthGoogleContext.Provider
      value={{ signInGoogle, isLoggedIn: !!user, user, signOut }}
    >
      {children}
    </AuthGoogleContext.Provider>
  );
};
