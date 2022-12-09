import './App.css'
import LandingPage from './components/LandingPage'
import NavBar from './components/NavBar'
import ArticleIndex from './components/ArticleIndex'
import ArticleShow from './components/ArticleShow'
import { Route, Routes } from 'react-router-dom'

function App() {
  return (
    <>
    <NavBar />
      <Routes>
        <Route path="/" element={<LandingPage/>} />
        <Route exact path="/articles" element={<ArticleIndex />} />
        <Route exact path="/articles/:id" element={<ArticleShow />} />
      </Routes>
    </>
  )
}

export default App
