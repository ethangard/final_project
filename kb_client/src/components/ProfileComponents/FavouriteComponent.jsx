import React, { useEffect } from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { User } from '../../requests'

const FavouriteComponent = () => {
  const [user, setUser] = useState({})

  useEffect(() => {
    const fetchedData = async () => {
      const data = await User.show(1)
      setUser(data)
    }
    fetchedData()
  }, [])

  return (
    <>
      <div>FavouriteComponent</div>
      {console.log(user.favourites)}
      {console.log(user)}
      {user.favourites?.map((u, i) => {
        return (
          <Link to={`/articles/${u.article_id}`} key={i}>
            <p>{u.id}</p>
            <p>{u.title}</p>
          </Link>
        )
      })}
    </>
  )
}

export default FavouriteComponent
