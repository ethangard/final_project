import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Article } from '../requests'

const ArticleShow = () => {
  const articleID = useParams()
  const [article, setArticle] = useState({})
  // const [isFetched, setIsFetched] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      const data = await Article.show(articleID.id)
      setArticle(data)
    }
    fetchData()
    // setIsFetched(true)
  }, [])

  const test = [1, 2, 3]

  const arrTags = article.tags

  // if (!isFetched) return null
  return (
    <>
{/*       {console.log(article)}
      {console.log(article.tags)} */}
      <div>ArticleShow</div>
      <div key={article.id}>
        <h3>Title: {article.title}</h3>
        <p>Body: {article.body}</p>
        <p>Collection: {article.collection}</p>
      <div>
          Tags:{' '}
          {article.tags?.map((t, i) => {
            /*    return(<p>{t}</p>) */
            return (
              <div key={i}>
                <label htmlFor={t}>{t}</label>
                <input type="checkbox" name={t} value={t} />
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}

export default ArticleShow
