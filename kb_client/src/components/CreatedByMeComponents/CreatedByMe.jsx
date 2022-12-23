import React from 'react'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Article } from '../../requests'

const CreatedByMe = ({ currentUser }) => {
  const [user, setUser] = useState({})
  const [userArticles, setUserArticles] = useState([])

  useEffect(() => {
    setUser(currentUser)
  }, [currentUser])

  useEffect(() => {
    const getUserArticles = async () => {
      console.log(user.id)
      const data = await Article.get_current_user_articles(user.id)
      setUserArticles(data)
    }

    getUserArticles()
  }, [user])

  return (
    <>
      {console.log(user)}
      {console.log(userArticles)}
      <div>CreatedByMe</div>
      {userArticles.map((a, i) => {
        return (
          <Link to={`/articles/${a.id}`} key={i}>
            <div>Article Title: {a.title}</div>
          </Link>
        )
      })}
    </>
  )
}

export default CreatedByMe
