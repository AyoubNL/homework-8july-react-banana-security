import {Link} from 'react-router-dom';
import {useContext, useEffect, useState} from "react";
import axios from "axios";
import {AuthContext} from "../context/AuthContext";

function Profile() {
    const [secure, setSecure] = useState('')
    const {isAuth} = useContext(AuthContext)

    useEffect(() => {
async function content(){
    const JWT =  localStorage.getItem('token')
        try {
            const profile = await axios.get('http://localhost:3000/660/private-content', {headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${JWT}`}})
            setSecure(profile.data)
       }
        catch (e) {
            console.error('Geen vertrouwelijke info binnen')
        }}
        content()
    }, []);


    return (
        <>
            <h1>Profielpagina</h1>
            <section>
                <h2>Gegevens</h2>
                <p><strong>Gebruikersnaam:</strong> {isAuth.user.username}</p>
                <p><strong>Email:</strong> {isAuth.user.email}</p>
            </section>
            <section>
                <h2>{secure.title}</h2>
                <p>{secure.content}</p>
            </section>
            <p>Terug naar de <Link to="/">Homepagina</Link></p>
        </>
    );
}

export default Profile;