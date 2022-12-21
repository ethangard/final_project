import React from 'react'
import { Link } from 'react-router-dom'

const NavSidebar = () => {
  return (
    <div className="NavSidebar-container">
      <Link to="/articles/new" className="nav-item-sidebar create-new-user-btn">
        New Article
      </Link>
      <Link to="/favourites" className="nav-item-sidebar create-new-user-btn">
        Favourites
      </Link>
      <Link to="/collections" className="nav-item-sidebar create-new-user-btn">
        View All Collections
      </Link>
      <Link
        to="/created_by_me"
        className="nav-item-sidebar create-new-user-btn"
      >
        Created by Me
      </Link>
      <Link to="/collections" className="nav-item-sidebar create-new-user-btn">
        Popular Cards this Week
      </Link>
      <Link to="/drafts" className="nav-item-sidebar create-new-user-btn">
        Drafts
      </Link>
    </div>
  )
}

export default NavSidebar
