import { useState, useEffect } from 'react'
import { Article } from '../requests'

const ArticleIndex = () => {
  const [articles, setArticles] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const data = await Article.index()
      setArticles(data)
    }
  }, [])

  return (
    <>
      <div>ArticleIndex</div>
      {articles.map((a, i) => {
        return (
          <div key={i}>
            <h3>Title: {a.title}</h3>
            <p>Body: {a.body}</p>
            <p>Collection {a.collection}</p>
            <p>Tags: {a.tags}</p>
          </div>
        )
      })}
    </>
  )
}

export default ArticleIndex
