import React, { useEffect } from 'react'
import { useState } from 'react'
import { User } from '../../requests'

const FavouriteComponent = () => {
  const [user, setUser] = useState({})

  useEffect(() => {
    const fetchedData = async () => {
      const data = await User.show(211)
      setUser(data)
    }
    fetchedData()
  }, [])

  return (
    <>
      <div>FavouriteComponent</div>
      {console.log(user)}
      {console.log(user.favourites)}
    </>
  )
}

export default FavouriteComponent
