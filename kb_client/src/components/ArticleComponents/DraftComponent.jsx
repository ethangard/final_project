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
      {console.log(drafts)}
      {drafts.length > 0 ? (
        <p>You have {drafts.length} drafts currently</p>
      ) : (
        <p>You have no drafts</p>
      )}
      {/* {console.log(drafts)} */}

      {drafts.map((d, i) => {
        return (
          <>
            <hr />
            <Link to={`/articles/${d.id}`} key={i} props={{ d }}>
              <div>Title: {d.title}</div>
              <div>
                Body:
                <div dangerouslySetInnerHTML={{ __html: d.body }} />
              </div>
            </Link>
            <hr />
          </>
        )
      })}
    </>
  )
}

export default DraftComponent
