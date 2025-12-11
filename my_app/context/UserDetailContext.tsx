"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs"; 
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api"; 

export const UserDetailContext = createContext<any>(null);

export function UserDetailProvider({ children }: { children: React.ReactNode }) {
  const { user } = useUser();
  const [userDetail, setUserDetail] = useState<any>(null);

  // convex mutation
  const createNewUser = useMutation(api.users.CreateNewUser);

  useEffect(() => {
    if (!user) {
      setUserDetail(null);
      return;
    }

    const payload = {
      name: user.fullName ?? user.firstName ?? "Unknown",
      email: user.primaryEmailAddress?.emailAddress 
          ?? user.emailAddresses?.[0]?.emailAddress 
          ?? "",
      imageUrl: user.imageUrl ?? "",
    };

    async function syncUser() {
      try {
        const created = await createNewUser(payload);
        console.log(created);
        setUserDetail(created);
      } catch (err) {
        console.error("Error creating/syncing user in Convex:", err);
      }
    }

    syncUser();
  }, [user]);

  return (
    <UserDetailContext.Provider value={{ userDetail, setUserDetail }}>
      {children}
    </UserDetailContext.Provider>
  );
}

export const useUserDetailContext = () => useContext(UserDetailContext);
