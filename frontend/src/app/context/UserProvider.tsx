// app/context/UserProvider.tsx
'use client'

import { useContext, useState, createContext } from "react";

type User = {
    id: string;
    username: string;
    email: string
};

type UserContextType = {
    user: User;
    setUser: (u: User) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export default function UserProvider({children, initialUser}:{children: React.ReactNode; initialUser: User;}){
    const [user, setUser] = useState<User>(initialUser)
    return (
        <UserContext.Provider value={{user, setUser}}>
            {children}
        </UserContext.Provider>
    )
}

export function useUser(){
    const ctx = useContext(UserContext);

    if (!ctx) {
        throw new Error("useUser must be used inside UserProvider")
    } return ctx;
}