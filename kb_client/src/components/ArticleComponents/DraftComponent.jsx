import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Article } from '../../requests'

const DraftComponent = () => {
  const [drafts, setDrafts] = useState([])

  useEffect(() => {
    const fetchedData = async () => {
      const data = await Article.get_draft_articles()
      setDrafts(data)
    }

    fetchedData()
  }, [])

  return (
    <>
      <div>DraftComponent</div>
      {drafts.length > 0 ? (
        <p>You have {drafts.length} drafts currently</p>
      ) : (
        <p>You have no drafts</p>
      )}
      {console.log(drafts)}

      {drafts.map((d, i) => {
        return (
          <Link to={`/articles/${d.id}`} key={i}>
            <div>Title: {d.title}</div> <div>Body: {d.body}</div>{' '}
          </Link>
        )
      })}
    </>
  )
}

export default DraftComponent
