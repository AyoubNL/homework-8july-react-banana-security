import React, {useContext} from 'react';
import logo from '../assets/banana-01.png';
import {useNavigate, Link} from 'react-router-dom';
import {AuthContext} from "../context/AuthContext";

function NavBar() {
    const navigate = useNavigate();
    const {isAuth, logout, login} = useContext(AuthContext)

    return (
        <nav>
            <Link to="/">
          <span className="logo-container">
            <img src={logo} alt="logo"/>
            <h3>
              Banana Security
            </h3>
          </span>
            </Link>

            <div>
                {isAuth ?
                    (
                        <button
                            type="button"
                            onClick={logout}
                        >Log out</button>
                    ) :
                    (<button
                        type="button"
                        onClick={login}
                    >Inloggen</button>)}
                {isAuth ?
                    null
                     :
                    (<button
                        type="button"
                        onClick={() => navigate('/signup')}
                    >Registreren</button>)
                }


            </div>
        </nav>
    );
}

export default NavBar;