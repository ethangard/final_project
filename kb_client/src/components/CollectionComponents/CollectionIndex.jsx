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
    <div className="collection-index-container">
      <h2>Collections List</h2>
      {collections.map((c, i) => {
        return (
          <Link
            to={`./${c.id}`}
            key={i}
            props={c.id}
            className="collection-container"
          >
            <div className="collection-title">
              #{i + 1} {c.name}
            </div>
          </Link>
        )
      })}
    </div>
  )
}

export default CollectionIndex
