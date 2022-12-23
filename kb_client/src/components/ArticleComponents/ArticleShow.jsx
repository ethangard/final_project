import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Article, User } from '../../requests'
import { useNavigate } from 'react-router-dom'
import TipTap from '../RTE/TipTap'
import ArticleEdit from './ArticleEdit'
import { Navigate } from 'react-router-dom'
import { Favourite } from '../../requests'

const ArticleShow = (props) => {
  const articleID = useParams()
  const [user, setUser] = useState({})
  const [createdAt, setCreatedAt] = useState()
  const [article, setArticle] = useState({})
  const [errors, setErrors] = useState([])
  const [editMode, setEditMode] = useState(false)
  const navigate = useNavigate()
  const [favourite, setFavourite] = useState()
  // const [isFetched, setIsFetched] = useState(false)

  // console.log(`Logging props in the Show Page: `, props)
  const fetchData = async () => {
    const data = await Article.show(articleID.id)
    setArticle(data)
  }

  useEffect(() => {
    fetchData()
  }, [])

  useEffect(() => {
    const setCreatedAtInitial = async () => {
      const data = await new Date(article.created_at).toLocaleString()
      setCreatedAt(await data)
      // console.log('Date:', data)
    }
    setCreatedAtInitial()
  }, [article])

  // Set current user
  useEffect(() => {
    setUser(props.currentUser)
  }, [props])

  useEffect(() => {
    setFavourite(article.favourites)
  }, [article])

  function editArticle(id, params) {
    Article.update(id, params).then((article) => {
      // console.log(`Edited Article Params: `, params)
      // console.log(`Edited Article Details: `, article)
      if (article.errors) {
        console.log(`ArticleErrors: ${article.errors}`, article.errors)
        setErrors({ errors: article.errors })
      } else {
        console.log()
        navigate(`/articles/${articleID.id}`)
      }
    })
  }

  function changeEditMode() {
    editMode === true ? setEditMode(false) : setEditMode(true)
  }

  const updateEditModeRemote = () => {
    setEditMode(false)
    fetchData()
    // reRenderPage()
  }

  const reRenderPage = () => {
    console.log({ ...article })
    setArticle({ ...article })
  }

  const test = [1, 2, 3]

  const arrTags = article.tags

  // if (!isFetched) return null

  const findFavourites = () => {
    // console.log(User.current())
  }
  findFavourites()

  // function getDate(params){
  //   return (new Date(article.created_at))
  // }

  // console.log(`In function date`, date)
  // console.log(date)

  const archiveArticle = () => {
    Article.archive_article(articleID.id)
  }

  const destroyArticle = () => {
    Article.destroy(articleID.id)
  }

  const createFavourite = () => {
    Favourite.create(articleID.id)
    setFavourite(true)
  }

  const deleteFavourite = () => {
    Favourite.destroy(articleID.id, article.favourites[0].id)
    // console.log(article.favourites[0].id)
    setFavourite([])
  }

  if (!editMode) {
    return (
      <div key={article.id} className="article-show-container">
        {console.log(article.favourites)}

        <div className="show-title">
          <span className="bold">Title: </span> {article.title}
        </div>
        <div className="show-body">
          <span className="bold">Body: </span>
          <div dangerouslySetInnerHTML={{ __html: article.body }} />
        </div>
        <div className="show-collection">
          <span className="bold">Collection: </span>
          {article.collection}
        </div>
        <div className="show-tags">
          <span className="bold">Tags: </span>
          {/* Tags: {console.log(article.tags)} */}
          {article.tags?.map((t, i) => {
            return i === article.tags.length - 1 ? (
              <span key={i}>{t.name}</span>
            ) : (
              <span key={i}>{t.name}, </span>
            )
          })}
        </div>
        <div className="show-createdAt">
          <span className="bold">Created at: </span>
          {createdAt}
        </div>
        <div>
          {console.log(article.favourites)}
          {article.favourites?.length > 0 ? (
            <button onClick={(e) => deleteFavourite(e)}>Un-favourite</button>
          ) : (
            <button onClick={(e) => createFavourite(e)}>Favourite</button>
          )}
          {console.log(article.favourites)}
          {/*     <button onClick={(e) => toggleFavourite(e)}>Favourite</button> */}
          {user.permission_level === 'admin' ||
          user.permission_level === 'write' ? (
            <>
              <button onClick={() => destroyArticle()}>Archive</button>
              <button onClick={changeEditMode}>Edit</button>
            </>
          ) : (
            ''
          )}
        </div>
      </div>
    )
  } else {
    return (
      <ArticleEdit
        submitForm={(id, params, changeEditMode) =>
          editArticle(id, params, changeEditMode)
        }
        onEditUpdateSubmit={updateEditModeRemote}
      />
    )
  }
}

export default ArticleShow
