import { createContext, useState, useContext, ReactNode } from 'react';
import { HandleSessionStorage } from '../utils/session-storage';

interface UserData {
    id: string;
    email: string;
    token: string;
    name: string | null;
}

interface UserContextType {
    user: UserData | null;
    updateUser: (newUserData: UserData) => void;
    deleteUser: () => void;
}

const UserContext = createContext<UserContextType | null>(null);

export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUser precisa de um useProvider');
    }
    return context;
};

interface UserProviderProps {
    children: ReactNode;
}

export const UserProvider = ({ children }: UserProviderProps) => {
    const [user, setUser] = useState<UserData | null>(HandleSessionStorage.getUserData());

    const updateUser = (newUserData: UserData) => {
        setUser(newUserData);
        HandleSessionStorage.setUserData(newUserData);
        setUser(newUserData)
    };

    const deleteUser = () => {
        HandleSessionStorage.deleteUserData();
        setUser(null)
    }

    return (
        <UserContext.Provider value={{ user, updateUser, deleteUser }}>
            {children}
        </UserContext.Provider>
    );
};
