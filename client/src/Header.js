import React from 'react'
import {NavLink} from 'react-router-dom'



let link = {
  textDecoration: "none",
  color: "white"
}

function Header({user, handleLogout }) {



  return (
    <div style={{display: "flex", backgroundColor: "#004643"}}>
        <ul>
            <NavLink to='/' style={link}><b>Home</b></NavLink>
        </ul>
        <ul>
            <NavLink to='/new_item' style={link}><b>Add New</b></NavLink>
        </ul>
        <ul>
            <NavLink to='/self' style={link}><b>Profile</b></NavLink>
        </ul>
        <ul>
            <NavLink to='/cart' style={link}><b>Cart</b></NavLink>
        </ul>
        {user? (
          null
          ):( 
        <ul style={link}>
            <NavLink to='/login'style={link}><b>Login</b></NavLink> /
            <NavLink to='/signup'style={link}><b>Signup</b></NavLink>
        </ul> 
        )}
        {user? (<button style={{marginLeft: "15%", height:"25px", marginTop: "13px"}}
        onClick={handleLogout}>Logout</button>
        ) : null}
    </div>
  )
}
export default Header