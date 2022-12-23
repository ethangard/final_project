import React from 'react'
import ArticleIndex from './ArticleComponents/ArticleIndex'
import InfoSidebar from './InfoSidebar'
import NavSidebar from './LandingPageComponents/NavSidebar'

const LandingPage = () => {
  return (
    <div className='landing-page-container'>
     {/*  <div>LandingPage</div> */}
      <NavSidebar />
      <ArticleIndex />
      <InfoSidebar />
    </div>
  )
}

export default LandingPage
