import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Article } from '../../requests'
import SearchBar from '../SearchComponents/SearchBar'
import SortArticles from './SortArticles'

const ArticleIndex = () => {
  const [articles, setArticles] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const data = await Article.index()
      setArticles(data)
    }

    fetchData()
  }, [])
  // console.log(articles)
  return (
    <>
      <div>ArticleIndex</div>
      <SearchBar />
      <SortArticles data={articles}/>
      {articles.map((a, i) => {
        {
          /*   console.log(a) */
        }
        return (
          <Link to={`./${a.id}`} className="link" key={i}>
            <div className="card">
              <div>
                <span className="bold">Title: </span>
                <p>{a.title}</p>
              </div>
              <div>
                <span className="bold">Body:</span>
                <div dangerouslySetInnerHTML={{ __html: a.body }} />
              </div>
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
