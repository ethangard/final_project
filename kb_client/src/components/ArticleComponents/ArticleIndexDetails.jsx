import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const ArticleIndexDetails = (props) => {
  const [indexArticles, setIndexArticles] = useState([])

  console.log('Logging props', props)

  useEffect(() => {
    setIndexArticles(props.articles)
  }, [props])

  /*   console.log(indexArticles) */

  return indexArticles.map((a, i) => {
    return (
      <Link to={`/articles/${a.id}`} className="link card" key={i}>
        <div className="index-item-title">
          <span className="bold">Title: </span> {a.title}
        </div>
        <div className="index-item-title">
          <span className="bold">Body:</span>
          <div
            dangerouslySetInnerHTML={{
              __html: a.body,
              /*                <TextTruncate element="div" text= line={4} /> */
            }}
            className="truncate-index-body"
          />
        </div>
        <div className="index-item-title">
          <span className="bold">Collection:</span> {a.collection}
        </div>

        <div className="index-item-title">
          <span className="bold">Tags: </span>
          {a.tags.map((t, i) => {
            return i === a.tags.length - 1 ? (
              <span key={i}>{t.name}</span>
            ) : (
              <span key={i}>{t.name}, </span>
            )
          })}
        </div>
      </Link>
    )
  })
}

export default ArticleIndexDetails
