import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Collection, Article } from '../../requests'

const CollectionShowPage = () => {
  const [collection, setCollection] = useState({})
  const [collectionArticles, setCollectionArticles] = useState([])

  // console.log(props)

  const { id } = useParams()

  console.log(id)

  useEffect(() => {
    const fetchCollection = async () => {
      console.log()
      const collection = await Collection.show(id)
      setCollection(collection)
    }
    fetchCollection()
  }, [])

  useEffect(() => {
    const fetchCollectionArticles = async () => {
      const fetchedCollectionArticles = await Article.get_collection_articles()
      setCollectionArticles(fetchedCollectionArticles)
    }
    fetchCollectionArticles()
  }, [])

  return (
    <>
      <div>CollectionShow</div>
      <div>Collection Name: {collection.name}</div>
      {console.log(collectionArticles)}
      {collectionArticles.map((c, i) => {
        return (
          <Link key={i} to={`/articles/${c.id}`}>
            <div>Article #{i}</div>
            <div>Article Title: {c.title}</div>
            <div>Article Body: {c.body}</div>
          </Link>
        )
      })}
    </>
  )
}

export default CollectionShowPage
