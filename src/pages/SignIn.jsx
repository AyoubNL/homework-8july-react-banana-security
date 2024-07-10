import React, {useContext, useState} from 'react';
import { Link } from 'react-router-dom';
import {AuthContext} from "../context/AuthContext";
import axios from "axios";

function SignIn() {
    const {login} = useContext(AuthContext)

    const [inform, setInform] = useState({
        email: '',
        password: ''
    })

    function handleChange(e){
        const changefieldName = e.target.name

        setInform({
            ...inform,
           [changefieldName] : e.target.value
        })
    }

    function handleSubmit(e){

        e.preventDefault()

        async function putData(){
            try {
                const send = await axios.post('http://localhost:3000/login', inform)
                login(send.data.accessToken)
            }
            catch (e){
                console.error('Fout bij inloggen')
            }
        }
        putData()
    }

  return (
    <>
      <h1>Inloggen</h1>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab alias cum debitis dolor dolore fuga id molestias qui quo unde?</p>

      <form onSubmit={handleSubmit}><label htmlFor="email">E-mailadres:</label>
          <input id='email' type="email" name='email' onChange={handleChange} value={inform.email}/>
          <label htmlFor="password">Wachtwoord:</label>
          <input id='password' type="password" name='password' onChange={handleChange} value={inform.password}/>
        <button
            type='submit'
        onClick={handleSubmit}
        >Inloggen</button>
      </form>

      <p>Heb je nog geen account? <Link to="/signup">Registreer</Link> je dan eerst.</p>
    </>
  );
}

export default SignIn;