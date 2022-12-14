import { NavLink } from 'react-router-dom'
import { Session } from '../requests'

import { useState, useEffect } from 'react'

const NavBar = ({ currentUser, onSignOut, accessLevel }) => {
  // const [access, setAccess] = useState({})

  const handleSignOut = () => {
    Session.destroy().then(() => {
      onSignOut()
    })
  }

  console.log(accessLevel)

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
      <NavLink to="/">Home</NavLink> | {' '}
      <NavLink to="/articles">Article Index</NavLink> | {' '}
      {currentUser ? (
        <>
          <NavLink to="/articles/new">New Article</NavLink> |{' '}
          {accessLevel === 'admin' ? (
            <NavLink to="/admin">Admin Panel | </NavLink>
          ) : (
            ''
          )}
          <span>Welcome, {currentUser.first_name}</span>-
          <button onClick={handleSignOut}>Sign Out</button>-
          {/*   {accessLevel === 'admin' ? (<p>You are admin</p>) : ''} */}
        </>
      ) : (
        <>
          <NavLink to="/sign_in"> Sign In </NavLink>|
         {/*  <NavLink to="/sign_up"> Sign Up</NavLink> */}
        </>
      )}
    </nav>
  )
}

export default NavBar
