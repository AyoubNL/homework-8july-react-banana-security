import {createContext, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {jwtDecode} from "jwt-decode";
import axios from "axios";

export const AuthContext = createContext({});

function AuthContextProvider({children}) {
    const [isAuth, toggleIsAuth] = useState({
        isAuth: false,
        user: {
            username: '',
            email: '',
            password: '',
        },
        status: 'pending'
    });

    useEffect(() => {
        const token = localStorage.getItem('token' )

        if (token) {
            const decoded = jwtDecode( token )
            userInfo(decoded.sub, token)
        }
        else
            {
                toggleIsAuth({
                    isAuth: false,
                    user: '',
                    status: 'done'
                })
            }

    }, []);

    const navigate = useNavigate();

    const login = (JWT) => {
        console.log('Gebruiker is ingelogd!')
        localStorage.setItem('token', JWT)
        const decoded = jwtDecode(JWT)
        userInfo(decoded.sub, JWT)
    }

    const logout = () => {
        localStorage.clear()
        toggleIsAuth({
            isAuth: false,
            user: '',
            status: 'done'
        })
        console.log('Gebruiker is uitgelogd!')
        navigate('/')

    }

    async function userInfo( id, code ) {
        try {
            const sub = await axios.get(`http://localhost:3000/600/users/${ id }`,
                {
                    headers: {
                        "Authorization": `Bearer ${ code }`,
                        "Content-Type": "application/json"
                    }
                })
            toggleIsAuth({
                    ...isAuth,
                    isAuth: true,
                    user: {
                        username: sub.data.username,
                        email: sub.data.email,
                        id: sub.data.id,
                    },
                    status: 'done'
                }
            )
            navigate('/profile')

        } catch (e) {
            console.error('De gebruiker is niet ingelogd.')
            toggleIsAuth({
                isAuth: false,
                user: '',
                status: 'done'
            })
        }
    }

    return (
        <AuthContext.Provider value={{isAuth, toggleIsAuth, logout, login}}>


            {isAuth.status === 'done' ? children : <p>Loading...</p>}

        </AuthContext.Provider>
    );
}

export default AuthContextProvider;