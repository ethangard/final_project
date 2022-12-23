import React, { useState, useEffect } from 'react'
import Highlighter from 'react-highlight-words'
import { Link } from 'react-router-dom'

const ArticleIndexDetails = ({ articles, sorts, value }) => {
  const [indexArticles, setIndexArticles] = useState([])

  console.log('Logging articles props', articles)
  console.log(sorts)

  useEffect(() => {
    setIndexArticles(articles)
  }, [articles])

  // console.log(
  //   `Logging article titles`,
  //   articles.map((a) => a.title)
  // )
  
    // const artTitles = articles.map((a) => a.title)


  /*   console.log(indexArticles) */

  return indexArticles.map((a, i) => {
    return (
      <Link to={`/articles/${a.id}`} className="link card" key={i}>
        <div className="index-item-title">
          {/* <span className="bold">Title: </span> {a.title} */}
          <span className="bold">Title: </span> 
          <Highlighter
            highlightClassName="highlight"
            searchWords={[value]}
            autoEscape={true}
            textToHighlight={a.title}
          />
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
