import './App.css'
import { useEffect, useState } from 'react'
import { User } from './requests'
import LandingPage from './components/LandingPage'
import NavBar from './components/NavBar'
import ArticleShow from './components/ArticleComponents/ArticleShow'
import ArticleIndex from './components/ArticleComponents/ArticleIndex'
import ArticleEdit from './components/ArticleComponents/ArticleEdit'
import { Route, Routes } from 'react-router-dom'
import ArticlesNew from './components/ArticleComponents/ArticlesNew'
import SignInPage from './components/SignInComponents/SignInPage'
import AuthRoutes from './components/SignInComponents/AuthRoutes'
import ActiveRoutes from './components/SignInComponents/ActiveRoutes'
import SignUpPage from './components/SignInComponents/SignUpPage'
import SuspendedPage from './components/SuspendedPage'
import TipTap from './components/RTE/TipTap'

function App() {
  /* User Sessions */
  const [user, setUser] = useState(null)

  const getCurrentUser = () => {
    return User.current().then((user) => {
      if (user?.id) {
        setUser(user)
      }
    })
  }

  useEffect(() => {
    getCurrentUser()
    // isAdmin(user)
  }, [])

  const onSignOut = () => {
    setUser(null)
  }

  /* User Sessions end */
  // console.log(user)

  const isActive = () => {
    const testUser = User.current().then((user) => {
      if (user?.id) {
        setUser(user)
      }
    })
    return user
  }

  return (
    <>
      <NavBar currentUser={user} onSignOut={onSignOut} accessLevel={user} />
      <Routes>
        <Route element={<AuthRoutes isAuthenticated={!!user} />}>
          <Route element={<ActiveRoutes isActive={user} />}>
            <Route path="/" element={<LandingPage />} />
            <Route exact path="/articles" element={<ArticleIndex />} />
            <Route exact path="/articles/new" element={<ArticlesNew />} />
            <Route exact path="/articles/:id" element={<ArticleShow />} />
            <Route exact path="/articles/:id/edit" element={<ArticleEdit />} />
          </Route>
        </Route>
        <Route
          exact
          path="/sign_in"
          element={<SignInPage onSignIn={getCurrentUser} />}
        />
        <Route
          exact
          path="/sign_up"
          element={<SignUpPage onSignUp={getCurrentUser} />}
        />
        <Route exact path="/suspended" element={<SuspendedPage />} />
      </Routes>
    </>
  )
}

export default App
