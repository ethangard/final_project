import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Collection } from '../../requests'

const CollectionIndex = () => {
  const [collections, setCollections] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const data = await Collection.index()
      setCollections(data)
    }
    fetchData()
  }, [])



  return (
    <div>
      {collections.map((c, i) => {
        return (
          <Link to={`./${c.id}`} key={i} props={c.id}>
            <div>{c.name}</div>
          </Link>
        )
      })}
    </div>
  )
}

export default CollectionIndex
