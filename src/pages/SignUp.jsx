import React, {useContext} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import axios from 'axios'
import {AuthContext} from "../context/AuthContext";

function SignUp() {
    const navigate = useNavigate()
    const {isAuth, toggleIsAuth} = useContext(AuthContext)

    function handleChange(e) {
        const changedFieldName = e.target.name

        toggleIsAuth({
            ...isAuth,
            user: {...isAuth.user, [changedFieldName] : e.target.value}
        })
    }

    function handleSubmit(e) {
        e.preventDefault()
        async function postData() {
            try {
                const register = await axios.post('http://localhost:3000/register', isAuth.user)
                if (register.status === 201) {
                    navigate('/signin')
                }
            } catch (e) {
                console.error('Fout bij registratie')
            }
        }
        postData()
    }

    return (
        <>
            <h1>Registreren</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur atque consectetur, dolore eaque
                eligendi
                harum, numquam, placeat quisquam repellat rerum suscipit ullam vitae. A ab ad assumenda, consequuntur
                deserunt
                doloremque ea eveniet facere fuga illum in numquam quia reiciendis rem sequi tenetur veniam?</p>
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">Gebruikersnaam:</label>
                <input id='username' type="text" name='username' value={isAuth.user.username} onChange={handleChange}/>
                <label htmlFor="email">E-mailadres:</label>
                <input id='email' type="email" name='email' value={isAuth.user.email} onChange={handleChange}/>
                <label htmlFor="password">Wachtwoord:</label>
                <input id='password' type="password" name='password' value={isAuth.user.password}
                       onChange={handleChange}/>
                <button type='submit'>Aanmelden</button>
            </form>
            <p>Heb je al een account? Je kunt je <Link to="/signin">hier</Link> inloggen.</p>
        </>
    );
}

export default SignUp;