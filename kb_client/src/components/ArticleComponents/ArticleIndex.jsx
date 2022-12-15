import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Article } from '../../requests'
import SearchBar from '../SearchComponents/SearchBar'

const ArticleIndex = () => {
  const [articles, setArticles] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const data = await Article.index()
      setArticles(data)
    }

    fetchData()
  }, [])

  return (
    <>
      <div>ArticleIndex</div>
      <SearchBar />
      {articles.map((a, i) => {
        return (
          <Link to={`./${a.id}`} className="link" key={i}>
            <div className="card">
              <h3>Title: {a.title}</h3>
              <p>
                <span className="bold">
                  Body:
                </span>
                   <div dangerouslySetInnerHTML={{ __html: a.body }} />
              </p>
              <p>
                <span className="bold">Collection:</span> {a.collection}
              </p>
              <p>
                <span className="bold">Tags: </span>
                {/* {console.log(a)}
                {console.log(a.tags)} */}
                {/*        {console.log(a)} */}
                {/*                 {console.log((a))}
                {console.log(a.tags)}  */}
                {a.tags.map((t, i) => {
                  return i === a.tags.length - 1 ? (
                    <span key={i}>{t.name}</span>
                  ) : (
                    <span key={i}>{t.name}, </span>
                  )
                })}
              </p>
            </div>
          </Link>
        )
      })}
    </>
  )
}

export default ArticleIndex
