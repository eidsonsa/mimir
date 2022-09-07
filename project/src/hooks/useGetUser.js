import { useContext, useEffect, useState } from "react";
import { AuthGoogleContext } from "../contexts/authGoogle";

export default function useGetUser() {
  const [user, setUser] = useState();
  const { user: userLoggedIn } = useContext(AuthGoogleContext);

  useEffect(() => {
    function isJsonString(str) {
      try {
        JSON.parse(str);
      } catch (e) {
        return false;
      }
      return true;
    }
    if (isJsonString(userLoggedIn)) {
      const obj = JSON.parse(userLoggedIn);
      setUser(obj);
    }
  }, [userLoggedIn]);

  return { user };
}
