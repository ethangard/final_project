import { NavLink } from 'react-router-dom'
import { Session } from '../requests'

import { useState, useEffect } from 'react'
import brain from './brain-no_bg.png'

const NavBar = ({ currentUser, onSignOut, accessLevel }) => {
  // const [access, setAccess] = useState({})

  const handleSignOut = () => {
    Session.destroy().then(() => {
      onSignOut()
    })
    localStorage.clear()
  }

  /*   console.log(accessLevel) */

  // console.log(accessLevel)

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const data = await accessLevel
  //     console.log(accessLevel)
  //     setAccess(data)
  //      console.log(access)
  //   }
  //   fetchData()
  // }, [])

  // const checkAccess = (accessLevel) => {
  //   if (accessLevel.permission_level === 'admin') {
  //     return true
  //   }
  // }

  // console.log(checkAccess(accessLevel))

  return (
    <nav>
      <NavLink to="/" className="nav-link">
        <img src={brain} className="logo"/>
      </NavLink>

      <NavLink to="/articles" className="nav-link">
        Articles
      </NavLink>

      {currentUser ? (
        <>
          {/*     <NavLink to="/articles/new" className="nav-link">
            New Article
          </NavLink> */}
          {accessLevel === 'admin' ? (
            <>
              <NavLink to="/admin" className="nav-link">
                Admin Panel
              </NavLink>
              <NavLink to="/reports" className="nav-link">
                {' '}
                Reports
              </NavLink>
            </>
          ) : (
            ''
          )}
          {/*  <NavLink to="/favourites" className="nav-link">
            Favourites
          </NavLink> */}
          <span className="nav-link">Welcome, {currentUser.first_name}</span>

          <button className="nav-link sign-out-btn" onClick={handleSignOut}>
            Sign Out
          </button>
          {/*   {accessLevel === 'admin' ? (<p>You are admin</p>) : ''} */}
        </>
      ) : (
        <>
          <NavLink to="/sign_in" className="nav-link">
            Sign In
          </NavLink>
          {/*  <NavLink to="/sign_up"> Sign Up</NavLink> */}
        </>
      )}
    </nav>
  )
}

export default NavBar
