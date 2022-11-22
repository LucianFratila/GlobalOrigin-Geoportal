import React from 'react'
//import Translate from '../languages/Translate'

function UserMenu ({user,resetUser}) {

    let block;
    if(user!='guest'){
        block=<li key={user} className="nav-item dropdown">
                    <a href="#" id="menu_Cartare" className="dropdown-toggle"  role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        {user}
                    </a>
                    <ul key="user" className="dropdown-menu" >
                        <li key="Logout" className="nav-item">
                            <a className="" onClick={() => resetUser("guest","")}  href="#">Logout</a>
                        </li>
                    </ul>
               </li>             
    }
    else{
        block=  <li key="Login" className="nav-item">
                    <a className="nav-"   href="/#/login">Login</a>
                </li>
    } 

    return (
                <React.Fragment>
                    {block}
                </React.Fragment>
            )
}


export default UserMenu
