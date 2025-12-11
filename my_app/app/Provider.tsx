"use client";

import { api } from "@/convex/_generated/api";
import { useMutation } from "convex/react";
import React, { createContext, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { UserDetailContext } from "@/context/UserDetailContext";

function Provider({ children }: any) {
  const { user } = useUser();
  const createUserMutation = useMutation(api.users.CreateNewUser);
  const [userDetails, setUserDetails] = React.useState<any>(null);

  const handleCreateUser = async () => {
    if (user) {
      const result = await createUserMutation({
        email: user?.primaryEmailAddress?.emailAddress ?? "",
        imageUrl: user?.imageUrl,
        name: user?.fullName ?? "",
      });
      console.log(result);
      setUserDetails(result);
    }
  };

  useEffect(() => {
    if (user) {
      handleCreateUser();
    }
  }, [user]);

  return( 
  <UserDetailContext.Provider value ={{userDetails, setUserDetails}}>
    <div>{children}</div>
    </UserDetailContext.Provider>)
}

export default Provider;

export const useUserDetailContext = () => {
 return createContext(UserDetailContext);
}