import {createContext, useState} from "react";
import {useNavigate} from "react-router-dom";

export const AuthContext = createContext();

function AuthContextProvider({ children }) {
    const [isAuth, toggleIsAuth] = useState(false);
    const navigate = useNavigate();

const login = () => {
    toggleIsAuth(true)
    console.log('Gebruiker is ingelogd!')
    navigate('/profile')
}

const logout = () => {
    toggleIsAuth(false)
    console.log('Gebruiker is uitgelogd!')
    navigate('/')
    }

    return (
        <AuthContext.Provider value={{isAuth, logout, login}}>

            {/*navigatiebalk laat alleen een uitlog-knop zien bij true (ingelogd) of de inlog- en registratie-knoppen bij false (niet ingelogd).*/}

            {children}

        </AuthContext.Provider>
    );
}

export default AuthContextProvider;

