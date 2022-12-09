import { NavLink } from 'react-router-dom'

const NavBar = () => {
  return (
    <nav>
      <NavLink to="/">Home</NavLink>|
      <NavLink to="/articles">Article Index</NavLink>|
      <>
        <NavLink to="/articles/new">New Article</NavLink>-
        {/*  <button>Sign Out</button>- */}
      </>
      <>
        <NavLink to="/sign_in">Sign In</NavLink>|
      </>
    </nav>
  )
}

export default NavBar
