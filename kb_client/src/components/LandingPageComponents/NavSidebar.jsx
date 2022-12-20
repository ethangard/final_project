import React from 'react'
import { Link } from 'react-router-dom'

const NavSidebar = () => {
  return (
    <div className="NavSidebar-container">
      <Link to="/articles/new" className="nav-item-sidebar">
        New Article
      </Link>
      <Link to="/favourites" className="nav-item-sidebar">
        Favourites
      </Link>
      <Link to="/collections" className="nav-item-sidebar">
        View All Collections
      </Link>
      <Link to="/created_by_me" className="nav-item-sidebar">
        Created by Me
      </Link>
      <Link to="/collections" className="nav-item-sidebar">
        Popular Cards this Week
      </Link>
      <Link to="/drafts" className="nav-item-sidebar">
        Drafts
      </Link>
    </div>
  )
}

export default NavSidebar
