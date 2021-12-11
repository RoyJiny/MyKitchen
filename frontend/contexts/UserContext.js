import { createContext } from "react";

export const UserContext = createContext({email: '',
    phone: '',
    name: '',
    imgUrl: '',
    isSeller: false,
    googleId: '',
    addresses: [],
    favorites: []});