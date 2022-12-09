import './App.css'
import { useEffect, useState } from 'react'
import { User } from './requests'
import LandingPage from './components/LandingPage'
import NavBar from './components/NavBar'
import ArticleShow from './components/ArticleComponents/ArticleShow'
import ArticleIndex from './components/ArticleComponents/ArticleIndex'
import { Route, Routes } from 'react-router-dom'
import ArticlesNew from './components/ArticleComponents/ArticlesNew'
import SignInPage from './components/SignInComponents/SignInPage'
import AuthRoutes from './components/SignInComponents/AuthRoutes'

function App() {
  /* User Sessions */
  const [user, setUser] = useState(null)

  useEffect(() => {
    getCurrentUser()
  }, [])

  const getCurrentUser = () => {
    return User.current().then((user) => {
      if (user?.id) {
        setUser(user)
      }
    })
  }

  const onSignOut = () => {
    setUser(null)
  }

  /* User Sessions end */

  return (
    <>
      <NavBar currentUser={user} onSignOut={onSignOut} />
      <Routes>
        <Route element={<AuthRoutes isAuthenticated={!!user} />}>
          <Route path="/" element={<LandingPage />} />
          <Route exact path="/articles" element={<ArticleIndex />} />
          <Route exact path="/articles/:id" element={<ArticleShow />} />
          <Route exact path="/articles/new" element={<ArticlesNew />} />
        </Route>
          <Route
            exact
            path="/sign_in"
            element={<SignInPage onSignIn={getCurrentUser} />}
          />
      </Routes>
    </>
  )
}

export default App
