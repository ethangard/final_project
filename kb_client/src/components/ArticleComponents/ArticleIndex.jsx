import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Article } from '../../requests'

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
      {articles.map((a, i) => {
        return (
          <Link to={`./${a.id}`} className="link" key={i}>
            <div className="card">
              <h3>Title: {a.title}</h3>
              <p>
                <span className="bold">Body:</span> {a.body}
              </p>
              <p>
                <span className="bold">Collection:</span> {a.collection}
              </p>
              <p>
                <span className="bold">Tags: </span>
         {/*        {console.log(a)} */}
                {console.log((a))}
                {console.log(a.tags)} 
                {/* {JSON.parse(a.tags).map((t, i) => {
                  return i === a.tags.length - 1 ? (
                    <span key={i}>{t}</span>
                  ) : (
                    <span key={i}>{t}, </span>
                  )
                })} */}
              </p>
            </div>
          </Link>
        )
      })}
    </>
  )
}

export default ArticleIndex
